# Three.js Top Materials Notes

## 1. MeshBasicMaterial
- Simple material, **does not react to lights**.
- Good for flat colors, backgrounds, or wireframes.
- Key property: `color`.
- Example: `const material = new THREE.MeshBasicMaterial({ color: "red" });`

## 2. MeshStandardMaterial
- Reacts to lights using **Physically Based Rendering (PBR)** → realistic look.
- Key properties:
  - `color`: base color
  - `metalness`: 0 (non-metal) → 1 (metal)
  - `roughness`: 0 (smooth/shiny) → 1 (rough/dull)
- Example: `const material = new THREE.MeshStandardMaterial({ color: "white", metalness: 0.5, roughness: 0.5 });`

## 3. MeshPhongMaterial
- Reacts to lights with **specular highlights** (shiny spots).
- Key properties:
  - `color`: base color
  - `specular`: highlight color
  - `shininess`: how shiny the material is
- Example: `const material = new THREE.MeshPhongMaterial({ color: "blue", shininess: 100 });`

## 4. MeshLambertMaterial
- Reacts to lights **diffusely**, softer than Phong.
- No shiny highlights.
- Good for non-metal, matte surfaces.
- Key property: `color`
- Example: `const material = new THREE.MeshLambertMaterial({ color: "green" });`

## 5. MeshPhysicalMaterial
- Extension of MeshStandardMaterial.
- Adds advanced properties like `clearcoat` and `reflectivity`.
- Used for **highly realistic surfaces** like car paint, glass.
- Example: `const material = new THREE.MeshPhysicalMaterial({ color: "gray", metalness: 0.8, roughness: 0.2, clearcoat: 1 });`

## 6. Quick Comparison
| Material               | Reacts to Light | Shiny/Gloss | Use Case                   |
|------------------------|----------------|------------|----------------------------|
| MeshBasicMaterial       | No             | No         | Simple color, background   |
| MeshLambertMaterial     | Yes (diffuse)  | No         | Matte surfaces             |
| MeshPhongMaterial       | Yes (specular) | Yes        | Shiny surfaces             |
| MeshStandardMaterial    | Yes (PBR)      | Yes        | Realistic, metals          |
| MeshPhysicalMaterial    | Yes (PBR+)     | Very       | Advanced realistic objects |


# Three.js Lights and Helpers Notes
## 1. Types of Lights

### AmbientLight
- Soft, uniform light that lights all objects equally.
- No direction or position needed.
- Example: `const ambientLight = new THREE.AmbientLight(0xffffff, 1);  scene.add(ambientLight);`
- Cannot use DirectionalLightHelper because it has no direction.

### DirectionalLight
- Light that shines in a specific direction (like the sun).
- Has position and target to control direction.
- Example: `const directionalLight = new THREE.DirectionalLight(0xffffff, 2); directionalLight.position.set(2, 2, 2); directionalLight.target.position.set(0, 0, 0); scene.add(directionalLight); scene.add(directionalLight.target);`

## 2. Light Helpers

### DirectionalLightHelper
- Visualizes the direction and position of a DirectionalLight.
- Example: `const helper = new THREE.DirectionalLightHelper(directionalLight, 5); scene.add(helper);`
- Cannot use with AmbientLight.

## 3. Key Points
- AmbientLight: no direction, lights everything evenly.
- DirectionalLight: has direction, can change via position or target.
- DirectionalLightHelper: only for DirectionalLight.
- Always use helper to debug light direction and position.

## 4. Quick Notes
- AmbientLight = soft light, no direction.
- DirectionalLight = sunlight type, has direction.
- Change DirectionalLight direction using `.position` or `.target`.
- Helpers are for debugging only.
