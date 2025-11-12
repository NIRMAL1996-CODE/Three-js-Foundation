import "./style.css";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import vertexShader from './shaders/grassVertex.glsl';
import fragmentShader from './shaders/grassFragment.glsl';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.set(0, 5, 10);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Grass geometry
const grassCount = 1000;
const geometry = new THREE.PlaneGeometry(0.1, 1, 1, 4); // small vertical planes
// Shader material for waving grass
const material = new THREE.ShaderMaterial({
  uniforms: { time: { value: 0 } },
  vertexShader,
  fragmentShader,
  side: THREE.DoubleSide
});

// Instancing grass
for(let i=0; i<grassCount; i++){
  const grass = new THREE.Mesh(geometry, material);
  grass.position.set((Math.random()-0.5)*10, 0, (Math.random()-0.5)*10);
  grass.rotation.y = Math.random() * Math.PI;
  scene.add(grass);
}

// Animation
const clock = new THREE.Clock();
function animate(){
  requestAnimationFrame(animate);
  material.uniforms.time.value = clock.getElapsedTime(); // update time
  renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
