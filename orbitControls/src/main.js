import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color:"red"});
const cube = new THREE.Mesh(geometry, material);
cube.position.z = 1;
scene.add(cube);

const controls = new OrbitControls( camera, renderer.domElement );
//for smooth moves we use damping
controls.enableDamping= true;
// controls.dampingFactor=0.05;

//extra properties
// controls.enableRotate= false;
// controls.enableZoom= false;

// controls.minAzimuthAngle= -Math.PI / 4;
// controls.maxAzimuthAngle= Math.PI / 4;

// controls.minPolarAngle= Math.PI / 4
// controls.maxPolarAngle= Math.PI / 1.25 

// controls.minZoom =0.5;
// controls.maxZoom= 2;

// controls.minDistance= 3;
// controls.maxDistance=10;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
