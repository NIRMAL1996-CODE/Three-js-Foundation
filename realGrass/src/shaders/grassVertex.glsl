uniform float time;
varying vec2 vUv;

void main() {
    vUv = uv; // pass UV to fragment shader
    vec3 pos = position;
    pos.x += sin(time + position.y * 5.0) * 0.1; // sway side to side
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
