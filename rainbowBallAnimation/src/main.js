import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { gsap } from "gsap";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.z=10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth ,window.innerHeight);
// makes canvas sharp on high-DPI screens without hurting performance
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight("white", 70);
light.position.set(0,10,10)
scene.add(light);

const ballgeometry = new THREE.SphereGeometry(3, 64, 64);
const ballmaterial = new THREE.MeshStandardMaterial({color: "red",roughness:0.5});
const ball =new THREE.Mesh(ballgeometry, ballmaterial);
scene.add(ball);

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;   // smooth easing when moving
controls.enablePan = false;      // stop dragging scene sideways
controls.enableZoom = false;   // stop manual rotation by mouse
controls.autoRotate = true;      // spin camera automatically
controls.autoRotateSpeed = 6;    // how fast the auto spin happens

// responsive
window.addEventListener("resize", (e)=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  renderer.setSize(window.innerWidth , window.innerHeight);
  camera.updateProjectionMatrix();
});

// Create a timeline
const tl = gsap.timeline({ defaults: {duration:1}}); // repeat infinitely
tl.fromTo(ball.scale, {z:0, x:0 , y:0}, {z:1, x:1 , y:1})
tl.fromTo("nav", {y: "-100%"}, {y: "0%"})
tl.fromTo(".title", {opacity:0}, {opacity:1})

//mousemovement
// window.addEventListener("mousemove", (e) => {
//   const hue = (e.clientX / window.innerWidth) * 360; // full rainbow
//   const saturation = 100;                                   // full saturation
//   const light = (e.clientY / window.innerHeight) * 100; // brightness by Y

//   ball.material.color = new THREE.Color(`hsl(${hue}, ${saturation}%, ${light}%)`);
// });

// auto color change
//  1. Increase hue value by 1 every frame
//     Example: 0 → 1 → 2 … 359 → back to 0
//      This makes the color keep shifting smoothly.
//  2. Create a new color using HSL model:
//      - hue (0–360) = main color (red, green, blue, etc.)
//      - 100% saturation = full, strong color (not faded)
//      - 50% lightness = medium brightness (not too dark or too light)
//      Together this gives a rainbow-like color cycling effect.

// In RGB, you have 3 numbers (Red, Green, Blue). To get a rainbow, you’d need to   juggle all 3 values at once → messy.
// In HSL, you just change hue (0–360) and it automatically gives you the rainbow 🌈. Much simpler for animations.

let hue = 0;

function animate() {
  requestAnimationFrame(animate);
    hue = (hue + 1) % 360; // keep hue between 0–360
    ball.material.color = new THREE.Color(`hsl(${hue}, 100%, 50%)`);
  controls.update();
  renderer.render(scene, camera);
}
animate()