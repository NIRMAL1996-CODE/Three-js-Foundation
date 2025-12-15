# Shader Basics (Easy Notes)

## What is a Shader?

A **Shader** is a small program that runs on the **GPU** (graphics chip).
It controls **how 3D objects look** on the screen.

GPU (Graphics Processing Unit) = part of computer that draws graphics.

---

## Why Shaders are Used

* Make custom colors
* Create animations (waves, glow, fire)
* Control light and effects
* Faster rendering than CPU

---

## Types of Shaders (Very Important)

### 1. Vertex Shader

* Works on **vertices** (corners of shapes)
* Decides **position** of points
* Runs first

Vertex = corner point of geometry.

### 2. Fragment Shader

* Works on **fragments** (tiny pixels)
* Decides **color** of pixels
* Runs after vertex shader

Fragment = one small pixel on screen.

---

## Shader Files

* `vertexShader.glsl` → vertex logic
* `fragmentShader.glsl` → color logic

`.glsl` = OpenGL Shading Language (shader language)

---

## Basic Shader Syntax

### Common Keywords

* `vec2` → 2 numbers (x, y)
* `vec3` → 3 numbers (x, y, z)
* `vec4` → 4 numbers (r, g, b, a)
* `void main()` → starting point of shader

---

## How Shaders are Used in Three.js

Shaders are connected using:

* `ShaderMaterial`

Vertex shader → sets position
Fragment shader → sets color

---

## Important Point

Shaders **do not run alone**.
They always work **inside Three.js material**.

---
GPU (very simple)

GPU = Graphics Processing Unit
It is a special chip for drawing graphics
Very fast at doing math for images & 3D

What GPU does here:
Runs shaders
Moves vertices
Colors pixels

CPU vs GPU:
CPU = brain (general work)
GPU = artist (drawing many pixels fast)

-------
# Vertex Shader Notes (Very Easy)

## What is a Vertex Shader?

* A **vertex shader** runs on the **GPU**.
* It works on **vertices** (corners of a shape).
* Its main job is to decide **where each vertex appears on screen**.

Vertex = corner point of geometry.

---

## Predefined Things (Very Important)

### `position`

* Predefined **attribute**.
* Comes from **Three.js geometry** (from JS, sent to GPU).
* Contains `(x, y, z)` of each vertex.

### `gl_Position`

* Predefined **output variable**.
* Vertex shader **must set it**.
* GPU uses it to draw the vertex on screen.

---

## Main Line (Must Remember)

```glsl
gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
```

### Meaning (Kid Style)

* `position` → vertex point of geometry
* `vec4(position, 1.0)` → make it usable for math
* `modelViewMatrix` → move object + camera view
* `projectionMatrix` → convert 3D to 2D screen
* `gl_Position` → final screen position

---

## `vec4(position, 1.0)` Explained

* `vec4` = 4 numbers `(x, y, z, w)`
* `w = 1.0` → real point in space
* `w = 0.0` → direction (not a point)

---

## `varying`

```glsl
varying vec3 vPosition;
```

* Used to **send data from vertex → fragment**.
* Must be written in **both shaders**.
* Name and type must be same.

Varying = shared data.

---

## Data Flow (Easy)

```text
Geometry (JS)
   ↓
position (vertex shader)
   ↓
varying
   ↓
fragment shader
```

---

## Rules to Remember

* Vertex shader runs **first**.
* Vertex shader runs **once per vertex**.
* `gl_Position` is **mandatory**.
* Fragment shader cannot access `position` directly.

---

# Fragment Shader – Color Examples (Easy Notes)

## What is Fragment Shader?

* Fragment shader runs on **GPU**.
* It decides the **final color of each pixel**.
* Runs **after vertex shader**.

Fragment = one tiny pixel on screen.

---

## Main Output

```glsl
gl_FragColor = vec4(r, g, b, a);
```

* `r` = red (0.0 – 1.0)
* `g` = green (0.0 – 1.0)
* `b` = blue (0.0 – 1.0)
* `a` = alpha (opacity)

---

## Color Examples

### 1. Solid Color

```glsl
gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
```

Red color.

---

### 2. Gradient Using Position

```glsl
gl_FragColor = vec4(vPosition * 0.5 + 0.5, 1.0);
```

Color changes based on vertex position.

---

### 3. Black to White Gradient (Top to Bottom)

```glsl
float c = vPosition.y * 0.5 + 0.5;
gl_FragColor = vec4(c, c, c, 1.0);
```

Uses Y position for brightness.

---

### 4. Time Based Color (Animation)

```glsl
uniform float uTime;
gl_FragColor = vec4(abs(sin(uTime)), 0.0, 1.0, 1.0);
```

Color changes with time.

---

### 5. Texture Color

```glsl
uniform sampler2D uTexture;
gl_FragColor = texture2D(uTexture, uv);
```

Uses image as color.

---

## What Fragment Shader Can Use

* `varying` → data from vertex shader
* `uniform` → data from JavaScript

❌ Cannot use `position` or `attribute` directly.

---

## Easy Rule

* Vertex shader → position
* Fragment shader → color

---

# UV Notes (Very Easy)

## What is UV?

* UV = 2D coordinates for **mapping textures** on 3D objects
* `u` = horizontal (left → right)
* `v` = vertical (bottom → top)
* Always **range 0.0 → 1.0**

---

## Where UV comes from

* Geometry (Plane, Box, etc.) **automatically generates UVs**
* Vertex shader can access UV as `uv` (predefined)
* To send UV to fragment shader, use `varying`:

```glsl
varying vec2 vUv;
vUv = uv;
```

---

## How UV values are distributed

* Corners have fixed UVs:

  * Bottom-left → (0,0)
  * Bottom-right → (1,0)
  * Top-left → (0,1)
  * Top-right → (1,1)
* Middle points depend on **segments**

  * Example: 2×2 grid (4 squares → 9 vertices)

    * Center → (0.5,0.5)
* UV is **normalized** (0 → 1)

---

## How to use UV in fragment shader

### 1. Gradient color

```glsl
gl_FragColor = vec4(vUv, 0.0, 1.0);
```

* u → red, v → green
* Creates smooth gradient

### 2. Texture mapping

```glsl
uniform sampler2D uTexture;
gl_FragColor = texture2D(uTexture, vUv);
```

* vUv decides **which part of image goes to vertex**
* GPU interpolates UV for all pixels between vertices

---

## Kid analogy 🧒

* UV = map/grid on plane
* Each intersection = a coordinate (u,v)
* Shader uses UV to color/texture each pixel


