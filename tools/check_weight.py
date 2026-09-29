"""Check page weight against the project budget.

Run with:  python tools/check_weight.py

Budget: each page under 300 KB excluding fonts, fonts under 400 KB in total,
and no render blocking third party resource.
"""

import re
import sys
from pathlib import Path

PAGE_BUDGET = 300 * 1024
FONT_BUDGET = 400 * 1024

root = Path(__file__).resolve().parent.parent
html_files = sorted(root.glob("*.html"))

# every asset a page pulls in, resolved from the markup
ref = re.compile(r'(?:href|src)="([^"]+)"')

font_total = sum(p.stat().st_size for p in (root / "fonts").glob("*.woff2"))

failed = []
print("{:<16} {:>10}  {}".format("page", "bytes", "budget"))
for page in html_files:
    text = page.read_text(encoding="utf-8")
    seen = set()
    total = page.stat().st_size
    for target in ref.findall(text):
        if target.startswith(("http://", "https://", "//", "data:", "#", "mailto:")):
            if target.startswith(("http://", "https://", "//")):
                failed.append("{}: remote reference {}".format(page.name, target))
            continue
        if target in seen:
            continue
        seen.add(target)
        asset = (page.parent / target.split("?")[0]).resolve()
        if asset.is_file():
            total += asset.stat().st_size
    status = "OK" if total < PAGE_BUDGET else "OVER"
    if total >= PAGE_BUDGET:
        failed.append("{}: {} bytes".format(page.name, total))
    print(
        "{:<16} {:>10}  {} {}".format(
            page.name, total, status, "{:.0f} KB".format(total / 1024)
        )
    )

print(
    "{:<16} {:>10}  {}".format(
        "fonts total", font_total, "{:.0f} KB".format(font_total / 1024)
    )
)
if font_total >= FONT_BUDGET:
    failed.append("fonts: {} bytes".format(font_total))

print()
if failed:
    print("FAIL:")
    for line in failed:
        print("  " + line)
    sys.exit(1)

print(
    "PASS: every page under {} KB excluding fonts, fonts under {} KB.".format(
        PAGE_BUDGET // 1024, FONT_BUDGET // 1024
    )
)
