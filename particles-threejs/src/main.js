import './style.css';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 4;

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.antialias = true; 
document.body.appendChild(renderer.domElement);

// const geocone = new THREE.ConeGeometry(1,2,32);
// const geoico = new THREE.IcosahedronGeometry(1, 1);
// const geocylinder = new THREE.CylinderGeometry(1,1,2,32);
// const geocircle = new THREE.CircleGeometry(1,32);
// const geoplane = new THREE.PlaneGeometry(2,2);
// const geobox = new THREE.BoxGeometry(1,1,1);

const geosphere = new THREE.SphereGeometry(2,64,64);
const matsphere = new THREE.PointsMaterial({ size: 0.01,sizeAttenuation:true,  alphaTest: 0.5, transparent: true, opacity: 0.95 });
const sphere = new THREE.Points(geosphere, matsphere );
sphere.material.color.set("white");

const geotorus = new THREE.TorusGeometry(1,0.4,64,200);
const mattorus = new THREE.PointsMaterial({ size: 0.01,sizeAttenuation:true,alphaTest: 0.4,transparent: true,opacity: 0.95 });
const torus = new THREE.Points(geotorus, mattorus);
torus.material.color.set("pink");
// const cone = new THREE.Points(geocone, mat);
// const box = new THREE.Points(geobox, mat);
// const plane = new THREE.Points(geoplane, mat);
// const cylinder = new THREE.Points(geocylinder, mat);
// const ico = new THREE.Points(geoico, mat);
// const circle = new THREE.Points(geocircle, mat);

sphere.position.set( -2.5, 0, -1 );
torus.position.set( 1.5, 0, 1 );
scene.add(sphere,torus);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// loop
function animate() {
  controls.update();
  requestAnimationFrame(animate);
  // sphere.rotation.x+=0.01
  // torus.rotation.y+=0.01
  sphere.rotation.x += 0.005;
  torus.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();
