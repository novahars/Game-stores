import { Canvas } from "@react-three/fiber";
import { Suspense, createContext, useState, useEffect } from "react";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import LoadingScreen from "./LoadingScreen";
import {
  EffectComposer,
  Outline,
  Selection,
} from "@react-three/postprocessing";
import Content from "./contents/Content";
import Utils from "./Utils";
import Experience from "./Experience";
import { CameraProvider } from "./contexts/CameraContext";
import CameraControll from "./models/CameraControll";
import HamburgerMenu from "./component/HamburgerMenu";
import Navigation from "./navigation/Navigation";
import LoginRegisterModal from './component/LoginRegister';
import { useAutoModal } from "./hooks/useAutoModal";
import * as THREE from "three";


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
  const { showModal, setShowModal } = useAutoModal();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

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



  const controls = CameraControll(/* pass necessary parameters here */);

  return (
    <ContentContext.Provider value={{ data, setData, sections }}>
      <CameraProvider controls={controls}>
        <div className="relative w-full h-screen">
          {showModal && (
            <LoginRegisterModal
              onClose={() => setShowModal(false)}
              onLoginSuccess={(user) => {
                setShowModal(false);
                // Handle login success
              }}
            />
          )}
          <HamburgerMenu onToggle={toggleNav} />
          <Navigation isOpen={isNavOpen} />
          {showLoadingScreen && <LoadingScreen sky={sky} loadingComplete={!showLoadingScreen} />}
          <Suspense fallback={null}>
            <div className={`relative w-full h-full ${isNavOpen ? 'z-[-1]' : 'z-0'}`}>
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
