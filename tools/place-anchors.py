"""
Blender > Scripting > New > yapıştır > Run Script

Aktif (seçili) mesh objesinin yüzeyine N adet Empty (Plain Axes) ekler:
 - Adlar: Anchor_01, Anchor_02, ...
 - Pozisyonlar alan-ağırlıklı + Poisson-disk benzeri seyreltme ile dağıtılır
 - Her empty'nin +Z ekseni o noktadaki yüzey normaline döndürülür
 - Sahnedeki eski "Anchor_*" empty'leri silinir (yeniden çalıştırınca temizlenir)

Sonra File > Export > glTF 2.0 (.glb), 'Limit to: Visible Objects' işaretle, üzerine yaz.
"""

import math
import random
from typing import List, Optional, Tuple

import bmesh
import bpy
from mathutils import Vector

NUM_ANCHORS = 16
SEED = 7  # değiştirirsen dağılım değişir
MIN_DIST_FRACTION = 0.85  # 1.0 = tam Poisson, 0.5 = gevşek; düşürürsen daha sık konur


def remove_existing_anchors() -> None:
    for obj in list(bpy.data.objects):
        if obj.name.startswith("Anchor_") or obj.name.startswith("Anchor "):
            bpy.data.objects.remove(obj, do_unlink=True)


def pick_mesh() -> Optional[bpy.types.Object]:
    obj = bpy.context.active_object
    if obj and obj.type == "MESH":
        return obj
    for o in bpy.context.selected_objects:
        if o.type == "MESH":
            return o
    for o in bpy.data.objects:
        if o.type == "MESH":
            return o
    return None


def sample_points_on_mesh(
    obj: bpy.types.Object, count: int, seed: int
) -> List[Tuple[Vector, Vector]]:
    rng = random.Random(seed)

    bm = bmesh.new()
    bm.from_mesh(obj.data)
    bm.transform(obj.matrix_world)
    bmesh.ops.triangulate(bm, faces=bm.faces[:])
    bm.faces.ensure_lookup_table()

    # alan-ağırlıklı kümülatif dağılım
    areas: List[float] = []
    total = 0.0
    for f in bm.faces:
        a = f.calc_area()
        total += a
        areas.append(total)

    if total <= 0.0:
        bm.free()
        return []

    bbox_min = Vector((min(v.co.x for v in bm.verts),
                       min(v.co.y for v in bm.verts),
                       min(v.co.z for v in bm.verts)))
    bbox_max = Vector((max(v.co.x for v in bm.verts),
                       max(v.co.y for v in bm.verts),
                       max(v.co.z for v in bm.verts)))
    diag = (bbox_max - bbox_min).length
    # ideal mesafe: sphere yüzeyinde ~eşit dağılım yaklaşıklığı
    min_dist = MIN_DIST_FRACTION * (diag / math.sqrt(max(1, count)))

    samples: List[Tuple[Vector, Vector]] = []
    attempts = 0
    max_attempts = count * 200

    while len(samples) < count and attempts < max_attempts:
        attempts += 1
        r = rng.random() * total
        # ikili arama
        lo, hi = 0, len(areas) - 1
        while lo < hi:
            mid = (lo + hi) // 2
            if areas[mid] < r:
                lo = mid + 1
            else:
                hi = mid
        face = bm.faces[lo]

        # üçgen üstünde uniform örnek (barycentric)
        u = rng.random()
        v = rng.random()
        if u + v > 1.0:
            u, v = 1.0 - u, 1.0 - v
        w = 1.0 - u - v
        verts = face.verts
        pos = verts[0].co * w + verts[1].co * u + verts[2].co * v
        normal = face.normal.copy().normalized()

        too_close = False
        for p, _ in samples:
            if (p - pos).length < min_dist:
                too_close = True
                break
        if not too_close:
            samples.append((pos, normal))

    bm.free()

    # gerekirse minimum mesafeyi gevşeterek doldur
    if len(samples) < count:
        bm = bmesh.new()
        bm.from_mesh(obj.data)
        bm.transform(obj.matrix_world)
        bmesh.ops.triangulate(bm, faces=bm.faces[:])
        bm.faces.ensure_lookup_table()
        while len(samples) < count:
            r = rng.random() * total
            lo, hi = 0, len(areas) - 1
            while lo < hi:
                mid = (lo + hi) // 2
                if areas[mid] < r:
                    lo = mid + 1
                else:
                    hi = mid
            face = bm.faces[lo]
            u, v = rng.random(), rng.random()
            if u + v > 1.0:
                u, v = 1.0 - u, 1.0 - v
            w = 1.0 - u - v
            verts = face.verts
            pos = verts[0].co * w + verts[1].co * u + verts[2].co * v
            normal = face.normal.copy().normalized()
            samples.append((pos, normal))
        bm.free()

    return samples


def create_anchor(name: str, position: Vector, normal: Vector) -> None:
    bpy.ops.object.empty_add(type="PLAIN_AXES", location=position)
    empty = bpy.context.active_object
    empty.name = name
    empty.empty_display_size = 0.12

    # +Z'yi yüzey normaline döndür
    up = Vector((0, 0, 1))
    if normal.length_squared > 1e-8:
        quat = up.rotation_difference(normal.normalized())
        empty.rotation_mode = "QUATERNION"
        empty.rotation_quaternion = quat


def main() -> None:
    mesh_obj = pick_mesh()
    if mesh_obj is None:
        raise RuntimeError("Mesh bulunamadı. Heykel objesini seç ve tekrar çalıştır.")

    remove_existing_anchors()
    samples = sample_points_on_mesh(mesh_obj, NUM_ANCHORS, SEED)

    for i, (pos, normal) in enumerate(samples):
        create_anchor(f"Anchor_{i + 1:02d}", pos, normal)

    print(f"[place-anchors] {len(samples)} adet Anchor oluşturuldu.")


main()
