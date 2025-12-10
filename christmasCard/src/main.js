import './style.css';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 3);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//textureloader
const textureLoader = new THREE.TextureLoader();

// Front plane texture
const frontTexture = textureLoader.load('/front11.jpg');
const frontNormal = textureLoader.load('/frontN.png');
 
// Inside plane texture
const insideTexture = textureLoader.load('/back.jpg');
const insideNormal = textureLoader.load('/backN.png');

//Christmas Card Structure 
// Plane 1 (front)
const frontPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 3),
  new THREE.MeshStandardMaterial({
   map: frontTexture,
   normalMap: frontNormal,
  metalness: 0.1,
  roughness: 0.2 })
);
frontPlane.position.set(-0.8, 0, 0);
frontPlane.rotation.y = Math.PI / 6;
scene.add(frontPlane);

// Plane 2 (inside)
const insidePlane = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 3),
 new THREE.MeshStandardMaterial({
   map: insideTexture,
   normalMap: insideNormal,
  metalness: 0.1,
  roughness: 0.2 })
);

insidePlane.position.set(0.8, 0,0);
insidePlane.rotation.y = -Math.PI / 6;
scene.add(insidePlane);

//snow
const snowGeo = new THREE.BufferGeometry();
const snowCount = 500;
const positions = new Float32Array(snowCount * 3);

for (let i = 0; i < snowCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 20; // spread area
}

snowGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

//particle texture
const particleTexture = textureLoader.load('/c.png');
const snowMat = new THREE.PointsMaterial({
  alphaMap:particleTexture,
  color: 0xffffff,
  size: 0.16,
  transparent: true,
});

const snow = new THREE.Points(snowGeo, snowMat);
scene.add(snow);

// text 1 (front page)
let textMesh;
const loader = new FontLoader();
const material = new THREE.MeshBasicMaterial({color:"white"});
loader.load("/fonts/helvetiker_bold.typeface.json", (font) => {
  const geo1 = new TextGeometry("Merry Christmas", {
    font, size: 0.1, depth: 0.1
  });
  geo1.center();
  const t1 = new THREE.Mesh(geo1, material);

  t1.position.set(-0.8, 0, 0.05);
  t1.rotation.y = Math.PI / 6;   // match front page angle

  scene.add(t1);
});

// text 2 (inside page)
loader.load("/fonts/helvetiker_bold.typeface.json", (font) => {
  const geo2 = new TextGeometry("Wish you joy!", {
    font, size: 0.1, depth: 0.1
  });
  geo2.center();
  const t2 = new THREE.Mesh(geo2, material);

  t2.position.set(0.8, 0, 0.05);
  t2.rotation.y = -Math.PI / 6;  // match inside page angle

  scene.add(t2);
});

// Add a light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 0.5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

//point light
const point = new THREE.PointLight(0xffffff, 0.6);
point.position.set(0, 1, 2);
scene.add(point);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();

   const pos = snow.geometry.attributes.position;
    for (let i = 1; i < pos.count; i++) {
    pos.array[i * 3 + 1] -= 0.02; // fall speed
    if (pos.array[i * 3 + 1] < -5) pos.array[i * 3 + 1] = 5; 
    }
  pos.needsUpdate = true;
  renderer.render(scene, camera);
}

animate();

// Responsive
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
