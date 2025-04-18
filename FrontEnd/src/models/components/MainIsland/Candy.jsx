import { useRef, useContext, useState, useEffect } from "react";
import { Raycaster, Vector2 } from "three";
import { ContentContext } from "../../../Home";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { Box3, Vector3 } from "three";
import { Select } from "@react-three/postprocessing";
import CameraControl from "../../CameraControll";
import { Html } from "@react-three/drei";

const content = {
  key: "console"
};


export default function Candy({ nodes, materials, loadingComplete }) {
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
    x: 5,
    y: 15,
    z: 5,
  };

  const isMobile = window.innerWidth <= 430;

  let center = ref.current?.position;

  if (ref.current) {
    let object = new Box3().setFromObject(ref.current);
    center = object.getCenter(new Vector3());

    if (isMobile) {
      objectCameraPosition.x = -20;
      objectCameraPosition.y = 0;
      objectCameraPosition.z = -5;
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
        position={[-1.189, 34.247, 95.311]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={11.073}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        onClick={(e) => {
          e.stopPropagation();
          setData({ boolean: true, value: content.key });
          click ? resetCamera() : moveCamera();
          setClick(!click);
        }}
      >
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, 2.555, 0]}>
            <group position={[0, -3.363, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_17.geometry}
                material={materials.Creme}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_17_1.geometry}
                material={materials.Siva}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_17_2.geometry}
                material={materials.Yellow}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_17_3.geometry}
                material={materials.Darkgren}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_17_4.geometry}
                material={materials.Metal}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_17_5.geometry}
                material={materials.LightGreen}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_17_6.geometry}
                material={materials["Material.002"]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_17_7.geometry}
                material={materials.material}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_17_8.geometry}
                material={materials.White}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_17_9.geometry}
                material={materials.Green}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_17_10.geometry}
                material={materials.Glass}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_17_11.geometry}
                material={materials.Pink}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_17_12.geometry}
                material={materials.SivaTamnija}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_17_13.geometry}
                material={materials["material_0.001"]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_17_14.geometry}
                material={materials.loolipop}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_17_15.geometry}
                material={materials.Gold}
              />

              {showHtml && (
                <Html position={[0, 1, 0]} center>
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
          </group>
        </group>
      </group>
    </Select>
  );
}
