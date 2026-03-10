
import re
import os

path = r'f:\collegereviewz\client\src\pages\ProfilePage.jsx'
if not os.path.exists(path):
    print(f"File {path} not found")
    exit(1)

with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Filter out comments better
text = re.sub(r'{\s*/\*.*?\*/\s*}', '', text, flags=re.DOTALL)
text = re.sub(r'//.*?\n', '\n', text)
text = re.sub(r'/\*.*?\*/', '', text, flags=re.DOTALL)

# Simplified match for tags
# Start tag: <tag ... > (excluding self-closing)
start_tags = re.finditer(r'<([a-zA-Z\.]+)(?=[^>]*[^/]>)[^>]*>', text)
# End tag: </tag>
end_tags = re.finditer(r'</([a-zA-Z\.]+)>', text)

# Combine and sort by position
all_tags = []
for m in start_tags:
    all_tags.append({'type': 'start', 'name': m.group(1), 'pos': m.start(), 'line': text.count('\n', 0, m.start()) + 1})
for m in end_tags:
    all_tags.append({'type': 'end', 'name': m.group(1), 'pos': m.start(), 'line': text.count('\n', 0, m.start()) + 1})

all_tags.sort(key=lambda x: x['pos'])

stack = []
for tag in all_tags:
    if tag['type'] == 'start':
        if tag['name'] not in ['img', 'br', 'hr', 'input']: # common self-closing but in JSX they MUST be closed. 
            # In our case we use component tags or standard tags.
            stack.append(tag)
    else:
        if not stack:
            print(f"Extra closing tag </{tag['name']}> at line {tag['line']}")
            continue
        top = stack.pop()
        if top['name'] != tag['name']:
            print(f"Mismatch: <{top['name']}> (line {top['line']}) closed by </{tag['name']}> (line {tag['line']})")

if stack:
    for s in stack:
        print(f"Unclosed tag <{s['name']}> at line {s['line']}")
