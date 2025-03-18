import { Canvas } from "@react-three/fiber";
import { Suspense, createContext, useState, useEffect } from "react";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import LoadingScreen from "./LoadingScreen";
import {
  EffectComposer,
  Outline,
  Selection,
} from "@react-three/postprocessing";
import Content from "./Content";
import Utils from "./Utils";
import Experience from "./Experience";
import { CameraProvider } from "./contexts/CameraContext";
import CameraControll from "./models/CameraControll";

export const ContentContext = createContext();

export default function App() {
  const [data, setData] = useState({
    boolean: false,
    key: "",
    value: "",
    description: "",
    move: null,
  });
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [progress, setProgress] = useState(0);
  const [startZoom, setStartZoom] = useState(false);
  const [sections, setSections] = useState([]); // State buat simpan data dari API

  useEffect(() => {
    let interval = null;
    if (showLoadingScreen) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            setShowLoadingScreen(false);
            setStartZoom(true);
            return 100;
          }
          return prevProgress + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [showLoadingScreen]);

  const [sky, setSky] = useState(null);

  useEffect(() => {
    const loader = new RGBELoader();
    loader.load("assets/autumn_field_puresky_4kcopy.hdr", (loadedTexture) => {
      loadedTexture.mapping = THREE.EquirectangularReflectionMapping;
      setSky(loadedTexture);
    });
  }, []);

  useEffect(() => {
    fetch("https://api.example.com/sections") // Ganti dengan endpoint API lo
      .then((response) => response.json())
      .then((data) => setSections(data))
      .catch((error) => console.error("Error fetching sections:", error));
  }, []);

  const controls = CameraControll(/* pass necessary parameters here */);

  return (
    <ContentContext.Provider value={{ data, setData, sections }}>
      <CameraProvider controls={controls}>
        <div className="relative w-full h-screen">
          {showLoadingScreen && <LoadingScreen sky={sky} loadingComplete={!showLoadingScreen} />}
          <Suspense fallback={null}>
            <div className="relative w-full h-full">
              <Canvas camera={{ position: [0, 5, 1000], fov: 75 }} className="absolute w-full h-full">
                <Selection>
                  <EffectComposer multisampling={8} autoClear={false}>
                    <Outline blur visibleEdgeColor="white" edgeStrength={100} width={3000} />
                  </EffectComposer>
                  <Experience startZoom={startZoom} loadingComplete={!showLoadingScreen} />
                  <Utils />
                </Selection>
              </Canvas>
            </div>
          </Suspense>
          <Content />
        </div>
      </CameraProvider>
    </ContentContext.Provider>
  );
}
