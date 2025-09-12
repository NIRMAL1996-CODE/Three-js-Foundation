import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {RGBELoader} from "three/addons/loaders/RGBELoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const light = new THREE.AmbientLight( "white", 2 ); // soft white light
// light.position.set(2,2,2)
// scene.add( light );

// the image will wrap around the Sphere’s surface (like gift wrapping paper).
const textureLoader = new THREE.TextureLoader();
let tex =textureLoader.load("/earth2.jpg");

// This makes colors look natural and accurate (without it, textures may look too dark or washed out).It means the image uses sRGB color space (the standard color format for most images).SRGB = Standard Red Green Blue.
tex.colorSpace= THREE.SRGBColorSpace;

const geometry = new THREE.SphereGeometry(1, 50, 50);
const material = new THREE.MeshPhysicalMaterial({ map: tex });
const sphere1 = new THREE.Mesh(geometry, material);
// sphere.rotation.z = 1;
scene.add(sphere1);

const textureLoader2 = new THREE.TextureLoader();
let tex2 =textureLoader2.load("/cloud2.jpg");

const geometry2 = new THREE.SphereGeometry(1.04, 50, 50);
const material2 = new THREE.MeshPhysicalMaterial({ alphaMap: tex2 });
material2.transparent= true;
const sphere2 = new THREE.Mesh(geometry2, material2);
// sphere.rotation.z = 1;
scene.add(sphere2);

const hdri =new RGBELoader();
hdri.load("https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/sunny_country_road_2k.hdr",
function(hdritexture) {
  hdritexture.mapping= THREE.EquirectangularReflectionMapping;
  scene.environment= hdritexture;
  scene.background= hdritexture;
});
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor =0.05;

function animate() {
  requestAnimationFrame(animate);
  sphere1.rotation.y +=0.0002;
  sphere2.rotation.y +=0.0003;
  controls.update();
  renderer.render(scene, camera);
}
animate();
