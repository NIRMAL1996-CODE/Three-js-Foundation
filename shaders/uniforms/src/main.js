import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);
camera.position.z= 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth , window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement);

const loader = new THREE.TextureLoader();
const texture1= loader.load("layss.jpeg");

const geometry = new THREE.BoxGeometry(2,2,2);
const material = new THREE.ShaderMaterial({ 
  vertexShader,
  fragmentShader,
  uniforms:{
    uTexture:{value: texture1}
  }
});
const cube = new THREE.Mesh(geometry, material);
cube.position.z = 2;

scene.add(cube);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

  renderer.render(scene, camera);
}
animate();