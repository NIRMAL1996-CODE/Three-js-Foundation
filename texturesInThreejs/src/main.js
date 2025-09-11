import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const directionalLight1 = new THREE.DirectionalLight( "white", 3 );
directionalLight1.position.set(2, 2, 2);
scene.add( directionalLight1 );

const textureLoader = new THREE.TextureLoader();
let texture =textureLoader.load("/image.jpeg");
texture.colorSpace= THREE.SRGBColorSpace;

const geometry = new THREE.SphereGeometry(1, 250, 250);
const material = new THREE.MeshPhysicalMaterial({ map: texture});

const sphere = new THREE.Mesh(geometry, material);
sphere.rotation.z = 1;
scene.add(sphere);

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping= true;
controls.dampingFactor=0.05;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
