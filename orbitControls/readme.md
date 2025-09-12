# OrbitControls Properties (Simple Notes)

- **enableDamping** → Makes camera movement smooth (like sliding slowly instead of instantly stopping).  
- **dampingFactor** → Controls how strong the smooth effect is (higher = more slow glide).  

- **enableRotate** → Allows or blocks rotating the camera around the object.  
- **enableZoom** → Allows or blocks zooming in/out.  

- **minAzimuthAngle / maxAzimuthAngle** → Limits left-right rotation angle (stop camera from going full circle).  
- **minPolarAngle / maxPolarAngle** → Limits up-down rotation angle (stop camera from looking too high/low).  

- **minZoom / maxZoom** → Controls how close/far you can zoom (like min & max zoom levels).  
- **minDistance / maxDistance** → Controls how near/far camera can move from the object (like a safe viewing boundary).  


# OrbitControls Properties (Simple Notes + How to Give Values)

- **enableDamping** → Makes camera move smooth.  
  👉 `controls.enableDamping = true;`

- **dampingFactor** → Strength of smooth effect. (0.01 = very soft, 0.25 = stronger)  
  👉 `controls.dampingFactor = 0.05;`

- **enableRotate** → Allow/stop camera rotation.  
  👉 `controls.enableRotate = false;`

- **enableZoom** → Allow/stop zooming.  
  👉 `controls.enableZoom = false;`

- **minAzimuthAngle / maxAzimuthAngle** → Left-right rotation limit. (use radians, e.g., -Math.PI/4 = -45°)  
  👉 `controls.minAzimuthAngle = -Math.PI/4;`  
  👉 `controls.maxAzimuthAngle =  Math.PI/4;`

- **minPolarAngle / maxPolarAngle** → Up-down rotation limit. (use radians, e.g., Math.PI/4 = 45°)  
  👉 `controls.minPolarAngle = Math.PI/4;`  
  👉 `controls.maxPolarAngle = Math.PI/1.25;`

- **minZoom / maxZoom** → Zoom level range. (1 = normal size, <1 = closer, >1 = farther)  
  👉 `controls.minZoom = 0.5;`  
  👉 `controls.maxZoom = 2;`

- **minDistance / maxDistance** → Camera distance from object. (3 = near, 10 = far)  
  👉 `controls.minDistance = 3;`  
  👉 `controls.maxDistance = 10;`
