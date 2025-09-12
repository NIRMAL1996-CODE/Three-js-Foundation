# Three.js Lights – Notes

## 1. AmbientLight

* **Meaning:** Provides a global light that lights up all objects equally, no matter their position or direction.
* **Use:** Good for basic visibility of objects.
* **Key Points:**

  * Does **not cast shadows**.
  * Intensity value (`0.1`, `1`, etc.) controls brightness.
  * Color can be any (`"red"`, `"white"`, `0xff0000`, etc.).
* **Example:**

  ```js
  const light = new THREE.AmbientLight("red", 0.1);
  scene.add(light);
  ```
* **Effect:** Lights all objects evenly; no direction or shading effect.

---

## 2. DirectionalLight

* **Meaning:** Light that comes from a specific direction like the sun.
* **Use:** Great for sunlight effects, shadows.
* **Key Points:**

  * Position matters (direction only, not distance).
  * Can cast shadows.
* **Example:**

  ```js
  const directionalLight = new THREE.DirectionalLight("red", 3);
  directionalLight.position.set(2, 2, 2);
  scene.add(directionalLight);
  ```

---

## 3. PointLight

* **Meaning:** Light that radiates in all directions from a single point, like a bulb.
* **Use:** Creates local light effects.
* **Key Points:**

  * Position affects which objects are lit.
  * Can cast shadows.
  * Distance and intensity control how far and bright the light spreads.
* **Example:**

  ```js
  const pointLight = new THREE.PointLight(0xff0000, 3, 100);
  pointLight.position.set(1,1,1);
  scene.add(pointLight);
  ```

---

## 4. SpotLight

* **Meaning:** Light that shines like a flashlight in a cone shape.
* **Use:** Focused light on a specific area or object.
* **Key Points:**

  * `position.set(x, y, z)` defines where the light comes from.
  * Creates shadows and highlights in cone area.
  * `SpotLightHelper` shows the cone for debugging.
* **Example:**

  ```js
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(1, 3, 1);
  scene.add(spotLight);

  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);
  ```
* **Effect:** Only objects in the cone are lit; edges have fall-off effect.

---

## 5. Helpers

* **DirectionalLightHelper / PointLightHelper / SpotLightHelper**

  * Visual tools to see light direction, position, and area.
  * Not affecting actual lighting, just for debugging.

---

## Summary Table

| Light Type       | Directional | Shadows | Shape           | Use Case                  |
| ---------------- | ----------- | ------- | --------------- | ------------------------- |
| AmbientLight     | No          | No      | Global          | Basic visibility          |
| DirectionalLight | Yes         | Yes     | Parallel rays   | Sunlight, shadows         |
| PointLight       | No          | Yes     | Sphere (radial) | Bulbs, localized lighting |
| SpotLight        | Yes         | Yes     | Cone            | Flashlight, focused light |

**Tip:**

* Combine multiple lights for realistic scenes: AmbientLight + SpotLight/PointLight.
* Helpers are great for visualizing where lights are pointing.
