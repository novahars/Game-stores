/* eslint-disable react/no-unknown-property */
import { useRef, useContext, useState, useEffect } from "react";
import { ContentContext } from "../../../App";
import { useThree } from "@react-three/fiber";
import { Box3, Vector3 } from "three";
import { Select } from "@react-three/postprocessing";
import CameraControl from "../../CameraControll";
import { Html } from "@react-three/drei";

const content = {
  key: "game_ps",  // Menggunakan key "game_ps"
  title: "DIGITAL MARKETING",
  description: `
    Leveraging online platforms to promote brands and drive growth through measurable strategies.
  `,
};
export default function FerrisWheel({ nodes, materials, loadingComplete }) {
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
    x: -10,
    y: 15,
    z: -10,
  };

  const isMobile = window.innerWidth <= 430;

  let center = ref.current?.position;

  if (ref.current) {
    let object = new Box3().setFromObject(ref.current);
    center = object.getCenter(new Vector3());

    if (isMobile) {
      objectCameraPosition.x = -11;
      objectCameraPosition.y = 9;
      objectCameraPosition.z = -10;
    }
  }

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
        position={[-104.18, 29.8, -38.059]}
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
        <mesh
          geometry={nodes.Line036_1.geometry}
          material={materials["badan kastil"]}
        />
        <mesh
          geometry={nodes.Line036_2.geometry}
          material={materials["atap kincir angin"]}
        />
        <mesh geometry={nodes.Line036_3.geometry} material={materials.box} />
        <mesh
          geometry={nodes.Line036_4.geometry}
          material={nodes.Line036_4.material}
        />
        <mesh
          geometry={nodes.Line036_5.geometry}
          material={materials["planet 1"]}
        />
        <mesh
          geometry={nodes.Line036_6.geometry}
          material={materials["besi kincir angin"]}
        />
        <mesh
          geometry={nodes.Line036_7.geometry}
          material={materials["planet 3"]}
        />
        <mesh
          geometry={nodes.Line036_8.geometry}
          material={materials["badan launchpad"]}
        />
        <mesh
          geometry={nodes.Line036_9.geometry}
          material={materials["head roket"]}
        />
        <mesh
          geometry={nodes.Line036_10.geometry}
          material={materials["badan roket"]}
        />
        <mesh
          geometry={nodes.Line036_11.geometry}
          material={materials["roda canon"]}
        />
        {showHtml && (
          <Html position={[15, 4, -45]} center>
            <div
              className="animate-pulse cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                click ? resetCamera() : moveCamera();
              }}
            >
              <span className="relative flex size-4 z-[-99999]">
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
