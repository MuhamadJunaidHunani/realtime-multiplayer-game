// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// // Scene setup
// const scene = new THREE.Scene();

// // Camera setup
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 10; // Adjust this if the model is too close or too far

// // Renderer setup
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Lighting - ambient light and directional light
// const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft white light
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White directional light
// directionalLight.position.set(10, 10, 10); // Position the light above the scene
// scene.add(directionalLight);

// // Load GLTF model
// const loader = new GLTFLoader();
// loader.load(
//   '/models/car.glb', // Update with the correct path to your model
//   (gltf) => {
//     console.log('Model loaded successfully');
//     scene.add(gltf.scene);
//   },
//   undefined,
//   (error) => {
//     console.error('Error loading model:', error);
//   }
// );

// // Animation loop
// const animate = () => {
//   requestAnimationFrame(animate);
  
//   // Optional: Rotate the model to view it better
//   if (scene.children[0]) {
//     scene.children[0].rotation.y += 0.06; // Rotate model slowly
//   }

//   renderer.render(scene, camera);
// };

// // Start animation loop
// animate();
