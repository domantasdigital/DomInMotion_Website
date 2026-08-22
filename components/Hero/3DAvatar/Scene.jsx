"use client";

import { Canvas } from "@react-three/fiber";
import AvatarExperience from "./AvatarExperience";

export default function Scene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0.03, 0.35, 1.1], fov: 45 }}
    >
      <AvatarExperience />
    </Canvas>
  );
}
