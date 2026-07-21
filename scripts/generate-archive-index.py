#!/usr/bin/env python3
"""
Generate archive-index.json from files in /content/archive/
Run this script after adding new archive files.
"""

import os
import json
from pathlib import Path

def parse_front_matter(content):
    if not content.startswith('---'):
        return {}, content

    parts = content.split('---', 2)
    if len(parts) < 3:
        return {}, content

    fm = {}
    for line in parts[1].strip().split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            fm[key.strip()] = value.strip().strip('"').strip("'")

    return fm, parts[2]

def main():
    archive_dir = Path('content/archive')
    index_file = Path('content/archive-index.json')

    if not archive_dir.exists():
        print(f"Creating {archive_dir}")
        archive_dir.mkdir(parents=True, exist_ok=True)

    files = []
    for f in sorted(archive_dir.glob('*.md')):
        files.append(f.name)

    index = {
        "files": files,
        "lastUpdated": str(Path('content/today.md').stat().st_mtime) if Path('content/today.md').exists() else ""
    }

    with open(index_file, 'w', encoding='utf-8') as f:
        json.dump(index, f, indent=2)

    print(f"Generated {index_file} with {len(files)} files")
    for f in files:
        print(f"  - {f}")

if __name__ == '__main__':
    main()
