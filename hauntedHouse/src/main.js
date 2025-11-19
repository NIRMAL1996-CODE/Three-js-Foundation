import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// camera.position.set(5, 4, 6);
camera.position.set(0, 2, 8); // front view
camera.lookAt(0, 1, 0);    

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const controls= new OrbitControls(camera, renderer.domElement);
controls.enableDamping=true;

const light = new THREE.AmbientLight("white", 1  ); // soft white light
light.position.set(2,2,2)
scene.add( light );

const directional = new THREE.DirectionalLight("white",2);
directional.position.set(5, 5, 5);
scene.add(directional);

const house = new THREE.Group();
scene.add(house);

const geometry = new THREE.PlaneGeometry(20,20);
const material = new THREE.MeshStandardMaterial({ color:"#a8e6a1",side: THREE.DoubleSide });
const floor = new THREE.Mesh(geometry, material);
floor.rotation.x = -Math.PI /2; 
floor.position.y = -0.01; 
scene.add(floor);

const wallgeometry= new THREE.BoxGeometry(4,2.5,4);
const wallmaterial= new THREE.MeshStandardMaterial({color:"#f2d7b5"});
const walls = new THREE.Mesh(wallgeometry, wallmaterial);
walls.position.y = 2.5 /2 ;
house.add(walls);

const roofgeometry= new THREE.ConeGeometry(3,2,4);
const roofmaterial= new THREE.MeshStandardMaterial({color:"#b84c4c"});
const roof = new THREE.Mesh(roofgeometry, roofmaterial);
roof.position.y = 2.5 +1;
roof.rotation.y = Math.PI /4; 
house.add(roof);

const doorgeometry= new THREE.PlaneGeometry(2,2);
const doormaterial= new THREE.MeshStandardMaterial({color:"#5a3e2b"});
const door = new THREE.Mesh(doorgeometry, doormaterial);
door.position.z = 2.01;
door.position.y = 1;
house.add(door);

const bushgeometry= new THREE.SphereGeometry(0.5, 16, 16);
const bushMaterial= new THREE.MeshStandardMaterial({color: "#2e8b57" });
const bush1 = new THREE.Mesh(bushgeometry,bushMaterial);
bush1.position.set(-1.6, 0.5, 3.5); 
bush1.scale.set(0.5,0.5,0.5)

const bush2 = new THREE.Mesh(bushgeometry,bushMaterial);
bush2.position.set(-1, 0.5, 3.5); 

const bush3 = new THREE.Mesh(bushgeometry,bushMaterial);
bush3.position.set(1.6, 0.5, 3.5); 
bush3.scale.set(0.5,0.5,0.5)

const bush4 = new THREE.Mesh(bushgeometry,bushMaterial);
bush4.position.set(1, 0.5, 3.5); 

house.add(bush1,bush2,bush3,bush4);







window.addEventListener("resize",function(e){
  camera.aspect =window.innerWidth/ window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
  })

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
