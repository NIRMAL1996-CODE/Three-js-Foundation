import * as THREE from "three";
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { gsap } from "gsap";
import './style.css';

// Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.set(0.1, -0.6, 15);

// Renderer
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.AmbientLight("white", 0.6);
scene.add(light);

// HDRI environment
const hdri = new RGBELoader().load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/moonlit_golf_2k.hdr', () => {
  hdri.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = hdri;
});

// Star background
const starTexture = new THREE.TextureLoader().load("star.jpg");
starTexture.colorSpace = THREE.SRGBColorSpace; 
const starGeometry = new THREE.SphereGeometry(20, 64, 64); 
const starMaterial = new THREE.MeshStandardMaterial({map: starTexture, side: THREE.BackSide }); 
const starSphere = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starSphere);

// Planets
const radius = 3.3;
const orbitRadius = 9;
const segments = 62;
const textures = ["mercury.jpg","mars.jpg","earth2.jpg", "neptune.jpg","jupiter.jpg","venus.jpg"];
const spheres = new THREE.Group();
const spheresMesh = [];

for(let i = 0; i < textures.length; i++){
  const texture = new THREE.TextureLoader().load(textures[i]);
  texture.colorSpace = THREE.SRGBColorSpace; 
  const geometry = new THREE.SphereGeometry(radius, segments, segments ); 
  const material = new THREE.MeshStandardMaterial({ map: texture }); 
  const sphere = new THREE.Mesh(geometry, material);  
  spheresMesh.push(sphere);

  const angle = (i / textures.length) * (Math.PI * 2);
  sphere.position.set(orbitRadius * Math.cos(angle), 0, orbitRadius * Math.sin(angle));
  spheres.add(sphere);
}

spheres.rotation.set(0.2, Math.PI / 6, 0);
scene.add(spheres);

// Scroll / Swipe rotation
let lastWheelTime = 0;
let scrollCount = 0;
const throttleDelay = 1000;

function handleScroll(direction) {
    scrollCount = (scrollCount + 1) % 6;
    const headings = document.querySelectorAll(".heading");

    gsap.to(headings, { duration: 1, y: `-=${100}%`, ease: "power2.inOut"});
    gsap.to(spheres.rotation, { 
      duration: 1, 
      y: spheres.rotation.y - (Math.PI * 2 / 6), 
      ease: "power2.inOut"
    });

    if (scrollCount === 0) {
        gsap.to(headings, { duration: 1, y: `0`, ease: "power2.inOut"});
    }
}

function throttledWheelHandler(event) {
    const currentTime = Date.now();
    if (currentTime - lastWheelTime >= throttleDelay) {
        lastWheelTime = currentTime;
        handleScroll(event.deltaY > 0 ? "down" : "up");
    }
}

window.addEventListener("wheel", throttledWheelHandler);

// Mobile touch support
let touchStartY = 0;
window.addEventListener("touchstart", (e) => {
    touchStartY = e.touches[0].clientY;
});
window.addEventListener("touchmove", (e) => {
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchStartY - touchEndY;
    if (Math.abs(deltaY) > 50) {
        throttledWheelHandler({ deltaY });
        touchStartY = touchEndY;
    }
});

// Animate planets rotation
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    spheresMesh.forEach(sphere => {
        sphere.rotation.y = clock.getElapsedTime() * 0.02;
    });
    renderer.render(scene, camera);
}
animate();

// Responsive
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
