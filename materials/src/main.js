import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// MeshStandardMaterial

// const light = new THREE.AmbientLight(  ); // soft white light
// light.position.set(2,2,2)
// scene.add( light );

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshStandardMaterial({ color:"white"});
// const cube = new THREE.Mesh(geometry, material);
// cube.position.z = 1;

// MeshPhysicalMaterial
const directionalLight1 = new THREE.DirectionalLight( "white", 10 );
directionalLight1.position.set(2, 2, 2);
scene.add( directionalLight1 );

const directionalLight2 = new THREE.DirectionalLight( "red", 10 );
directionalLight2.position.set(-2, -2, -2);
scene.add( directionalLight2 );

// const helper = new THREE.DirectionalLightHelper(directionalLight, 0.5 );
// scene.add( helper );

const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshPhysicalMaterial({ color:"white" , wireframe:true});
material.metalness=1
material.roughness=0.6
material.clearcoat=1
directionalLight1.intensity = 2;
directionalLight2.intensity = 1.5;

const sphere = new THREE.Mesh(geometry, material);
sphere.rotation.z = 1;
scene.add(sphere);

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping= true;
controls.dampingFactor=0.05;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  sphere.rotation.y += 0.03;
  sphere.rotation.x += 0.03;
  sphere.rotation.z += 0.03;


  renderer.render(scene, camera);
}
animate();
