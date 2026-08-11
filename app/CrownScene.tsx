"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Crown() {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => {
    const segments = 64;
    const rings = [
      { z: -1.35, r: .72 }, { z: -1.15, r: .92 }, { z: -.7, r: 1.08 },
      { z: -.1, r: 1.18 }, { z: .42, r: 1.08 }, { z: .78, r: .82 }, { z: .94, r: .43 },
    ];
    const pos: number[] = [];
    const idx: number[] = [];
    rings.forEach((ring, ri) => {
      for (let i = 0; i < segments; i++) {
        const a = i / segments * Math.PI * 2;
        const lobes = 1 + .085 * Math.cos(4 * a) + .035 * Math.sin(2 * a);
        const upper = ri > 3 ? .11 * Math.cos(4 * a) * ((ri - 3) / 3) : 0;
        pos.push(Math.cos(a) * ring.r * lobes, Math.sin(a) * ring.r * (.9 + .035 * Math.cos(2 * a)), ring.z + upper);
      }
    });
    for (let r = 0; r < rings.length - 1; r++) for (let i = 0; i < segments; i++) {
      const n = (i + 1) % segments, a = r * segments + i, b = r * segments + n, c = (r + 1) * segments + i, d = (r + 1) * segments + n;
      idx.push(a, b, c, b, d, c);
    }
    const bottom = pos.length / 3; pos.push(0, 0, -1.38);
    for (let i = 0; i < segments; i++) idx.push(bottom, i, (i + 1) % segments);
    const top = pos.length / 3; pos.push(0, 0, .69);
    const start = (rings.length - 1) * segments;
    for (let i = 0; i < segments; i++) idx.push(top, start + (i + 1) % segments, start + i);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx); geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const pointerX = state.pointer.x * .16, pointerY = state.pointer.y * .1;
    group.current.rotation.y += (pointerX + state.clock.elapsedTime * .035 - group.current.rotation.y) * .025;
    group.current.rotation.x += (-.15 - pointerY - group.current.rotation.x) * .035;
    group.current.position.y = Math.sin(state.clock.elapsedTime * .7) * .055;
  });

  return <group ref={group} rotation={[-.15, -.35, 0]}>
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} castShadow>
      <meshPhysicalMaterial color="#f5f1e8" roughness={.22} metalness={0} clearcoat={.55} clearcoatRoughness={.2} transmission={.03} thickness={.7} />
    </mesh>
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} scale={1.006}>
      <meshBasicMaterial color="#d7aa55" wireframe transparent opacity={.055} />
    </mesh>
  </group>;
}

export default function CrownScene() {
  return <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 5.2], fov: 35 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
    <ambientLight intensity={.95} color="#fff9eb" />
    <directionalLight position={[-3, 4, 5]} intensity={4.2} color="#ffffff" />
    <pointLight position={[4, 1, 2]} intensity={20} color="#d8a94c" distance={9} />
    <pointLight position={[-3, -2, 3]} intensity={7} color="#b9c8d0" distance={7} />
    <Crown />
  </Canvas>;
}
