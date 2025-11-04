import "./style.css";
import * as THREE from 'three';

const scene = new THREE.Scene();
// const camera= new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const aspectratio= window.innerWidth/window.innerHeight;
const camera = new THREE.OrthographicCamera(-3*aspectratio , 3*aspectratio, 3, -3, 0.1, 100);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);


const renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry= new THREE.BoxGeometry();
const material= new THREE.MeshBasicMaterial({color: 0x8a2be2 });
const cube= new THREE.Mesh(geometry, material);
// cube.position.x=2;
scene.add(cube);

function animate(){
  requestAnimationFrame(animate);
  cube.rotation.y+=0.01;
  cube.rotation.x+=0.01;
  cube.rotation.z+=0.01;
  renderer.render(scene, camera);
}
animate();