import './style.css'
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from 'lil-gui';


// create scene (room)
const scene = new THREE.Scene();

// create camera (eye)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// move camera back
camera.position.z = 3;

// create renderer (screen painter)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create a box
const sphereGeo1 = new THREE.SphereGeometry(0.5, 16,16);
const sphereMat1 = new THREE.MeshBasicMaterial({ color: "red" });
const sphere1 = new THREE.Mesh(sphereGeo1, sphereMat1);
sphere1.position.x = -2.5
scene.add(sphere1);

const sphereGeo2 = new THREE.SphereGeometry(0.5, 16,16);
const sphereMat2 = new THREE.MeshBasicMaterial({ color: "red" });
const sphere2 = new THREE.Mesh(sphereGeo2, sphereMat2);
scene.add(sphere2);

const sphereGeo3 = new THREE.SphereGeometry(0.5, 16,16);
const sphereMat3 = new THREE.MeshBasicMaterial({ color: "red" });
const sphere3 = new THREE.Mesh(sphereGeo3, sphereMat3);
sphere3.position.x = 2.5
scene.add(sphere3);

const raycaster=new THREE.Raycaster();
// const origin =new THREE.Vector3(-3, 0 , 0)
// const direction =new THREE.Vector3(10, 0 , 0)
// direction.normalize();
// raycaster.set(origin,direction );

const intersect = raycaster.intersectObject(sphere2);
console.log(intersect);

// const intersects = raycaster.intersectObjects([sphere1, sphere2, sphere3]);
// console.log(intersects);

const gui = new GUI();
// gui.add();


// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// responsive
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//clock
const clock = new THREE.Clock();

// animate
function animate() {
  const time = clock.getElapsedTime()
  requestAnimationFrame(animate);
  controls.update();
  sphere1.position.y = Math.sin(time *0.3)* 1.5;
  sphere2.position.y = Math.sin(time *0.8)* 1.5;
  sphere3.position.y = Math.sin(time *1.4)* 1.5;

  const origin =new THREE.Vector3(-3, 0 , 0)
  const direction =new THREE.Vector3(1, 0 , 0)
  direction.normalize();
  raycaster.set(origin,direction );
  
  const spheres =[sphere1, sphere2, sphere3]
  const intersects = raycaster.intersectObjects(spheres);
// console.log(intersects);

//red
for(const sphere of spheres ){
  sphere.material.color.set("#ff0000")
}
//blue
for(const intersect of intersects){
  intersect.object.material.color.set("#0000ff")
}

  renderer.render(scene, camera);
}
animate();
