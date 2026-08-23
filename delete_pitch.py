#!/usr/bin/env python3
"""Permanently strip football-pitch markup and green field CSS from the app HTML."""
from pathlib import Path
import re

root = Path(__file__).resolve().parent
KILL_SEL = (
    r"pitch|pitch-lines|pitch-midline|auth-sport-fx|league-fx|"
    r"homeBgUcl|home-banner|space-bg|warp-img|\\.warp\\b|warp2|warp-stars|"
    r"ucl-bg|space-wallpaper"
)

def strip_css_rules(text):
    out = []
    i = 0
    n = len(text)
    while i < n:
        brace = text.find("{", i)
        if brace < 0:
            out.append(text[i:])
            break
        start = text.rfind("}", i, brace)
        start = i if start < 0 else start + 1
        selector = text[start:brace]
        depth = 0
        j = brace
        while j < n:
            if text[j] == "{":
                depth += 1
            elif text[j] == "}":
                depth -= 1
                if depth == 0:
                    j += 1
                    break
            j += 1
        if re.search(KILL_SEL, selector, re.I):
            out.append(text[i:start])
            i = j
            continue
        out.append(text[i:j])
        i = j
    return "".join(out)

def strip_html_nodes(text):
    text = re.sub(
        r"<div[^>]*(?:class|id)=[\"'][^\"']*(?:pitch|auth-sport-fx|league-fx|homeBgUcl|space-bg|warp)[^\"']*[\"'][^>]*>[\\s\\S]*?</div>",
        "",
        text,
        flags=re.I,
    )
    text = re.sub(
        r"<[^>]+(?:class|id)=[\"'][^\"']*(?:pitch|auth-sport-fx|league-fx|homeBgUcl)[^\"']*[\"'][^>]*/?>",
        "",
        text,
        flags=re.I,
    )
    text = re.sub(r"<img[^>]+(?:ucl-bg|space-wallpaper)[^>]*>", "", text, flags=re.I)
    return text

def recolor(text):
    reps = {
        "#20e58b": "#d4af37",
        "#00c853": "#d4af37",
        "#16a34a": "#d4af37",
        "#22c55e": "#d4af37",
        "#2ee56a": "#d4af37",
        "#14532d": "#0b0c10",
        "#166534": "#0b0c10",
        "#15803d": "#0b0c10",
        "#052e16": "#0b0c10",
        "#0a3d1c": "#0b0c10",
        "#0b3d1c": "#0b0c10",
        "#0d3b1e": "#0b0c10",
        "#113311": "#0b0c10",
        "#0a2f0a": "#0b0c10",
        "#0b4d2a": "#0b0c10",
        "#0c3b1e": "#0b0c10",
        "--green:#20e58b": "--green:#d4af37",
    }
    for a, b in reps.items():
        text = text.replace(a, b)
        text = text.replace(a.upper(), b)
    return text

for name in ("frontend.part1.html", "frontend.part2.html", "frontend.part3.html", "frontend.part4.html", "frontend.html"):
    p = root / name
    if not p.exists():
        continue
    t = p.read_text(encoding="utf-8", errors="replace")
    t2 = strip_css_rules(t)
    t2 = strip_html_nodes(t2)
    t2 = recolor(t2)
    if t2 != t:
        p.write_text(t2, encoding="utf-8")
        print("stripped pitch from", name, "delta", len(t) - len(t2))
    else:
        print("no pitch change", name)
print("delete_pitch done")
