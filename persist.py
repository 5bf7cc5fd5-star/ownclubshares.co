"""Durable storage. Merge every known users.json. Never wipe members on deploy."""
from __future__ import annotations

import json
import os
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
KEEP = (
    "users.json",
    "withdrawals.json",
    "company_pool.json",
    "otps.json",
    "support_chats.json",
    "raffle_plays.json",
)
DATA_DIR: Path | None = None


def _writable(path: Path) -> bool:
    try:
        path.mkdir(parents=True, exist_ok=True)
        probe = path / ".write_test"
        probe.write_text("ok", encoding="utf-8")
        probe.unlink(missing_ok=True)
        return True
    except Exception:
        return False


def resolve() -> Path:
    env = (os.environ.get("DATA_DIR") or os.environ.get("RAILWAY_VOLUME_MOUNT_PATH") or os.environ.get("OC_DATA_DIR") or "").strip()
    candidates = []
    if env:
        candidates.append(Path(env))
    candidates.extend([Path("/data"), Path("/app/data"), ROOT / "data"])
    for c in candidates:
        if _writable(c):
            return c
    fallback = ROOT / "data"
    fallback.mkdir(parents=True, exist_ok=True)
    return fallback


def _read_list(path: Path):
    if not path.exists() or path.stat().st_size < 3:
        return []
    try:
        raw = json.loads(path.read_text(encoding="utf-8"))
        if isinstance(raw, list):
            return raw
        if isinstance(raw, dict):
            return raw.get("users") or raw.get("accounts") or []
    except Exception as e:
        print("[persist] read fail", path, e)
    return []


def _key(u: dict) -> str:
    email = str(u.get("email") or "").strip().lower()
    phone = str(u.get("phone") or "").strip()
    uid = str(u.get("id") or "").strip()
    return email or phone or uid


def merge_users(dest: Path) -> int:
    folders = [dest, ROOT / "data", Path("/data"), Path("/app/data"), ROOT]
    seen = {}
    order = []
    for folder in folders:
        for name in ("users.json", "users.json.bak", "users.json.prev"):
            for u in _read_list(folder / name):
                if not isinstance(u, dict):
                    continue
                k = _key(u)
                if not k:
                    continue
                if k not in seen:
                    seen[k] = u
                    order.append(k)
                else:
                    old = seen[k]
                    # keep richer record
                    if len(json.dumps(u, default=str)) > len(json.dumps(old, default=str)):
                        # preserve password hashes from either side
                        if old.get("password_hash") and not u.get("password_hash"):
                            u["password_hash"] = old["password_hash"]
                        if old.get("password") and not u.get("password"):
                            u["password"] = old["password"]
                        seen[k] = u
                    else:
                        if u.get("password_hash") and not old.get("password_hash"):
                            old["password_hash"] = u["password_hash"]
                        if u.get("password") and not old.get("password"):
                            old["password"] = u["password"]
    users = [seen[k] for k in order]
    out = dest / "users.json"
    backup(out)
    dest.mkdir(parents=True, exist_ok=True)
    tmp = out.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(users, indent=2, ensure_ascii=False), encoding="utf-8")
    tmp.replace(out)
    # mirror into app data so code that still uses ./data keeps working
    mirror = ROOT / "data" / "users.json"
    if mirror.resolve() != out.resolve():
        try:
            shutil.copy2(out, mirror)
        except Exception:
            pass
    print("[persist] merged members", len(users))
    return len(users)


def migrate(dest: Path) -> None:
    src = ROOT / "data"
    dest.mkdir(parents=True, exist_ok=True)
    for name in KEEP:
        s, d = src / name, dest / name
        if name == "users.json":
            continue
        live = d.exists() and d.stat().st_size > 2
        if live:
            continue
        if s.exists() and s.stat().st_size > 2:
            shutil.copy2(s, d)


def backup(path: Path) -> None:
    try:
        if path.exists() and path.stat().st_size > 2:
            bak = path.with_suffix(path.suffix + ".bak")
            shutil.copy2(path, bak)
    except Exception as e:
        print("backup skip", path.name, e)


def init() -> Path:
    global DATA_DIR
    os.environ["RESET_CUSTOMERS"] = "0"
    dest = resolve()
    migrate(dest)
    merge_users(dest)
    DATA_DIR = dest
    os.environ["OC_DATA_DIR"] = str(dest)
    os.environ["DATA_DIR"] = str(dest)
    print("[persist] DATA_DIR", dest)
    for name in KEEP:
        p = dest / name
        print("[persist]", name, "ok" if p.exists() else "missing", p.stat().st_size if p.exists() else 0)
    return dest


if __name__ == "__main__":
    init()
