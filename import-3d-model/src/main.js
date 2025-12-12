import './style.css';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 3);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls= new OrbitControls(camera, renderer.domElement);
controls.enableDamping=true;

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(2, 2, 2);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

const loader = new GLTFLoader();

let model; 
loader.load("/eye.glb", (gltf) => {
   model = gltf.scene;
  model.scale.set(0.01, 0.01, 0.01);   // adjust if too big
   model.position.set(0, 0, 0);  
  scene.add(model);
});

// let mouseX = 0;
// let mouseY = 0;

// window.addEventListener("mousemove", (e) => {
//   mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
//   mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
// });
window.addEventListener('mousemove', (event) => {
  event.x = (event.clientX / window.innerWidth) * 2 - 1;
  event.y = - (event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
//     if (model) {
//   model.rotation.y = mouseX;  // left-right
//   model.rotation.x = mouseY;  // up-down
// }
}
animate();
