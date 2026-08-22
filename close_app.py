#!/usr/bin/env python3
"""Permanently close Own Club: wipe persisted JSON and force closed pages."""
from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CLOSED = (ROOT / "CLOSED.html").read_text(encoding="utf-8") if (ROOT / "CLOSED.html").exists() else (
    "<!DOCTYPE html><html><body style='background:#0b0d10;color:#fff;font-family:sans-serif;padding:40px'>"
    "<h1>Own Club is closed</h1></body></html>"
)

EMPTY_LIST = "[]\n"
EMPTY_POOL = json.dumps({"balance": 0, "currency": "USD", "ledger": [], "updated_at": ""}, indent=2) + "\n"
EMPTY_OBJ = "{}\n"

KEEP = {
    "users.json": EMPTY_LIST,
    "withdrawals.json": EMPTY_LIST,
    "deposits.json": EMPTY_LIST,
    "otps.json": EMPTY_OBJ,
    "company_pool.json": EMPTY_POOL,
    "tx.json": EMPTY_LIST,
    "logs.json": EMPTY_LIST,
}


def wipe_dir(d: Path) -> None:
    d.mkdir(parents=True, exist_ok=True)
    for name, body in KEEP.items():
        p = d / name
        try:
            p.write_text(body, encoding="utf-8")
            print("wiped", p)
        except Exception as e:
            print("wipe fail", p, e)
    for extra in d.glob("*.json"):
        if extra.name not in KEEP and extra.name.endswith(".json"):
            try:
                extra.write_text(EMPTY_LIST, encoding="utf-8")
                print("wiped extra", extra)
            except Exception as e:
                print("wipe extra fail", extra, e)


def run() -> None:
    import os
    candidates = []
    for key in ("OC_DATA_DIR", "DATA_DIR", "RAILWAY_VOLUME_MOUNT_PATH"):
        v = (os.environ.get(key) or "").strip()
        if v:
            candidates.append(Path(v))
    candidates.extend([Path("/data"), ROOT / "data"])
    seen = set()
    for d in candidates:
        try:
            key = str(d.resolve())
        except Exception:
            key = str(d)
        if key in seen:
            continue
        seen.add(key)
        wipe_dir(d)

    for name in ("index.html", "frontend.html", "admin.html"):
        p = ROOT / name
        try:
            p.write_text(CLOSED, encoding="utf-8")
            print("closed page", name)
        except Exception as e:
            print("page fail", name, e)

    marker = ROOT / "APP_CLOSED"
    marker.write_text("closed 2026-08-22\n", encoding="utf-8")
    print("APP_CLOSED written")


if __name__ == "__main__":
    run()
