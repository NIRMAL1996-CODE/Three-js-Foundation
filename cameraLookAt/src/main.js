import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const geometry = new THREE.BoxGeometry(.5,1,2);
const material = new THREE.MeshBasicMaterial({ color:"white"});
const cube = new THREE.Mesh(geometry, material);
// cube.position.z = 2;

// cube.lookAt(new THREE.Vector3(-0.5, 0.1 ,0.4));

scene.add(cube);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls= new OrbitControls(camera, renderer.domElement)
const mouse ={
  x:0,
  y:0
};

window.addEventListener("mousemove", function(e){
  mouse.x= e.clientX /window.innerWidth;
  mouse.y= e.clientY / this.window.innerHeight;

  // console.log(e.clientX);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  cube.lookAt(new THREE.Vector3(mouse.x -0.5, -mouse.y +0.5, 1))
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
