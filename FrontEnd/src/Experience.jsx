import { Sparkles, Stars } from "@react-three/drei";
import { Island } from "./models/Island";
import Sky from "./models/Sky";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useThree } from "@react-three/fiber";

export default function Experience({ startZoom, loadingComplete }) {
  const { camera } = useThree();

  const [isMobile, setIsMobile] = useState(false);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkIsMobile(); // Untuk memastikan saat pertama kali render
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const islandPosition = isMobile ? [-10, -7, -10] : [0, 0, 0]; // Posisi berdasarkan perangkat
  const islandScale = isMobile ? [0.2, 0.2, 0.2] : [0.3, 0.3, 0.3]; // Skala berdasarkan perangkat

  return (
    <>
      <Island position={islandPosition} scale={islandScale} loadingComplete={loadingComplete} />
      <Sky />
      <Stars
        radius={100}
        depth={30}
        count={3000}
        factor={3}
        saturation={0}
        fade
        speed={1000}
      />
      {!isMobile && <Sparkles size={50} scale={[500, 500, 500]} speed={5} count={1000} />}
    </>
  );
}
