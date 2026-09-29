"""Compute WCAG 2.x contrast ratios for the SafeSteps token pairs.

Run with:  python tools/contrast.py

Thresholds: body text 4.5 to 1, large text and non-text elements 3 to 1.
Pairs already tabulated in docs/design.md section 4 are included so a token
change shows up as a failure. Exits non zero if any pair drops below target.
"""

import re
import sys
from pathlib import Path


def channel(value):
    value = value / 255.0
    return value / 12.92 if value <= 0.03928 else ((value + 0.055) / 1.055) ** 2.4


def luminance(hex_colour):
    hex_colour = hex_colour.lstrip("#")
    r, g, b = (int(hex_colour[i : i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)


def ratio(a, b):
    la, lb = luminance(a), luminance(b)
    lighter, darker = max(la, lb), min(la, lb)
    return (lighter + 0.05) / (darker + 0.05)


def read_tokens(css_path):
    tokens = {}
    for name, block in re.findall(
        r"(:root[^,{]*)\{(.*?)\}", css_path.read_text(encoding="utf-8"), re.S
    ):
        theme = "light" if "light" in name else "dark"
        for prop, value in re.findall(r"(--[a-z-]+)\s*:\s*(#[0-9A-Fa-f]{6})", block):
            tokens[(theme, prop)] = value
    return tokens


# (foreground, background, minimum, label)
PAIRS = [
    ("--text", "--bg", 4.5, "body text on background"),
    ("--text", "--surface", 4.5, "body text on card"),
    ("--muted", "--bg", 4.5, "muted text on background"),
    ("--muted", "--surface", 4.5, "muted text on card"),
    ("--teal", "--bg", 4.5, "teal link on background"),
    ("--teal", "--surface", 4.5, "teal link on card"),
    ("--on-teal", "--teal", 4.5, "primary button text"),
    ("--amber", "--bg", 4.5, "amber DDSR node on background"),
    ("--amber", "--surface", 4.5, "amber DDSR node on card"),
    ("--coral", "--bg", 4.5, "coral chip and alert text on background"),
    ("--coral", "--surface", 4.5, "coral chip text on card"),
    ("--on-coral", "--coral", 4.5, "quick exit button text"),
    ("--border", "--surface", 3.0, "input border on card (unused, see note)"),
    ("--border", "--bg", 3.0, "input border on its own background"),
    ("--teal", "--bg", 3.0, "focus ring on background"),
    ("--teal", "--surface", 3.0, "focus ring on card"),
]

# Pairs reported for information only. docs/design.md section 4 lists
# "--border: inputs, must stay 3:1" but tabulates that ratio only against the
# background, where it is 3.04. Against the card surface it is 2.73, so inputs
# are given the --bg background instead of --surface and never sit on a card.
INFO_ONLY = {"input border on card (unused, see note)"}

root = Path(__file__).resolve().parent.parent
tokens = read_tokens(root / "css" / "tokens.css")

failed = []
print("{:<38} {:>10} {:>8}".format("pair", "dark", "light"))
print("-" * 58)
for fg, bg, minimum, label in PAIRS:
    row = "{:<38}".format(label)
    for theme in ("dark", "light"):
        a = tokens.get((theme, fg))
        b = tokens.get((theme, bg))
        if not a or not b:
            row += " {:>8}".format("missing")
            failed.append("{}: missing token {} or {}".format(label, fg, bg))
            continue
        value = ratio(a, b)
        row += " {:>8.2f}".format(value)
        if value < minimum:
            message = "{} ({}): {:.2f} is below {:.1f}".format(
                label, theme, value, minimum
            )
            if label in INFO_ONLY:
                print("note: " + message)
            else:
                failed.append(message)
    print(row + "   min {:.1f}".format(minimum))

print()
if failed:
    print("FAIL: {} pair(s) below target.".format(len(failed)))
    for line in failed:
        print("  " + line)
    sys.exit(1)

print("PASS: every pair meets its target in both themes.")
