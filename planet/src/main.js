import * as THREE from "three";

// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { gsap } from "gsap";
import './style.css';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z= 25;
camera.position.y=0.1
camera.position.x=0.1
// camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth , window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight("white", 0.6);
scene.add(light);

const hdri= new RGBELoader().load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/moonlit_golf_2k.hdr', ()=>{

  hdri.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = hdri;   // for lighting/reflection

});

const startexture = new THREE.TextureLoader().load("star.jpg");
startexture.colorSpace= THREE.SRGBColorSpace; 
const stargeometry = new THREE.SphereGeometry( 10, 64, 64); 
const starmaterial = new THREE.MeshStandardMaterial({map: startexture,side: THREE.BackSide }); 
const starsphere = new THREE.Mesh( stargeometry, starmaterial );
scene.add( starsphere );

const radius =3;
const orbitRadius =9;
const segments = 62;
const textures = ["mercury.jpg","mars.jpg","earth2.jpg", "neptune.jpg","jupiter.jpg","venus.jpg",];

const spheres = new THREE.Group();
const spheresMesh=[];
for(let i=0 ; i<6; i++){
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(textures[i]);
texture.colorSpace= THREE.SRGBColorSpace; 

const geometry = new THREE.SphereGeometry(radius, segments, segments ); 
const material = new THREE.MeshStandardMaterial( { map: texture} ); 
const sphere = new THREE.Mesh( geometry, material );  
spheresMesh.push(sphere);

const angle= (i/6) * (Math.PI*2);
sphere.position.x= orbitRadius * Math.cos(angle);
sphere.position.z = orbitRadius * Math.sin(angle);
spheres.add(sphere);
}

spheres.rotation.x = 0.2;
spheres.rotation.y = Math.PI / 6; // or try different values

scene.add( spheres );

let lastWheelTime = 0;
let scrollCount = 0;
const throttleDelay = 1000; // 2 seconds

function throttledWheelHandler(event) {
    const currentTime = Date.now();
     if (currentTime - lastWheelTime >= throttleDelay) {
        lastWheelTime = currentTime;
        const direction = event.deltaY > 0 ? "down" : "up";
         scrollCount = (scrollCount + 1) % 6;

        const headings = document.querySelectorAll(".heading");
        gsap.to(headings, { duration: 1, y: `-=${100}%`, ease: "power2.inOut"});
        
        // gsap.to(spheres.rotation, { duration: 1, y: `-=${Math.PI*2/6}%`, ease: "power2.inOut"});
        gsap.to(spheres.rotation, { 
          duration: 1, 
          y: spheres.rotation.y -(Math.PI * 2 /6), 
          ease: "power2.inOut"
        });

        if (scrollCount === 0) {
            gsap.to(headings, { duration: 1, y: `0`, ease: "power2.inOut"});
        }
    }
}

window.addEventListener("wheel", throttledWheelHandler);

const clock =new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  for (let i = 0; i < spheresMesh.length; i++) {
    const sphere = spheresMesh[i];
    sphere.rotation.y = clock.getElapsedTime()* 0.02;
}
  // controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", ()=>{
  camera.aspect= window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth , window.innerHeight);
});