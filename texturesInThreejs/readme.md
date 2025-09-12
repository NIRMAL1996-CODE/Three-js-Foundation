# Three.js Texture Example

This project demonstrates how to load and apply a texture in Three.js using `TextureLoader` and set the correct color space.

---

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Code Explanation](#code-explanation)
- [References](#references)

---

## Overview

Three.js allows loading images as textures to apply on 3D objects.  
In this example, we load an image (`image.jpeg`) and set its color space to `sRGB` for accurate rendering.

---

## Prerequisites

- Basic knowledge of JavaScript
- Node.js (optional if using a local server)
- Three.js library

---

// Create a texture loader
const textureLoader = new THREE.TextureLoader();

// Load the texture
let texture = textureLoader.load("/image.jpeg");

// Set color space to sRGB for accurate colors
texture.colorSpace = THREE.SRGBColorSpace;
/image.jpeg → Path to your texture image

THREE.SRGBColorSpace → Ensures colors display correctly in rendering

## Code Explanation:
TextureLoader: Loads image files to use as textures in Three.js.

texture.load(): Loads the image asynchronously.

texture.colorSpace: Converts texture colors to sRGB, which is important for physically correct rendering in modern Three.js.

# Three.js HDRI & Texture Notes
## 1. Texture Basics
- **`map`**: The main color/texture image of a 3D object.  
  - Example: `const material = new THREE.MeshPhysicalMaterial({ map: tex });`  
  - Gives **colors and details** to the object.  
- **`alphaMap`**: Controls **transparency** (see-through parts).  
  - White = fully visible, Black = fully invisible, Gray = semi-transparent.  
  - Works only with **brightness**, colors don’t matter.  
- **`material.transparent = true;`**  
  - Needed for `alphaMap` to work.  
  - Makes object **see-through** like glass or paper.

## 2. HDRI (High Dynamic Range Image)
- **HDR pic** stores **super bright and super dark parts** together.  
- Makes 3D scenes **look realistic** with lighting and reflections.  
- **RGBELoader** loads HDR images:  
  ```js
  const hdri = new RGBELoader().load("yourHDR.hdr", () => {
      scene.background = hdri;      // Set as scene background
      scene.environment = hdri;     // Set as lighting environment
  });

scene.environment = hdri → HDR lights up objects and reflections.
Only HDR formats (.hdr, .exr) give realistic lighting, not normal JPG/PNG.

3. Summary
    map → colors/details
    alphaMap + transparent → see-through
    HDRI + RGBELoader → realistic lighting & reflections
    Always use HDR for environment lighting, JPG/PNG only for textures.