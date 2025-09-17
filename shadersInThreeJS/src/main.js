import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(2, 3, 100, 100);
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  side: THREE.DoubleSide,
  uniforms:{
    uTime:{
      value:0,
    }
  }
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const controls = new OrbitControls( camera, renderer.domElement );
//for smooth moves we use damping
controls.enableDamping= true;

camera.position.z = 5;

//responsive
window.addEventListener("resize",function(e){
  camera.aspect =window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
})

function animate () {
  requestAnimationFrame(animate)
  material.uniforms.uTime.value +=0.1;
  // mesh.rotation.x +=0.01
  // mesh.rotation.y +=0.01
  controls.update();
  renderer.render(scene, camera);
};
animate()