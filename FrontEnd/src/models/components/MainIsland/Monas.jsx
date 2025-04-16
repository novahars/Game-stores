
import { useRef, useContext, useState, useEffect } from "react";
import { ContentContext } from "../../../Home";
import { useThree } from "@react-three/fiber";
import { Select } from "@react-three/postprocessing";
import { Html } from "@react-three/drei";
import CameraControl from "../../CameraControll";

const content = {
  key: "pc",  // Disesuaikan dengan key "pc" di StoreSeeder
  title: "ABOUT US",
  description: "Need More information? Click This Button For detail.",
};


export default function Monas({ nodes, materials, loadingComplete }) {
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
    x: 12,
    y: 32,
    z: -51,
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
        rotation={[Math.PI / 2, 0, 0]}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        onClick={(e) => {
          e.stopPropagation();
          // Trigger modal dengan mengirim key objek
          setData({ boolean: true, value: content.key });
          // Lakukan aksi kamera
          click ? resetCamera() : moveCamera();
          // Update state click jika perlu
          setClick(!click);
        }}
      >
      
        {/* Mesh utama */}
        <mesh
          geometry={nodes.Areas_building_001_1.geometry}
          material={nodes.Areas_building_001_1.material}
        />
        <mesh
          geometry={nodes.Areas_building_001_2.geometry}
          material={materials["kaki monas"]}
        />
        <mesh
          geometry={nodes.Areas_building_001_3.geometry}
          material={materials["pucuk monas"]}
        />

        {/* Titik Bulat (Indicator Button) */}
        {/* Titik Bulat */}
        {showHtml && (
          <Html position={[0, 0, -120]} center>
            <div
              className="animate-pulse cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                click ? resetCamera() : moveCamera();
              }}
            >
              <span className="relative flex size-4 ">
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
