import './style.css'
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

let textMesh;
const loader = new FontLoader();
loader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  
  const geometry = new TextGeometry("Hello Nirmal", {
    font: font,
     size: 1,
	   depth: 0.2,
	   curveSegments: 12
  });
  geometry.center();

  const material = new THREE.MeshBasicMaterial({ color: "pink" });
  textMesh = new THREE.Mesh(geometry, material);
  scene.add(textMesh);
});

window.addEventListener("resize",function(e){
  // Keeps the 3D view proportions correct.
  camera.aspect =window.innerWidth/ window.innerHeight;
  // Makes the canvas fill the screen.
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Applies the new aspect ratio to the camera.
  camera.updateProjectionMatrix();
})

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping= true;

function animate() {
  requestAnimationFrame(animate);
   controls.update();
  textMesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();