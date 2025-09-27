//  uniform float uTime;
// void main() {
//   vec3 pos =position;
//   pos.x += .2*sin(pos.x*2. * pos.y*4. + uTime);
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
// }
// uniform float uTime;

// void main() {

//   vec4 modelPosition= modelMatrix * vec4(position,1.0);
//   modelPosition.z += 0.2 * sin(modelPosition.x * 4.8 + modelPosition.y * 3.4 + uTime);

//   vec4 viewPosition = viewMatrix * modelPosition;
//   vec4 projectedPosition = projectionMatrix * viewPosition;
//   gl_Position = projectedPosition;
// }

uniform float uTime;
varying vec2 vUv;

void main() {
  vUv = uv;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z += 0.2 * sin(modelPosition.x*4.8 + modelPosition.y*3.4 + uTime);

  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
}
