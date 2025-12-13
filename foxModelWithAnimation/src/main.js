import './style.css';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader} from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0,0,5) 

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const gltfloader = new GLTFLoader();
let model ;
let mixer;
gltfloader.load("/fox.glb",(gltf)=>{
  model = gltf.scene;
  model.scale.set(0.035, 0.035, 0.035);   // adjust if too big
  model.position.set(0, -2, 0); 
  model.rotation.y = -0.5;
  
  //mixer
  mixer =new THREE.AnimationMixer(model);
  const action= mixer.clipAction(gltf.animations[0]);
  console.log(gltf.animations)
  action.play()

  scene.add(model);
})

//lights

// Ambient light for overall brightness
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,5,5);
scene.add(light);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping= true;

//clock
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  controls.update()
  const deltaTime = clock.getDelta(); // add clock = new THREE.Clock() at top
  if (mixer) mixer.update(deltaTime);
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
