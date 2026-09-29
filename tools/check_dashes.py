"""Assert no em dash (U+2014) and no en dash (U+2013) anywhere in the project.

Run with:  python tools/check_dashes.py

Uses Python, not grep, because grep in a C locale does not match those code
points reliably.
"""

import sys
from pathlib import Path

EN_DASH = "–"
EM_DASH = "—"
SUFFIXES = {".html", ".css", ".js", ".md", ".txt", ".json"}
SKIP_DIRS = {"node_modules", ".git", "_verify", "fonts"}

root = Path(__file__).resolve().parent.parent
offenders = []
scanned = 0

for path in sorted(root.rglob("*")):
    if not path.is_file() or path.suffix.lower() not in SUFFIXES:
        continue
    if any(part in SKIP_DIRS for part in path.relative_to(root).parts):
        continue
    text = path.read_text(encoding="utf-8")
    scanned += 1
    for number, line in enumerate(text.splitlines(), 1):
        if EN_DASH in line or EM_DASH in line:
            offenders.append(
                "{}:{}: {}".format(path.relative_to(root), number, line.strip()[:90])
            )

if offenders:
    print("FAIL: {} line(s) contain an en dash or em dash.".format(len(offenders)))
    for line in offenders:
        print("  " + line)
    sys.exit(1)

print("PASS: {} files scanned, no U+2013 and no U+2014.".format(scanned))
