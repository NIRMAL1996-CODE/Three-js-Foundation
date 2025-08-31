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
const material = new THREE.MeshBasicMaterial({ color:"white", wireframe:true });
const cube = new THREE.Mesh(geometry, material);
cube.position.y = -2;

scene.add(cube);

const conegeometry = new THREE.ConeGeometry(1,1);
const conematerial = new THREE.MeshBasicMaterial({ color:"yellow", wireframe:true });
const cone = new THREE.Mesh(conegeometry, conematerial);
cone.position.y = 3;
scene.add(cone);

const donutgeometry = new THREE.TorusGeometry();
const donutmaterial = new THREE.MeshBasicMaterial({ color:"pink",wireframe:true });
const donut = new THREE.Mesh( donutgeometry, donutmaterial);
donut.position.x = 3;
scene.add(donut);

const spheregeometry = new THREE.SphereGeometry();
const spherematerial = new THREE.MeshBasicMaterial({ color:"teal", wireframe:true });
const sphere = new THREE.Mesh(spheregeometry, spherematerial);
sphere.position.x = -3;
scene.add(sphere);

// 5. Animate
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // cone.rotation.x += 0.01;
  cone.rotation.y += 0.01;
  donut.rotation.x += 0.01;
  donut.rotation.y += 0.01;
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();
