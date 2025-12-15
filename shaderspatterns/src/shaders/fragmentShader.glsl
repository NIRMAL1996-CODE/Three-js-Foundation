// color based on vertex position
varying vec3 vPosition;
varying vec2 vUv;

void main() {
    gl_FragColor = vec4( vUv, 1.0, 1.0); // simple gradient
}