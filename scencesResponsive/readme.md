# Three.js Responsive Notes

Making a Three.js scene responsive ensures it always fits the browser window without distortion.

---

## Code Example: Window Resize

```javascript
window.addEventListener("resize", function() {
  // Update camera aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;

  // Update renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Apply the new aspect ratio
  camera.updateProjectionMatrix();
});

Step-by-Step Explanation:-
1. Listen to Resize
  window.addEventListener("resize", ...) detects when the browser window size changes.

2. Update Camera Aspect
    camera.aspect = window.innerWidth / window.innerHeight
    Keeps the 3D view proportions correct.

3. Update Renderer Size
    renderer.setSize(window.innerWidth, window.innerHeight)
    Makes the canvas fill the screen.

4.Update Camera Projection
    camera.updateProjectionMatrix()
    Applies the new aspect ratio to the camera.

Optional Tips:-
  Set renderer pixel ratio for sharpness on high-DPI screens:
     renderer.setPixelRatio(window.devicePixelRatio);
  If using controls (like OrbitControls), call controls.update() after resize to prevent jitter.

Summary:-
  To make Three.js scenes responsive:
  Always update camera aspect, renderer size, and projection matrix on window resize.
  Optionally adjust pixel ratio and controls.
  This ensures the scene perfectly fits any window size.