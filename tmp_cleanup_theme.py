import re
from pathlib import Path

root = Path('frontend/pages')
font_block = (
    '  <link rel="preconnect" href="https://fonts.googleapis.com">\n'
    '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
    '  <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet">\n'
    '  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">\n'
)

font_pattern = re.compile(r'<link[^>]*href="https://fonts.googleapis.com/css2[^>]*>|<link[^>]*rel="preconnect" href="https://fonts.googleapis.com"[^>]*>|<link[^>]*rel="preconnect" href="https://fonts.gstatic.com"[^>]*>|<link[^>]*href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"[^>]*>', re.S)

for path in root.rglob('*.html'):
    text = path.read_text(encoding='utf-8')
    original = text

    # Remove old font import blocks and duplicate fontawesome lines.
    text = font_pattern.sub('', text)

    if '<meta name="viewport"' in text:
        text = re.sub(r'(<meta name="viewport"[^>]*>)(\s*)', r'\1\n' + font_block + '\n', text, count=1)
    elif '<head>' in text:
        text = text.replace('<head>', '<head>\n' + font_block + '\n', 1)

    # Clean up repeated blank lines in head.
    text = re.sub(r'\n{3,}', '\n\n', text)

    if text != original:
        path.write_text(text, encoding='utf-8')
        print(f'Cleaned {path}')
