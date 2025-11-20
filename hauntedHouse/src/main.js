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
renderer.setClearColor("#262837")
document.body.appendChild(renderer.domElement);

const controls= new OrbitControls(camera, renderer.domElement);
controls.enableDamping=true;

const fog = new THREE.Fog("#262837", 1, 15);
scene.fog= fog;

const house = new THREE.Group();
scene.add(house);

const light = new THREE.AmbientLight("#0d0f26", 1.5);
light.position.set(2,2,2)
scene.add( light );

const directional = new THREE.DirectionalLight("#3a4cfe", 0.6);
directional.position.set(0, 5, -2);
directional.intensity = 1.2; 
scene.add(directional);

const doorLight = new THREE.PointLight("#ff4b1f", 3.5, 7); 
doorLight.position.set(0, 2.4, 2.7); // front of door
scene.add(doorLight);


const loader = new THREE.TextureLoader();
const colorTex       = loader.load("./colorwall.jpeg");        // main photo
const normalTex      = loader.load("./normalwall.jpeg");       // fake bumps
const roughnessTex   = loader.load("./roughwall.jpeg");    // shiny/dull
const displacementTex= loader.load("./displacewall.jpeg");       // real bumps
const aoTex          = loader.load("./ambientwall.jpeg");   
const doorcolor =loader.load("./door.jpeg"); 
const normaldoor =loader.load("./normaldoor.jpeg"); 
const grassColor = loader.load("./grasscolor.jpeg");
const grassNormal = loader.load("./grassnormal.jpeg");
const bushColor = loader.load("./bushcolor.jpeg");


const geometry = new THREE.PlaneGeometry(20,20);
const material = new THREE.MeshStandardMaterial({ 
  map: grassColor,
  normalMap: grassNormal,
});
const floor = new THREE.Mesh(geometry, material);
grassColor.wrapS = grassColor.wrapT = THREE.RepeatWrapping;
grassNormal.wrapS = grassNormal.wrapT = THREE.RepeatWrapping;

grassColor.repeat.set(8, 8);
grassNormal.repeat.set(8, 8);

floor.rotation.x = -Math.PI /2; 
floor.position.y = -0.01; 
scene.add(floor);

const wallgeometry= new THREE.BoxGeometry(4,2.5,4);
const wallmaterial= new THREE.MeshStandardMaterial({
  map: colorTex,
  normalMap: normalTex,
  roughnessMap: roughnessTex,
  displacementMap: displacementTex,
  aoMap: aoTex,
  displacementScale: 0 });
const walls = new THREE.Mesh(wallgeometry, wallmaterial);
walls.position.y = 2.5 /2 ;
house.add(walls);

const roofgeometry= new THREE.ConeGeometry(3,2,4);
const roofmaterial= new THREE.MeshStandardMaterial({color:"#b84c4c"});
const roof = new THREE.Mesh(roofgeometry, roofmaterial);
roof.position.y = 2.5 +1;
roof.rotation.y = Math.PI /4; 
house.add(roof);

const doorgeometry= new THREE.PlaneGeometry(1.5,2);
const doormaterial= new THREE.MeshStandardMaterial({
  map: doorcolor,
  normalMap: normaldoor,
  color:"gray"
});
const door = new THREE.Mesh(doorgeometry, doormaterial);
door.position.z = 2.01;
door.position.y = 1;
house.add(door);

const bushgeometry= new THREE.SphereGeometry(0.5, 16, 16);
const bushMaterial= new THREE.MeshStandardMaterial({color: "#2e8b57",map:bushColor });
const bush1 = new THREE.Mesh(bushgeometry,bushMaterial);
bush1.position.set(-1.6, 0.2, 2.3); 
bush1.scale.set(0.5,0.5,0.5)

const bush2 = new THREE.Mesh(bushgeometry,bushMaterial);
bush2.position.set(-1, 0.2, 2.3); 

const bush3 = new THREE.Mesh(bushgeometry,bushMaterial);
bush3.position.set(1.6, 0.2, 2.3); 
bush3.scale.set(0.5,0.5,0.5)

const bush4 = new THREE.Mesh(bushgeometry,bushMaterial);
bush4.position.set(1, 0.2, 2.3); 

house.add(bush1,bush2,bush3,bush4);

//grave
const graves =new THREE.Group();
scene.add(graves);

 const graveGeo = new THREE.BoxGeometry(0.6, 0.8, 0.2);
  const graveMat = new THREE.MeshStandardMaterial({ color: "#aaaaaa" });

  for(let i=0; i<50; i++){
    const angle =Math.random()* Math.PI *2;
    const radius =3 + Math.random() *6
    const x =Math.sin(angle) * radius;
    const z =Math.cos(angle) * radius;
  
  const grave = new THREE.Mesh(graveGeo, graveMat);
  grave.position.set(x, 0.3, z);
  grave.rotation.y=(Math.random() -0.5 )*0.4;
  grave.rotation.z=(Math.random() -0.5 )*0.4;
  graves.add(grave);
}
  
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
