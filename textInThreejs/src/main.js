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
const material = new THREE.MeshNormalMaterial();
loader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  
const geometry = new TextGeometry("Hello Nirmal", {
     font: font,
     size: 1,
	   depth: 0.2,
	   curveSegments: 12,
     bevelEnabled:true,
     bevelSegment:1,
     bevelThickness:0.05,
     bevelOffset:0,
     bevelSize:0.02,
  });

  geometry.center();
  textMesh = new THREE.Mesh(geometry, material);
  scene.add(textMesh);
});

const geometry = new THREE.TorusGeometry(0.3,0.2,20,45);

for(let i=0; i<=200;i++){
const donut = new THREE.Mesh(geometry, material);
donut.position.x=(Math.random()-0.5)*20;
donut.position.y=(Math.random()-0.5)*20;
donut.position.z=(Math.random()-0.5)*20;

donut.rotation.x= Math.random()* Math.PI;
donut.rotation.y= Math.random()* Math.PI;

let scale= Math.random();
donut.scale.set(scale,scale,scale);

scene.add(donut);
}


  //responsive
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
  renderer.render(scene, camera);
}
animate();