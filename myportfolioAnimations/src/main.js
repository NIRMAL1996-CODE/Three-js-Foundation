import "./style.css";
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.domElement.classList.add("webgl");

// orbit controls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping=true;

const parameter = {
  materialColor : "#ffffff"
}

//texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/img3.png');
texture.magFilter= THREE.NearestFilter

// objects

//materials
const material =new THREE.MeshToonMaterial({color:parameter.materialColor,gradientMap:texture});

// meshes
const mesh1 = new THREE.Mesh(
  new THREE.TorusGeometry(1,0.4,16, 60),
  material
)
const mesh2 = new THREE.Mesh(
  new THREE.ConeGeometry(1,2,32),
  material
)
const mesh3 = new THREE.Mesh(
  new THREE.TorusGeometry(0.8,0.35,100, 16),
  material
)

//object distance 

const objectDistance= 4; 

mesh1.position.y= -  objectDistance *0
mesh2.position.y= - objectDistance *1
mesh3.position.y= - objectDistance *2

mesh1.position.x= 2
mesh2.position.x= -2
mesh3.position.x= 2

scene.add(mesh1,mesh2,mesh3);

const meshes= [mesh1,mesh2,mesh3];

//light
const directionalLights= new THREE.DirectionalLight('#ffffff',2);
directionalLights.position.set(1,1,0)
scene.add(directionalLights)

//lil-gui
const gui = new GUI();

gui.addColor(parameter,"materialColor")
.onChange(()=>{
  material.color.set(parameter.materialColor)
});

// responsive resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// scrollvalue
let scrollY= window.scrollY;
window.addEventListener('scroll',()=>{
  scrollY= window.scrollY;
  // console.log(scrollY)
})

//clock
const clock = new THREE.Clock();

// animation
function animate() {
  const elapsedTime= clock.getElapsedTime()
  requestAnimationFrame(animate);
  for(const mesh of meshes){
     mesh.rotation.y = elapsedTime * 0.1;
     mesh.rotation.x = elapsedTime * 0.18;
  }
   camera.position.y= -scrollY/ window.innerHeight * objectDistance  
  renderer.render(scene, camera);
}
animate();
