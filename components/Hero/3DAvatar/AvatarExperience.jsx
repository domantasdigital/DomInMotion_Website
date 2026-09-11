"use client";

import { Suspense } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import Model from "./Model";

function ModelFallback() {
  return (
    <mesh position={[0.01, 0.11, 0]}>
      <boxGeometry args={[0.5, 0.78, 0.24]} />
      <meshBasicMaterial color="#ff5376" transparent opacity={0.55} />
    </mesh>
  );
}

export default function Experience() {
  return (
    <>
      <OrbitControls
        target={[0.015, 0.35, 0]}
        enableRotate={false}
        enablePan={false}
        enableZoom={false}
      />

      <Suspense fallback={<ModelFallback />}>
        <Model position={[0, 0, 0]} />
        <Environment preset="dawn" />
      </Suspense>
    </>
  );
}
