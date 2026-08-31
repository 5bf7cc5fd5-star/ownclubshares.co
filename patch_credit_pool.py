#!/usr/bin/env python3
"""Ensure approved deposits credit the member and debit/credit the company pool with rules."""
from pathlib import Path
import json
root = Path(__file__).resolve().parent
rules = {
  "pool_usd": 100000000,
  "deposit": [
    "Mobile Money (MTN / Airtel) and Crypto USDT TRC20 are both accepted.",
    "A deposit stays pending until admin confirms the payment.",
    "When confirmed the same amount is credited to the member wallet.",
    "Confirmed deposits increase recorded inflows on the company pool ledger.",
    "Company MoMo number and crypto wallet stay in the background."
  ],
  "credit": [
    "Company pool starts at 100,000,000 USD.",
    "Member balances are paid from the pool after a confirmed deposit.",
    "Withdrawals are paid from the member wallet, 10% service charge.",
    "Pool and member files are merged on every boot so no account is dropped."
  ]
}
(root / "data").mkdir(exist_ok=True)
(root / "data" / "pool_rules.json").write_text(json.dumps(rules, indent=2), encoding="utf-8")
print("pool rules written")
