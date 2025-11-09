# 🌌 Floating Stars Galaxy — Notes

This project creates a small 3D galaxy using Three.js. It shows 1000 tiny stars floating in space.

- We use BufferGeometry to hold star data.
- Float32Array stores all star positions (x, y, z for every star).
- A loop fills random values so each star appears in a different place.
- PointsMaterial makes each star look like a small white glowing dot.
- Points combines the geometry + material to display all stars together.
- OrbitControls lets us rotate, zoom, and move around the galaxy.
- The animation loop slowly rotates the stars to give a floating effect.
- The scene, camera, and renderer form the basic setup of the 3D world.

This project is simple, light, and perfect to understand particles and basic Three.js structure.
