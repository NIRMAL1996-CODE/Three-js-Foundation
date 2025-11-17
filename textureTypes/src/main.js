import "./style.css"
import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 2;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Load Texture
const loader = new THREE.TextureLoader();
const colorTexture = loader.load('/color.jpeg'); // your image
const normalTexture = loader.load('/normal.jpeg');
const bumpTexture = loader.load('/bump.jpeg');
const metalTexture = loader.load('/metal.jpeg');
// const aoTexture = loader.load('/color.jpeg');

// Create Box
const box = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ map: colorTexture,
    // normalMap: normalTexture,
    //  normalScale: new THREE.Vector2(8,8),
    //   bumpMap: bumpTexture,
    //  bumpScale: 2 ,
     metalnessMap: metalTexture,
     metalness: 1,
    //   aoMap: aoTexture,
    // aoMapIntensity: 1
 })
);
scene.add(box);

// Light
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(2,2,2);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// Animate
function animate() {
  requestAnimationFrame(animate);
  // box.rotation.y += 0.01;
  // box.rotation.x += 0.01;

  renderer.render(scene, camera);
}
animate();
