import './style.css';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 3;

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// cube
const geosphere = new THREE.SphereGeometry(1,32,32);
const geotorus = new THREE.TorusGeometry(1,0.3,32,100);
// const geocone = new THREE.ConeGeometry(1,2,32);
// const geoico = new THREE.IcosahedronGeometry(1, 1);
// const geocylinder = new THREE.CylinderGeometry(1,1,2,32);
// const geocircle = new THREE.CircleGeometry(1,32);
// const geoplane = new THREE.PlaneGeometry(2,2);
// const geobox = new THREE.BoxGeometry(1,1,1);

// const positions = new Float32Array([]);
// geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
const mat = new THREE.PointsMaterial({ size: 0.01,sizeAttenuation:true });
const sphere = new THREE.Points(geosphere, mat);
sphere.material.color.set(0x0000ff);
const torus = new THREE.Points(geotorus, mat);
torus.material.color.set("pink");
// const cone = new THREE.Points(geocone, mat);
// const box = new THREE.Points(geobox, mat);
// const plane = new THREE.Points(geoplane, mat);
// const cylinder = new THREE.Points(geocylinder, mat);
// const ico = new THREE.Points(geoico, mat);
// const circle = new THREE.Points(geocircle, mat);

sphere.position.set( 0, 0, -1 );
torus.position.set( 0, 0, 1 );

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
  sphere.rotation.x+=0.01
  torus.rotation.y+=0.01
  renderer.render(scene, camera);
}
animate();
