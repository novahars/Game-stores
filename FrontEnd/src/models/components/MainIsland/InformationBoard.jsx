import { useRef, useContext, useState, useEffect } from "react";
import { ContentContext } from "../../../Home";
import { useThree } from "@react-three/fiber";
import { Select } from "@react-three/postprocessing";
import { Float, Html } from "@react-three/drei";
import CameraControl from "../../CameraControll";

const content = {
  key: "handphones"
};


export default function InformationBoard({
  nodes,
  materials,
  loadingComplete,
}) {
  const [hovered, hover] = useState(false);
  const { data, setData } = useContext(ContentContext);
  const ref = useRef();
  const { camera, scene, controls } = useThree((state) => state);
  const [click, setClick] = useState(false);

  const [showHtml, setShowHtml] = useState(false);
  useEffect(() => {
    if (loadingComplete) {
      const timer = setTimeout(() => {
        setShowHtml(true);
      }, 5350);
      return () => clearTimeout(timer); // Hapus timeout jika komponen unmount
    }
  }, [loadingComplete]);

  const objectCameraPosition = {
    x: 20,
    y: 10,
    z: 25,
  };

  const { moveCamera, resetCamera, handleClickOutside, setupListeners } =
    CameraControl(
      ref,
      controls,
      camera,
      scene,
      click,
      setClick,
      setData,
      content,
      objectCameraPosition
    );

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [click]);

  useEffect(() => {
    if (!data || !data.move) {
      return;
    }
    const timer = setTimeout(() => {
      if (data.move === content.key) {
        moveCamera();
      }
    }, 700);
    return () => clearTimeout(timer);
  }, [data.move]);

  return (
    <Select enabled={hovered}>
      <group
        ref={ref}
        position={[90.589, 13.886, 38.709]}
        rotation={[Math.PI / 2, 0, 0]}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        onClick={(e) => {
          e.stopPropagation();
          setData({ boolean: true, value: content.key });
          click ? resetCamera() : moveCamera();
          setClick(!click);
        }}
      >
        <Float
          speed={0.5}
          rotationIntensity={0}
          floatIntensity={5}
          floatingRange={[-0.1, 1.2]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube002.geometry}
            material={materials["Material.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube002_1.geometry}
            material={materials["badan launchpad"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube002_2.geometry}
            material={nodes.Cube002_2.material}
          />
        </Float>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_3.geometry}
          material={materials["besi kincir angin"]}
        />
        {showHtml && (
          <Html position={[0, 0, -20]} center>
            <div
              className="animate-pulse cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                click ? resetCamera() : moveCamera();
              }}
            >
              <span className="relative flex size-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex size-4 rounded-full bg-sky-500"></span>
              </span>
            </div>
          </Html>
        )}
      </group>
    </Select>
  );
}
