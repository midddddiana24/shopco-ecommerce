import re
from pathlib import Path

root = Path('frontend/pages')
font_block = (
    '  <link rel="preconnect" href="https://fonts.googleapis.com">\n'
    '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
    '  <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet">\n'
    '  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">\n'
)
root_vars = (
    ':root {\n'
    '  --cream: #F5F0E8;\n'
    '  --ink: #0A0A0A;\n'
    '  --orange: #E84C1E;\n'
    '  --orange-light: #FF6B3D;\n'
    '  --muted: #6B6560;\n'
    '  --border-light: rgba(10, 10, 10, 0.1);\n'
    '  --black: var(--ink);\n'
    '  --white: #ffffff;\n'
    '  --border: rgba(10, 10, 10, 0.08);\n'
    '}\n'
)

font_link_re = re.compile(r'\s*<link rel="preconnect" href="https://fonts.googleapis.com".*?\n', re.S)
font_gstatic_re = re.compile(r'\s*<link rel="preconnect" href="https://fonts.gstatic.com".*?crossorigin>.*?\n', re.S)
font_import_re = re.compile(r'\s*<link href="https://fonts.googleapis.com/css2[^>]*>\s*\n')
body_class_re = re.compile(r'<body class="([^"]*?)">')

for path in root.rglob('*.html'):
    text = path.read_text(encoding='utf-8')
    original = text

    text = font_link_re.sub('', text)
    text = font_gstatic_re.sub('', text)
    text = font_import_re.sub('', text)
    if '<meta name="viewport"' in text:
        text = re.sub(r'(<meta name="viewport"[^>]*>\s*)', r'\1' + font_block + '\n', text, count=1)
    elif '<head>' in text:
        text = text.replace('<head>', '<head>\n' + font_block + '\n', 1)

    if ':root' in text:
        text = re.sub(r':root\s*{[^}]*}', root_vars, text, flags=re.S)
    elif '<style>' in text:
        text = text.replace('<style>', '<style>\n' + root_vars + '\n', 1)

    def fix_body(match):
        content = match.group(1)
        content = re.sub(r"font-family:\s*['\"][^'\"]*['\"],?\s*sans-serif\s*;", "font-family: 'Barlow', sans-serif;", content)
        content = re.sub(r'background:\s*[^;]+;', 'background: var(--cream);', content)
        content = re.sub(r'color:\s*[^;]+;', 'color: var(--ink);', content)
        if 'font-family' not in content:
            content = "font-family: 'Barlow', sans-serif;\n" + content
        if 'background' not in content:
            content = 'background: var(--cream);\n' + content
        if 'color' not in content:
            content = 'color: var(--ink);\n' + content
        return 'body {' + content + '}'

    text = re.sub(r'body\s*{([^}]*)}', fix_body, text, flags=re.S)

    text = text.replace("font-family: 'Inter', sans-serif;", "font-family: 'Barlow', sans-serif;")
    text = text.replace("font-family: 'DM Sans', sans-serif;", "font-family: 'Barlow', sans-serif;")
    text = text.replace("font-family:'Syne',sans-serif", "font-family:'Barlow Condensed',sans-serif")
    text = text.replace("font-family: 'Syne', sans-serif", "font-family: 'Barlow Condensed', sans-serif")
    text = text.replace('background: #f5f5f3;', 'background: var(--cream);')
    text = text.replace('background: var(--off-white);', 'background: var(--cream);')
    text = text.replace('color: #111;', 'color: var(--ink);')
    text = text.replace('color: var(--black);', 'color: var(--ink);')

    def clean_body_classes(m):
        classes = m.group(1)
        classes = re.sub(r'\b(bg-(slate-50|white)\b|text-slate-900\b)', '', classes)
        classes = re.sub(r'\s{2,}', ' ', classes).strip()
        return '<body class="' + classes + '">' if classes else '<body>'

    text = body_class_re.sub(clean_body_classes, text)

    if text != original:
        path.write_text(text, encoding='utf-8')
        print(f'Updated {path}')
