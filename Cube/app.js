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

// methods = ways to change or get info about that vector.
// cube.position.set(1, 2, -2);  
// // set(x, y, z) → sets the cube’s position in 3D space

// console.log(cube.position.length());  
// // length() → gives distance from origin (0,0,0) → √(x² + y² + z²)

// console.log(cube.position.distanceTo(new THREE.Vector3(0, 0, 0)));  
// // distanceTo(vector) → gives distance between cube’s position and given vector point

// console.log(cube.position.normalize());  
// // normalize() → converts position vector to unit length (makes its length = 1) but keeps direction same




scene.add(cube);

// 5. Animate
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
