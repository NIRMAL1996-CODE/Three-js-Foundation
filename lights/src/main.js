import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const light = new THREE.AmbientLight("red", .1  ); // soft white light
light.position.set(2,2,2)
scene.add( light );

// MeshStandardMaterial
// MeshPhysicalMaterial
// const directionalLight1 = new THREE.DirectionalLight( "red", 3 );
// directionalLight1.position.set(2, 2, 2);
// scene.add( directionalLight1 );

// const helper = new THREE.DirectionalLightHelper(directionalLight1, 1 );
// scene.add( helper );

// const pointerlight = new THREE.PointLight( 0xff0000, 3, 100 );
// pointerlight.position.set( 1,1,1 );
// scene.add( pointerlight );

// const pointLightHelper = new THREE.PointLightHelper( pointerlight, .4 );
// scene.add( pointLightHelper );

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 1, 3, 1 );
scene.add( spotLight );

const spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( spotLightHelper );

const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshPhysicalMaterial({ color:"white" });
const sphere = new THREE.Mesh(geometry, material);
sphere.rotation.z = 1;
scene.add(sphere);

// directionalLight1.intensity = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping= true;
controls.dampingFactor=0.05;

function animate() {
  requestAnimationFrame(animate);
   controls.update();
  renderer.render(scene, camera);
}
animate();
