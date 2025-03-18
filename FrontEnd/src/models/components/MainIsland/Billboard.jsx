/* eslint-disable react/no-unknown-property */
import { useRef, useContext, useState, useEffect } from "react";
import { ContentContext } from "../../../App";
import { useThree } from "@react-three/fiber";
import { Box3, Vector3 } from "three";
import { Select } from "@react-three/postprocessing";
import CameraControl from "../../CameraControll";
import { Html } from "@react-three/drei";

const content = {
  key: "game_console",  // Menggunakan key "game_console"
  title: "PR and MEDIA BUYING",
  description: `
    Strategic efforts to build brand reputation and optimize ad placements across media channels.
  `,
};
export default function Billboard({ nodes, materials, loadingComplete }) {
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
    z: 5,
  };

  const isMobile = window.innerWidth <= 430;

  let center = ref.current?.position;

  if (ref.current) {
    let object = new Box3().setFromObject(ref.current);
    center = object.getCenter(new Vector3());

    if (isMobile) {
      objectCameraPosition.x = -2;
      objectCameraPosition.y = -1;
      objectCameraPosition.z = 1;
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
        position={[95.748, 29.498, -38.943]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={1.944}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        onClick={(e) => {
          e.stopPropagation();
          setData({ boolean: true, value: content.key });
          click ? resetCamera() : moveCamera();
          setClick(!click);
        }}
      >
        <mesh geometry={nodes.Cube_1_1.geometry} material={materials.baliho} />
        <mesh geometry={nodes.Cube_1_2.geometry} material={materials.asep} />
        <mesh geometry={nodes.Cube_1_3.geometry} material={materials.box} />
        <mesh
          geometry={nodes.Cube_1_4.geometry}
          material={materials["besi kincir angin"]}
        />
        {showHtml && (
          <Html position={[0, 0, -10]} center>
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
