import * as THREE from 'three';

// 1. Scene: just makes the empty stage.Without a scene, Three.js doesn’t know where to put objects or lights.
const scene = new THREE.Scene();

// 2. Camera = eyes (tells Three.js what to display and from which angle).
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 3. Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Cube
//to create a cube we gave this class BoxGeometry "box".
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color:"white"});
const cube = new THREE.Mesh(geometry, material);
cube.position.z = 2;

scene.add(cube);

// tracks elapsed time for animations
// We need THREE.Clock to measure time so animations (like rotation, movement) stay smooth and consistent, even if frame rate changes.
let clock= new THREE.Clock();

// 5. Animate
function animate() {
  requestAnimationFrame(animate);
  // gives time passed (in seconds) multiplied by anynumber for faster animation
  cube.rotation.y= clock.getElapsedTime() *5;
  renderer.render(scene, camera);
}
animate();
