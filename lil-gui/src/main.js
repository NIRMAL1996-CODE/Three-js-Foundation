import * as THREE from 'three';
import GUI from 'lil-gui'; 

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// cube
let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({ color:"white", wireframe:false });
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// params for GUI
const params = {
  width: 1,
  height: 1,
  depth: 1,
  color: '#ffffff',
  wireframe: false,
  rotateX : 0,
rotateY : 0
};

// GUI
const gui = new GUI();
gui.add(params, 'width', 0.5, 5).onChange(updateGeometry);
gui.add(params, 'height', 0.5, 5).onChange(updateGeometry);
gui.add(params, 'depth', 0.5, 5).onChange(updateGeometry);
gui.addColor(params, 'color').onChange(value => material.color.set(value));
gui.add(params, 'wireframe').onChange(value => material.wireframe = value);
gui.add(cube.rotation, 'x', 0, Math.PI * 2).name('Rotate X');
gui.add(cube.rotation, 'y', 0, Math.PI * 2).name('Rotate Y');


// function to rebuild geometry
function updateGeometry() {
  scene.remove(cube);
  geometry.dispose();
  geometry = new THREE.BoxGeometry(params.width, params.height, params.depth);
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
