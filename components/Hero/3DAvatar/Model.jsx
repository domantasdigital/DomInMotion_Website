import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";

import React from "react";

const Model = (props) => {
  const headRef = useRef(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  const texture = useTexture("/images/characterColors.png", (loadedTexture) => {
    loadedTexture.colorSpace = THREE.SRGBColorSpace;
    loadedTexture.flipY = false;
    loadedTexture.needsUpdate = true;
  });

  const { nodes } = useGLTF("/3dModels/myCharacter8.glb", true);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0,
        roughness: 0.9,
      }),
    [texture],
  );

  useEffect(() => {
    const handlePointerMove = (event) => {
      cursorRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      cursorRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame(() => {
    if (!headRef.current) return;

    const isTabletOrLower = size.width < 1024;
    let targetX = 0;
    let targetY = 0;

    if (isTabletOrLower) {
      const scrollProgress = THREE.MathUtils.clamp(
        window.scrollY / (window.innerHeight * 0.35),
        0,
        1,
      );

      targetX = THREE.MathUtils.lerp(-0.4, 0.48, scrollProgress);
    } else {
      targetX = THREE.MathUtils.clamp(-cursorRef.current.y * 0.34, -0.34, 0.34);
      targetY = THREE.MathUtils.clamp(cursorRef.current.x * 0.46, -0.46, 0.46);
    }

    headRef.current.rotation.x = THREE.MathUtils.lerp(
      headRef.current.rotation.x,
      targetX,
      0.08,
    );
    headRef.current.rotation.y = THREE.MathUtils.lerp(
      headRef.current.rotation.y,
      targetY,
      0.08,
    );
  });

  return (
    <group {...props}>
      <mesh
        ref={headRef}
        geometry={nodes.Galva.geometry}
        material={material}
        position={[0.015, 0.25, 0]}
        rotation={[0, 0, 0]}
      />
      <mesh geometry={nodes.Kunas.geometry} material={material} />
    </group>
  );
};

useGLTF.preload("/3dModels/myCharacter8.glb", true);

export default Model;
