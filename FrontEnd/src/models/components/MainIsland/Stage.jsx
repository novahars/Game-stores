/* eslint-disable react/no-unknown-property */
import { useRef, useContext, useState, useEffect } from "react";
import { Raycaster, Vector2 } from "three";
import { ContentContext } from "../../../Home";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { Box3, Vector3 } from "three";
import { Select } from "@react-three/postprocessing";
import { Html } from "@react-three/drei";
import CameraControl from "../../CameraControll";

const content = {
  key: "playstation",  // Menyesuaikan key ke "playstation"
  title: "EVENT ORGANIZER",
  description: `
    Professionals specializing in planning, coordinating, and executing events for unforgettable experiences.
  `,
};

export default function Stage({ nodes, materials, loadingComplete }) {
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
    y: 5,
    z: -10,
  };

  const isMobile = window.innerWidth <= 430;

  let center = ref.current?.position;

  if (ref.current) {
    let object = new Box3().setFromObject(ref.current);
    center = object.getCenter(new Vector3());

    if (isMobile) {
      objectCameraPosition.x = -2;
      objectCameraPosition.y = 0;
      objectCameraPosition.z = -15;
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

  // Menambahkan event listener untuk klik luar
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
    }, 500);
    return () => clearTimeout(timer);
  }, [data.move]);

  return (
    <Select enabled={hovered}>
      <group
        ref={ref}
        position={[15.992, 14.137, -96.271]}
        rotation={[Math.PI / 2, 0, 0]}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={(e) => (e.stopPropagation(), hover(false))}
        onClick={(e) => {
          e.stopPropagation();
          setData({ boolean: true, value: content.key });
          click ? resetCamera() : moveCamera();
          setClick(!click);
        }}
      >
        <mesh
          geometry={nodes.concert_stage_main_final_1.geometry}
          material={materials.asep}
        />
        <mesh
          geometry={nodes.concert_stage_main_final_2.geometry}
          material={materials.box}
        />
        <mesh
          geometry={nodes.concert_stage_main_final_3.geometry}
          material={materials["badan roket"]}
        />
        <mesh
          geometry={nodes.concert_stage_main_final_4.geometry}
          material={materials["planet 1"]}
        />
        <mesh
          geometry={nodes.concert_stage_main_final_5.geometry}
          material={materials["badan launchpad"]}
        />
        <mesh
          geometry={nodes.concert_stage_main_final_6.geometry}
          material={materials["planet 3"]}
        />
        <mesh
          geometry={nodes.concert_stage_main_final_7.geometry}
          material={materials["batang pohon"]}
        />
        <mesh
          geometry={nodes.concert_stage_main_final_8.geometry}
          material={materials["head roket"]}
        />
        <mesh
          geometry={nodes.concert_stage_main_final_9.geometry}
          material={materials["daun 2"]}
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
