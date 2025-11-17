# Three.js Texture Types Notes

A quick guide to different texture types in Three.js with real-world examples.

1. Color Map (Diffuse Map)
Purpose: Gives the basic color of the surface

Real-world example: Paint on a car

Example:
const colorTexture = loader.load('/color.jpeg');
material.map = colorTexture;

2. Normal Map
Purpose: Adds small surface details (bumps/indents) without extra geometry

Real-world example: Rough skin, brick walls

Example:
const normalTexture = loader.load('/normal.jpeg');
material.normalMap = normalTexture;

3. Bump Map
Purpose: Adds depth illusion using grayscale image

Real-world example: Grooves on a coin or tiles

Example:
const bumpTexture = loader.load('/bump.jpeg');
material.bumpMap = bumpTexture;
material.bumpScale = 2;

4. Metalness Map
Purpose: Defines which parts are metallic

Real-world example: Metal vs plastic on a robot

Example:
const metalTexture = loader.load('/metal.jpeg');
material.metalnessMap = metalTexture;
material.metalness = 1;

5. Roughness Map
Purpose: Defines how rough or shiny a surface is

Real-world example: Matte vs glossy surface

Example:
material.roughness = 0.1; // 0 = shiny, 1 = rough

6. AO Map (Ambient Occlusion)
Purpose: Adds realistic shadows in crevices

Real-world example: Corners of a crate or grooves in a wall

Note: Geometry needs uv2

Example:
geometry.setAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2));
material.aoMap = aoTexture;
material.aoMapIntensity = 1;

7. Specular Map
Purpose: Controls how shiny parts reflect light

Real-world example: Glossy sticker on a notebook

Example:
material.specularMap = specularTexture;

8. Displacement Map
Purpose: Actually changes geometry height using grayscale image

Real-world example: Mountains or brick walls popping out

Example:
material.displacementMap = displacementTexture;
material.displacementScale = 0.2;

Tip:
Combine color + normal + AO + metalness + roughness for realistic materials

AO + Normal + Bump = depth illusion without heavy geometry