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