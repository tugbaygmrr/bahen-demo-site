import json
import struct
import sys

path = sys.argv[1] if len(sys.argv) > 1 else "public/ribbon.glb"
with open(path, "rb") as f:
    data = f.read()
magic = data[:4]
ver, length = struct.unpack("<II", data[4:12])
json_len, json_type = struct.unpack("<II", data[12:20])
js = data[20 : 20 + json_len].decode("utf-8", errors="ignore")
j = json.loads(js)
nodes = j.get("nodes", [])
print(f"Total nodes: {len(nodes)}")
for i, n in enumerate(nodes):
    nm = n.get("name", "(noname)")
    has_mesh = "mesh" in n
    has_children = "children" in n
    print(f"  [{i}] name={nm} hasMesh={has_mesh} hasChildren={has_children}")
print(f"Meshes: {len(j.get('meshes', []))}")
print(f"Scenes: {len(j.get('scenes', []))}")
