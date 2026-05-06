import re
from pathlib import Path
root = Path('frontend/pages')
for path in root.rglob('*.html'):
    text = path.read_text(encoding='utf-8')
    original = text
    text = re.sub(r'(width=device-width, initial-scale=1\.0">)\s*<link rel="preconnect"', r'\1\n  <link rel="preconnect"', text)
    text = re.sub(r'(</title>)\s*<style>', r'\1\n  <style>', text)
    text = re.sub(r'<meta charset="UTF-8">\s*<meta name="viewport"', '<meta charset="UTF-8">\n  <meta name="viewport"', text)
    if text != original:
        path.write_text(text, encoding='utf-8')
        print(f'Fixed {path}')
