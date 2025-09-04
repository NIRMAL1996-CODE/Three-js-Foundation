import * as THREE from "three";

const scene= new THREE.Scene();
const camera= new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.z=5;

const renderer= new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const Geometry= new THREE.BoxGeometry(0.2,0.2,0.2);
const Material= new THREE.MeshBasicMaterial({color :"black"});

const cubeA=new THREE.Mesh(Geometry, Material);
const cubeB=new THREE.Mesh(Geometry, Material);

// Use .position.set(x,y,z) to place an object at a fixed spot (like eyes, smile).
// Change it inside animate() only if you want the object to move.
const radius = 1;
cubeA.position.set(-0.4, 0.3, 2 + radius); // left eye
cubeB.position.set(0.4, 0.3, 2 + radius);  // right eye

const sphereGeometry= new THREE.SphereGeometry(1, 64, 64);
const sphereMaterial= new THREE.MeshBasicMaterial({color :"yellow", });
const sphere=new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.z= 2;


const smileGeometry = new THREE.PlaneGeometry(1, 0.07); // wide & very thin
const smileMaterial = new THREE.MeshBasicMaterial({ color: "red" });
const smile = new THREE.Mesh(smileGeometry, smileMaterial);

smile.position.set(0, -0.2, 3); // place on face

const groups = new THREE.Group();
groups.add(sphere);
groups.add(cubeA);
groups.add(cubeB);
groups.add(smile);


scene.add(groups);

function animate(){
  requestAnimationFrame(animate)
  cubeA.rotation.x += 0.01;
  cubeA.rotation.y += 0.01;
  cubeB.rotation.x += 0.01;
  cubeB.rotation.y += 0.01;
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  smile.rotation.x += 0.01;
  smile.rotation.x += Math.PI; 

  renderer.render(scene,camera);
}
animate()


