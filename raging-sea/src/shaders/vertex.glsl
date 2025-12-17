uniform float uTime;
varying vec2 vUv;

void main() {
  vUv = uv;

  vec3 pos = position;
  pos.z += sin(pos.x * 4.0 + uTime) * 0.2;
  pos.z += sin(pos.y * 3.0 + uTime) * 0.15;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
