# Three.js Raycaster - Complete Notes

## What is Raycaster?
- Raycaster is a tool in Three.js to detect which objects in the 3D scene your mouse or pointer is pointing at.
- Think of it like shining an **invisible laser** from the camera to the objects. Wherever it hits, you can interact with it.

## How Raycaster Works
1. **Ray**: An invisible line from a point (usually camera) in a direction (usually mouse pointer).
2. **Intersect**: Checks which objects the ray touches. Returns a list of objects hit.
3. **Mouse coordinates**: Must be in **Normalized Device Coordinates (NDC)**: x and y between -1 and 1.

## Setup in Three.js

Raycaster & Mouse
  const raycaster = new THREE.Raycaster(); // invisible laser
  const mouse = new THREE.Vector2();       // mouse position
  Mouse Move Event

  window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1; // -1 to 1
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1; // -1 to 1
  });

Detecting Intersections
  raycaster.setFromCamera(mouse, camera); // update ray direction
  const intersects = raycaster.intersectObjects([cube1, cube2]); // array of hits

Each item in intersects contains:
  object: the object hit
  distance: distance from camera
  point: exact hit point in 3D space

Change Color on Hover
  // Reset colors first
  cube1.material.color.set(0x00ff00);
  cube2.material.color.set(0x0000ff);

// Turn red if hovered
  intersects.forEach(i => i.object.material.color.set(0xff0000));
  Animate Loop
  javascript
  Copy code
  function animate() {
    requestAnimationFrame(animate);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([cube1, cube2]);

  // Reset colors
    cube1.material.color.set(0x00ff00);
    cube2.material.color.set(0x0000ff);

  // Change color on hover
    intersects.forEach(i => i.object.material.color.set(0xff0000))
    renderer.render(scene, camera);
  }
  animate();

Tips & Notes

Works with any mesh (cube, sphere, plane, etc.).
Returns sorted array, closest objects first.
Mouse coordinates must be normalized: Top-left (-1, 1), Bottom-right (1, -1).
Can be used for hover, click, drag, or game interactions.
Can handle multiple objects at once.

Summary
Raycaster = invisible laser from camera to objects.
Detects which object your mouse points at.
Returns hits, so you can interact (change color, move, click, etc.).
Always update inside the animate loop for smooth detection.