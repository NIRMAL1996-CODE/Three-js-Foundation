import './style.css'
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 8);

const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,5,5);
scene.add(light);

// robot (center)
const loader = new GLTFLoader();
loader.load("/robot/scene.gltf", (gltf)=>{
  const robot = gltf.scene;
  robot.scale.set(1,1,1);
  scene.add(robot);
});

// cards (8)
const cards = [];
const cardGeo = new THREE.PlaneGeometry(1.2, 1.6);
const cardMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });

for(let i=0; i<8; i++){
  const card = new THREE.Mesh(cardGeo, cardMat);
  const angle = (i / 8) * Math.PI * 2; // circle
  card.position.set(Math.cos(angle)*4, 0, Math.sin(angle)*4);
  cards.push(card);
  scene.add(card);
}

// controls
const controls = new OrbitControls(camera, renderer.domElement);

//responsive
window.addEventListener("resize",function(e){
  camera.aspect =window.innerWidth/ window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
})

// animate
function animate(){
  requestAnimationFrame(animate);
  controls.update();
  // rotate cards like planets
  cards.forEach((c, i)=>{
    const t = Date.now() * 0.0003;
    const angle = t + (i / 8) * Math.PI * 2;
    c.position.x = Math.cos(angle) * 4;
    c.position.z = Math.sin(angle) * 4;
    c.lookAt(0,0,0); // face center
  });

  renderer.render(scene, camera);
}
animate();
