"""Durable storage. Merge every known users.json. Never wipe members on deploy."""
from __future__ import annotations

import json
import os
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
KEEP = (
    "users.json",
    "users.json.bak",
    "users.json.prev",
    "members_archive.json",
    "withdrawals.json",
    "company_pool.json",
    "pool_rules.json",
    "otps.json",
    "support_chats.json",
    "raffle_plays.json",
)
DATA_DIR = None


def _writable(path):
    try:
        path.mkdir(parents=True, exist_ok=True)
        probe = path / ".write_test"
        probe.write_text("ok", encoding="utf-8")
        probe.unlink(missing_ok=True)
        return True
    except Exception:
        return False


def resolve():
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


def _read_list(path):
    if not path.exists() or path.stat().st_size < 3:
        return []
    try:
        raw = json.loads(path.read_text(encoding="utf-8"))
        if isinstance(raw, list):
            return raw
        if isinstance(raw, dict):
            return raw.get("users") or raw.get("accounts") or raw.get("members") or []
    except Exception as e:
        print("[persist] read fail", path, e)
    return []


def _key(u):
    email = str(u.get("email") or "").strip().lower()
    phone = str(u.get("phone") or "").strip()
    uid = str(u.get("id") or "").strip()
    return email or phone or uid


def _richer(a, b):
    pick = b if len(json.dumps(b, default=str)) > len(json.dumps(a, default=str)) else a
    other = a if pick is b else b
    for field in ("password_hash", "password", "password_plain"):
        if other.get(field) and not pick.get(field):
            pick[field] = other[field]
    for field in ("deposits", "transactions", "machines", "referral_payouts"):
        la = pick.get(field) if isinstance(pick.get(field), list) else []
        lb = other.get(field) if isinstance(other.get(field), list) else []
        if lb and len(lb) > len(la):
            pick[field] = lb
    for field in ("balance", "referral_earnings"):
        try:
            if float(other.get(field) or 0) > float(pick.get(field) or 0):
                pick[field] = other[field]
        except Exception:
            pass
    return pick


def merge_users(dest):
    folders = [dest, dest / "archive", ROOT / "data", ROOT / "data" / "archive", Path("/data"), Path("/app/data"), ROOT]
    names = ("users.json", "users.json.bak", "users.json.prev", "members_archive.json", "customers.json")
    seen = {}
    order = []
    for folder in folders:
        if not folder.exists():
            continue
        for name in names:
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
                    seen[k] = _richer(seen[k], u)
    users = [seen[k] for k in order]
    dest.mkdir(parents=True, exist_ok=True)
    out = dest / "users.json"
    backup(out)
    tmp = out.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(users, indent=2, ensure_ascii=False), encoding="utf-8")
    tmp.replace(out)
    archive = dest / "archive"
    archive.mkdir(parents=True, exist_ok=True)
    try:
        shutil.copy2(out, archive / "users.json")
        shutil.copy2(out, dest / "members_archive.json")
    except Exception:
        pass
    mirror = ROOT / "data" / "users.json"
    if mirror.resolve() != out.resolve():
        try:
            shutil.copy2(out, mirror)
        except Exception:
            pass
    print("[persist] merged members", len(users))
    return len(users)


def migrate(dest):
    src = ROOT / "data"
    dest.mkdir(parents=True, exist_ok=True)
    for name in KEEP:
        s, d = src / name, dest / name
        if name.startswith("users"):
            continue
        live = d.exists() and d.stat().st_size > 2
        if live:
            continue
        if s.exists() and s.stat().st_size > 2:
            try:
                shutil.copy2(s, d)
            except Exception:
                pass


def backup(path):
    try:
        if path.exists() and path.stat().st_size > 2:
            bak = path.with_suffix(path.suffix + ".bak")
            shutil.copy2(path, bak)
    except Exception as e:
        print("backup skip", path.name, e)


def init():
    global DATA_DIR
    os.environ["RESET_CUSTOMERS"] = "0"
    dest = resolve()
    migrate(dest)
    merge_users(dest)
    DATA_DIR = dest
    os.environ["OC_DATA_DIR"] = str(dest)
    os.environ["DATA_DIR"] = str(dest)
    print("[persist] DATA_DIR", dest)
    return dest


if __name__ == "__main__":
    init()
