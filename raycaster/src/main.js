import * as THREE from 'three';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cubes
const geometry = new THREE.BoxGeometry();
const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube1 = new THREE.Mesh(geometry, material1);
cube1.position.x = -1.5;
scene.add(cube1);

const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cube2 = new THREE.Mesh(geometry, material2);
cube2.position.x = 1.5;
scene.add(cube2);

camera.position.z = 5;

// Raycaster
// Raycaster uses THREE.Vector2 for the mouse because it only needs 2D screen coordinates, not 3D.
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Mouse move event
window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
});

// Animate
function animate() {
  requestAnimationFrame(animate);

  // this line turns your 2D mouse into a 3D ray that can hit objects.
  raycaster.setFromCamera(mouse, camera);
  // it tells you which objects your mouse is pointing at in 3D.
  const intersects = raycaster.intersectObjects([cube1, cube2]);

  // Reset colors.This ensures that when the mouse moves away, the cube goes back to its original color.
  cube1.material.color.set(0x00ff00);
  cube2.material.color.set(0x0000ff);

   // Change color if hovered. 
    // intersects is the array of objects the ray is hitting.
    // forEach goes through each hit object.
    // obj.object is the actual 3D mesh that was hit.
    // material.color.set(0xff0000) changes its color to red.In short: turns any hovered object red while your mouse is over it.

 intersects.forEach((obj) => {
    obj.object.material.color.set(0xff0000);
  });

  renderer.render(scene, camera);
}
animate();
