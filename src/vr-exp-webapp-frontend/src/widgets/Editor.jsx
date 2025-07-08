import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"

export default function Editor({ url }) {
  
  return (
    <>
      <Canvas>
        <ambientLight intensity={10} />
        <Model url={url} />
      </Canvas>
    </>
  );
}

function Model({ url }) {
  const model = useGLTF(url);

  return (
    <mesh>
      <OrbitControls />
      <primitive object={model.scene} />
    </mesh>
  );
}