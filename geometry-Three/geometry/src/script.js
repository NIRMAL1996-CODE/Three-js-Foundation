
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75 , window.innerWidth/ window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer= new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cylinder mesh 
// const cylindergeometry = new THREE.CylinderGeometry( 0.5, 0.5, 2, 20); 
// const cylindermaterial = new THREE.MeshBasicMaterial( {color:"yellow"} ); 
// const cylinder = new THREE.Mesh( cylindergeometry, cylindermaterial );
// scene.add(cylinder);

// const cylindergeometry = new THREE.CylinderGeometry( 0.5, 0.5, 2, 20); 
// const cylinderMaterial = new THREE.MeshDistanceMaterial();
// const cylinder = new THREE.Mesh(cylindergeometry, cylinderMaterial);
// scene.add(cylinder);

const cylindergeometry = new THREE.CylinderGeometry( 0.5, 0.5, 2, 20); 
const cylinderMaterial = new THREE.MeshLambertMaterial({ color: "red"});
const cylinder = new THREE.Mesh(cylindergeometry, cylinderMaterial);
scene.add(cylinder);

// Cylinder edges (lines)
const lineMaterial = new THREE.LineBasicMaterial({ color: "yellow" });
const edges = new THREE.EdgesGeometry(cylindergeometry);
const line = new THREE.LineSegments(edges, lineMaterial);
line.computeLineDistances();
// line.position.x=3
scene.add(line);

const light = new THREE.PointLight("red", 1);
light.position.set(5, 5, 5);
scene.add(light);

//not good with cylinder
// const lineMaterial = new THREE.LineDashedMaterial({
//   color: 0x000000,
//   dashSize: 0.1,
//   gapSize: 0.05 
// });
// const edges = new THREE.EdgesGeometry(cylindergeometry);
// const line = new THREE.LineSegments(edges, lineMaterial);
// line.computeLineDistances(); // required for dashed lines
// scene.add(line);

function animate(){
  requestAnimationFrame(animate);
  cylinder.rotation.x += 0.01;
  cylinder.rotation.y += 0.01;
  line.rotation.x += 0.01; 
  line.rotation.y += 0.01; 

  renderer.render(scene, camera);
}
animate();
