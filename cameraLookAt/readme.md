# Three.js Cube LookAt with Mouse Example

## Overview
This example shows how to make a cube in **Three.js** rotate to "look at" the mouse position using **Vector3** coordinates and **OrbitControls**.

## Key Concepts

- **Vector2**: A point or direction in 2D space `(x, y)`  
- **Vector3**: A point or direction in 3D space `(x, y, z)`  
- **lookAt()**: Rotates an object so its front faces a specified point in 3D space.  
- **OrbitControls**: Allows interactive camera rotation, zoom, and pan.  

## Mouse to 3D Mapping

Mouse coordinates are normalized (0–1), but `lookAt()` needs **world coordinates**.  
Use a scaling factor to map screen coordinates to 3D space:  

```js
const vector = new THREE.Vector3();
vector.set((mouse.x - 0.5) * 10, (0.5 - mouse.y) * 10, 1);
cube.lookAt(vector);
