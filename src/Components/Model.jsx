import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeScene = ({ carRef, carData }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 1, 5000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    // Renderer setup
    renderer.setSize(100, 100); // Adjust size to match your game
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 10);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    // Load car model
    const loader = new GLTFLoader();
    let carModel = null;
    loader.load(
      "/models/car.glb",
      (gltf) => {
        carModel = gltf.scene;
        carModel.scale.set(0.5, 0.5, 0.5);
        carModel.position.set(0, 0, 0);
        scene.add(carModel);
      },
      undefined,
      (error) => console.error("Error loading car model:", error)
    );

    const animate = () => {
      if (carModel) {
        carModel.position.x = carData.x / 100; // Sync with game coordinates
        carModel.position.y = carData.y / 100; // Adjust as needed
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      renderer.dispose();
    };
  }, [carData]);

  return <div ref={mountRef} style={{ position: "absolute", left: carData?.x, top: carData?.y }} />;
};

export default ThreeScene;

;
