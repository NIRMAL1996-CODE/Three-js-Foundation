import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const starGeometry = new THREE.BufferGeometry()
const starCount = 1000
const starPositions = new Float32Array(starCount * 3)

for (let i = 0; i < starCount * 3; i++) {
  starPositions[i] = (Math.random() - 0.5) * 10 // random x,y,z
}

starGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(starPositions, 3)
)

const starMaterial = new THREE.PointsMaterial({
  size: 0.02,
  color: 0xffffff
})

const stars = new THREE.Points(starGeometry, starMaterial)
scene.add(stars)

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)
camera.position.z = 3

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth, window.innerHeight)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

function animate() {
  requestAnimationFrame(animate)

  // slow galaxy spin
  stars.rotation.y += 0.0008

  controls.update()
  renderer.render(scene, camera)
}

animate()
