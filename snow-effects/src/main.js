import "./style.css";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z=2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
document.body.appendChild( renderer.domElement );

const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('/heart.png');

const geometry= new THREE.BufferGeometry();
const count= 1000;
const vertices = new Float32Array(count *3); // 3000 numbers
const colors = new Float32Array(count *3); 
  for(let i = 0; i < vertices.length; i++) { 
      vertices[i] = (Math.random()-0.5)* 10; 
      colors[i]= Math.random()
  }
// here are all my vertex positions, each vertex has 3 numbers (x, y, z).
// BufferAttribute → groups every 3 numbers as 1 vertex
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
   // color:"red",          // color of particles (can be ignored if using vertexColors)
   size: 0.6,              // how big each particle appears
   sizeAttenuation: true,  // makes size smaller when particle is far from camera
   transparent: true,      // allows transparency in particles
   alphaMap: particleTexture, // applies the PNG texture to each particle
   // alphaTest:0.01,      // removes very transparent pixels (helps performance, optional)
   // depthTest:false,     // lets particles appear through others (optional)
   depthWrite:false,       // prevents particles from blocking others in depth
   blending:THREE.AdditiveBlending, // makes particles glow/bright when overlapping
   vertexColors:true,      // allows each particle to have its own color
});
  
const snow = new THREE.Points(geometry, material);
scene.add(snow);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render( scene, camera );
}
animate ();