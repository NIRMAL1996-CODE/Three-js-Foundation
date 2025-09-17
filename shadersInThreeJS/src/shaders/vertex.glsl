//  uniform float uTime;
// void main() {
//   vec3 pos =position;
//   pos.x += .2*sin(pos.x*2. * pos.y*4. + uTime);
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
// }
uniform float uTime;
void main() {
  vec4 modelPosition=modelMatrix*vec4(position,1.);
  modelPosition.z += .2*sin(modelPosition.x*4.8+modelPosition.y*3.4+ uTime);
  vec4 viewPosition = viewMatrix*modelPosition;
  vec4 projectedPosition = projectionMatrix*viewPosition;
  gl_Position =projectedPosition;
}