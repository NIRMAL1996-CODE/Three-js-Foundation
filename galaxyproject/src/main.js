// Imports and GUI Setup
import "./style.css";
import * as THREE from 'three';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const gui = new GUI();

// Scene
const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z=2;

//Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
document.body.appendChild( renderer.domElement );

const parameter = {};
parameter.count= 100000;
parameter.size=0.01;
parameter.radius= 2;
parameter.branches= 3;
parameter.spin=1;
parameter.randomness=0.2;

let geometry=null;
let material=null;
let points=null;

// Galaxy Generation Function
const generateGalaxy =()=>{
  if(points!== null){
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }
 geometry= new THREE.BufferGeometry();

 const positions = new Float32Array(parameter.count *3);

  for(let i = 0; i <parameter.count; i++) { 
      const i3 =i*3;

      const radius = Math.random() * parameter.radius;
      const spinAngle =radius * parameter.spin;
      const branchAngle = (i% parameter.branches)/ parameter.branches * Math.PI *2
      
      const rondomX= (Math.random() - 0.5) * parameter.randomness* radius;
      const rondomY= (Math.random() - 0.5) * parameter.randomness* radius;
      const rondomZ= (Math.random() - 0.5) * parameter.randomness* radius;

      positions[i3 + 0] = Math.cos(branchAngle + spinAngle)*radius +rondomX;
      positions[i3 + 1] = rondomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle)*radius + rondomZ;
  }

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

 material = new THREE.PointsMaterial({
   size: parameter.size,        
   sizeAttenuation: true,  
   depthWrite:false,      
   blending:THREE.AdditiveBlending, 
});
  
 points = new THREE.Points(geometry, material);
scene.add(points);
}

// Initial Galaxy Generation
generateGalaxy();

// GUI Controls
gui.add(parameter, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy);
gui.add(parameter, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy);
gui.add(parameter, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy);
gui.add(parameter, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy);
gui.add(parameter, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy);
gui.add(parameter, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy);

// Clock and Controls
const clock = new THREE.Clock(); 
const controls = new OrbitControls(camera, renderer.domElement);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  const t = clock.getElapsedTime(); 
  // for(let i =0; i<count; i++){
  //   const i3 =i*3;
  //   const x= geometry.attributes.position.array[i3];
  //   geometry.attributes.position.array[i3 +1 ]= Math.sin(t + x);
    
  // }
  // geometry.attributes.position.needsUpdate=true;
  controls.update();
  renderer.render( scene, camera );
}
animate ();