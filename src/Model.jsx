import { useRef, useEffect } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Model = () => {
  const modelRef = useRef();
  const { scene } = useGLTF("/Girl.glb");

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          if (child.name.includes("BézierCurve")) {
            child.material.opacity = 1;
            child.material.transparent = false;
            child.material.alphaTest = 0;
            child.material.depthWrite = true;
            child.material.depthTest = true;
          }
        }
      });
    }
  }, [scene]);

  return (
    <mesh ref={modelRef} scale={7} position={[0.4, -7, -2]}>
      <primitive object={scene} />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }}>
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        // minDistance={14}
        // maxDistance={14}
        target={[0, 0, 0]}
      />
      
      <ambientLight intensity={0.8} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1.2} 
        castShadow
      />
      <pointLight position={[-5, 5, 5]} intensity={0.9} castShadow />
      
      <pointLight position={[0, 5, -5]} intensity={0.5} />
      
      <Model />
    </Canvas>
  );
};

export default Scene;