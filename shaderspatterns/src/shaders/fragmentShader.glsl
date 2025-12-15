// color based on vertex position
varying vec3 vPosition;
varying vec2 vUv;

void main() {

    // gl_FragColor = vec4( vUv.x,vUv.x,vUv.x, 1.0); // simple gradient or write like

     vec3 gray = vec3(vUv.x);          // r=g=b = vUv.x
    gl_FragColor = vec4(gray, 1.0); 

}