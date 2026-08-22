"use client";

import { Suspense } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import Model from "./Model";

export default function Experience() {
  return (
    <>
      <OrbitControls
        target={[0.015, 0.35, 0]}
        enableRotate={false}
        enablePan={false}
        enableZoom={false}
      />

      <Suspense>
        <Model position={[0, 0, 0]} />
        <Environment preset="dawn" />
      </Suspense>
    </>
  );
}
