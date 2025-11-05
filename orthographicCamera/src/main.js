import "./style.css";
import * as THREE from 'three';

// cursor
window.addEventListener('mousemove',(event)=>{
console.log(event.x);
})
const scene = new THREE.Scene();
const camera= new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// const aspectratio= window.innerWidth/window.innerHeight;
// // left, right, top, bottom, near, far
// const camera = new THREE.OrthographicCamera(
//   -3 * aspectratio, // left side (multiplied by screen ratio to keep shape correct)
//   3 * aspectratio,  // right side
//   3,                // top side
//   -3,               // bottom side
//   0.1,              // near clipping plane (start of visible range)
//   100               // far clipping plane (end of visible range)
// );

camera.position.z =5;
camera.lookAt(0, 0, 0);

const renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry= new THREE.BoxGeometry();
const material= new THREE.MeshBasicMaterial({color: 0x8a2be2 });
const cube= new THREE.Mesh(geometry, material);
cube.position.z=2;
scene.add(cube);

function animate(){
  requestAnimationFrame(animate);
  cube.rotation.y+=0.01;
  // cube.rotation.x+=0.01;
  // cube.rotation.z+=0.01;
  renderer.render(scene, camera);
}
animate();