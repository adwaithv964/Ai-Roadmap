
import os

source_path = 'App.jsx'
dest_path = 'data/roadmaps.js'

with open(source_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_line = 35 # 0-indexed, so line 36 is index 35
end_line = 1034 # 0-indexed, so line 1034 is index 1033. But slice is exclusive, so 1034.

# Verify lines
print(f"Start line content: {lines[start_line]}")
print(f"End line content: {lines[end_line-1]}")

roadmaps_content = lines[start_line:end_line]

# Add export
if roadmaps_content[0].startswith('const roadmaps'):
    roadmaps_content[0] = 'export ' + roadmaps_content[0]

with open(dest_path, 'w', encoding='utf-8') as f:
    f.writelines(roadmaps_content)

print(f"Extracted {len(roadmaps_content)} lines to {dest_path}")
