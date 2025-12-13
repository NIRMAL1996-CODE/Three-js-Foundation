import './style.css';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import GUI from 'lil-gui';
// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 2);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// HDRI Environment
new RGBELoader().load("/sky.hdr",
  (hdri) => {
    hdri.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = hdri;
    scene.background = hdri;
    
  }
);

const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

const glftloader = new GLTFLoader();
let model; 
glftloader.load("/girl.glb", (gltf) => {
   model = gltf.scene;
   model.scale.set(1, 1, 1);   // adjust if too big
   model.position.set(0, -1, 0);  //girl
  scene.add(model);
});

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const gui = new GUI();

const params = {
  speed: 0.01, // rotation speed
};

gui.add(params, 'speed', 0, 1, 0.001).name('Rotate Speed');

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  if (model) {
    model.rotation.y += params.speed;
  }
  renderer.render(scene, camera);
}
animate();
