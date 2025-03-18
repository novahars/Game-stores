import { useEffect } from "react";
import { Box3, Vector3, Raycaster, Vector2 } from "three";
import gsap from "gsap";
import { CameraContext } from "../contexts/CameraContext";

export default function CameraControl(
  ref,
  controls,
  camera,
  scene,
  click,
  setClick,
  setData,
  content,
  objectCameraPosition
) {
  // Initialize window.cameraControls immediately
  if (!window.cameraControls) {
    window.cameraControls = {};
  }

  const resetCamera = () => {
    if (!controls) return;
    
    controls.azimuthRotateSpeed = 0.2;
    controls.polarRotateSpeed = 0.2;
    controls.dollySpeed = 1;

    setClick(false);
    setData((prevData) => ({ ...prevData, boolean: false }));

    controls.reset(true);
  };

  const moveCamera = () => {
    if (!ref.current) {
      console.error("Reference to object is not ready.");
      return;
    }

    const object = new Box3().setFromObject(ref.current);
    const center = object.getCenter(new Vector3());

    const tween = gsap.to(controls, {
      duration: 1,
      paused: true,
      onUpdate: () => {
        controls.azimuthRotateSpeed = 0;
        controls.polarRotateSpeed = 0;
        controls.dollySpeed = 0;

        controls.setLookAt(
          objectCameraPosition.x,
          objectCameraPosition.y,
          objectCameraPosition.z,
          center.x,
          center.y,
          center.z,
          true
        );
      },
      onComplete: () => {
        setData((prevData) => ({
          ...prevData,
          key: content.key,
          boolean: true,
          value: content.title,
          description: content.description,
        }));
      },
    });

    tween.play(0);
    setClick(true);
  };

  // Update window.cameraControls immediately
  window.cameraControls.resetCamera = resetCamera;
  window.cameraControls.moveCamera = moveCamera;

  // const handleClickOutside = (event) => {
  //   const mouse = new Vector2();
  //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  //   const raycaster = new Raycaster();
  //   raycaster.setFromCamera(mouse, camera);

  //   const intersects = raycaster.intersectObjects(scene.children, true);

  //   if (
  //     !intersects.some((intersect) => intersect.object === ref.current) &&
  //     click
  //   ) {
  //     console.log("Clicked outside object, resetting camera.");
  //     resetCamera();
  //   }
  // };

  return {
    moveCamera, resetCamera //handleClickOutside
  };
}
