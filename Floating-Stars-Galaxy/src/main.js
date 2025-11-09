import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const starGeometry = new THREE.BufferGeometry()
const starCount = 1000
// we need 3 numbers for each star (x, y, z) so *3 makes space for all star positions
const starPositions = new Float32Array(starCount * 3)

// this fills every empty slot with a random number so each star gets a random x, y, z position in space
for (let i = 0; i < starCount * 3; i++) {
  starPositions[i] = (Math.random() - 0.5) * 10 // random x,y,z
}

//// tell three.js: every 3 numbers in starPositions = one star’s x,y,z point
starGeometry.setAttribute(  "position", new THREE.BufferAttribute(starPositions, 3))


//// PointsMaterial is a special material for drawing many small dots (stars)
// size = how big each star looks
// color = star color
// make each star look tiny and white (material controls how the points look)
const starMaterial = new THREE.PointsMaterial({  size: 0.02, color: 0xffffff})

const stars = new THREE.Points(starGeometry, starMaterial)
scene.add(stars)

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,100)
camera.position.z = 3

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth, window.innerHeight)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

function animate() {
  requestAnimationFrame(animate)
  stars.rotation.y += 0.0008
  controls.update()
  renderer.render(scene, camera)
}

animate()
