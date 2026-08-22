import { useMemo } from "react";
import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";

import React from "react";

const Model = (props) => {
  const texture = useTexture("/images/characterColors.png", (loadedTexture) => {
    loadedTexture.colorSpace = THREE.SRGBColorSpace;
    loadedTexture.flipY = false;
    loadedTexture.needsUpdate = true;
  });

  const { nodes } = useGLTF("/3dModels/myCharacter5.glb", true);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0,
        roughness: 0.9,
      }),
    [texture],
  );

  return (
    <group {...props}>
      <mesh
        geometry={nodes.Galva.geometry}
        material={material}
        position={[0.015, 0.35, 0]}
      />
      <mesh geometry={nodes.Kunas.geometry} material={material} />
    </group>
  );
};

useGLTF.preload("/3dModels/myCharacter1.glb", true);

export default Model;
