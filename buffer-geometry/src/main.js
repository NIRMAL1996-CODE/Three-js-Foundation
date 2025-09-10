import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.z = 2;

const geometry = new THREE.BufferGeometry();
const vertices =new Float32Array(3000);

    for(let i=0; i <= 1000*3; i++){
      vertices[i]=(Math.random() -0.5) * 2;
    }
    
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))

const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe:true } );
const buffercreation = new THREE.Mesh( geometry, material );
scene.add( buffercreation );

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping= true;
controls.dampingFactor=0.05;

function animate() {
  requestAnimationFrame(animate);
  // buffercreation.rotation.y +=0.01
  camera.position.z -=0.01;
  controls.update();
  renderer.render( scene, camera );
}
animate ();