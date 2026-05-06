import re
from pathlib import Path

root = Path('frontend/pages')
new_block = (
    '  <link rel="preconnect" href="https://fonts.googleapis.com">\n'
    '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
    '  <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet">\n'
    '  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">\n'
)

old_font_pattern = re.compile(r'<link[^>]*href="https://fonts.googleapis.com/css2\?family=(?:DM\+Sans|Inter|Barlow|Barlow\+Condensed|Syne)[^>]*>', re.S)
preconnect_pattern = re.compile(r'<link[^>]*rel="preconnect" href="https://fonts.googleapis.com"[^>]*>', re.S)
gstatic_pattern = re.compile(r'<link[^>]*rel="preconnect" href="https://fonts.gstatic.com"[^>]*>', re.S)
fontawesome_pattern = re.compile(r'<link[^>]*href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6\.4\.0/css/all\.min\.css"[^>]*>', re.S)

for path in root.rglob('*.html'):
    text = path.read_text(encoding='utf-8')
    original = text

    # Remove any old font import links and duplicate fontawesome entries.
    text = old_font_pattern.sub('', text)
    text = preconnect_pattern.sub('', text)
    text = gstatic_pattern.sub('', text)
    text = fontawesome_pattern.sub('', text)

    if '<meta name="viewport"' in text:
        text = re.sub(r'(<meta name="viewport"[^>]*>)(\s*)', r'\1\n' + new_block + r'\n', text, count=1)
    elif '<head>' in text:
        text = text.replace('<head>', '<head>\n' + new_block + '\n', 1)

    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r'(</title>)\s*<style>', r'\1\n  <style>', text)
    text = re.sub(r'<meta charset="UTF-8">\s*<meta name="viewport"', '<meta charset="UTF-8">\n  <meta name="viewport"', text)

    if text != original:
        path.write_text(text, encoding='utf-8')
        print(f'Patched {path}')
