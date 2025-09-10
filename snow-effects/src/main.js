import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z=2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry= new THREE.BufferGeometry();
const vertices =new Float32Array(2000);
  // The loop fills all 3000 positions for 1000 snowflakes randomly inside a cube from -1 to 1 in x, y, z.
   for(let i=0; i <= 1000*3; i++){
        vertices[i]=(Math.random() -0.5) * 2;
      }
      
  // here are all my vertex positions, each vertex has 3 numbers (x, y, z).
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

const material = new THREE.PointsMaterial({color: 0xffffff, size: 0.01});    
const snow = new THREE.Points(geometry, material);
scene.add(snow);

function animate() {
  requestAnimationFrame(animate);
    const positions = geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= 0.01;       // move y down
        if (positions[i] < -1) {
          positions[i] = 1;         // reset to top
        }
      }
  geometry.attributes.position.needsUpdate = true;
  renderer.render( scene, camera );
}
animate ();