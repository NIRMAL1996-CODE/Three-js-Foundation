varying vec2 vUv;

void main() {
  vec3 color = vec3(0.0, 0.4, 0.7);
  color += vUv.y * 0.2;
  gl_FragColor = vec4(color, 1.0);
}
