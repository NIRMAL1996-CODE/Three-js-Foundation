import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import vertexShader from "./shaders/vertex.glsl";
// import fragmentShader from "./shaders/fragment.glsl";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const loader = new THREE.TextureLoader();
let texture= loader.load('wood.jpeg');

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.ShaderMaterial(
  // {
//  vertexShader,
//  fragmentShader,
//  uniforms:{
//   uTexture: {value: texture}
//  }
// }
);

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
camera.position.z = 5;

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping= true;

//responsive
window.addEventListener("resize",function(e){
  camera.aspect =window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
});

function animate () {
  requestAnimationFrame(animate);
  controls.update();
  mesh.rotation.y+=0.01;
  mesh.rotation.x+=0.01;

  renderer.render(scene, camera);
};
animate()
