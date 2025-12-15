// color based on vertex position
varying vec3 vPosition;
varying vec2 vUv;

void main() {
     //pattern 1
    // gl_FragColor = vec4( vUv.x,vUv.x,vUv.x, 1.0); // simple gradient or write like

    //  vec3 gray = vec3(vUv.x);          // r=g=b = vUv.x
    // gl_FragColor = vec4(gray, 1.0); 
    
    //float strength = vUv.x;
    //gl_FragColor = vec4(strength,strength,strength, 1.0);

   //pattern 2
   // float strength = vUv.y;
   //gl_FragColor = vec4(strength,strength,strength, 1.0);

   //pattern 3
   //float strength = 1.0- vUv.y;
   //gl_FragColor = vec4(strength,strength,strength, 1.0);

    //pattern 4
   //float strength = vUv.y * 10.0;
   //gl_FragColor = vec4(strength,strength,strength, 1.0);

   //pattern 5
   //float strength = mod(vUv.y * 10.0 ,1.0); // repeats every 1 unit
   //gl_FragColor = vec4(strength,strength,strength, 1.0);

   //pattern 5
   //float strength = mod(vUv.x * 10.0 ,1.0); 
   //strength =step(0.5, strength);
   //gl_FragColor = vec4(strength,strength,strength, 1.0);

    //pattern 6
    //float strength = mod(vUv.x * 10.0 ,1.0); 
    //strength =step(0.8, strength);
    //gl_FragColor = vec4(strength,strength,strength, 1.0);

     //pattern 6
    // float strength = step(0.8,mod(vUv.x * 10.0 ,1.0)); 
    // strength += step(0.8,mod(vUv.y * 10.0 ,1.0)); 
    // gl_FragColor = vec4(strength,strength,strength, 1.0);

    //pattern 7
    //float strength = step(0.8,mod(vUv.x * 10.0 ,1.0)); 
    //strength *= step(0.8,mod(vUv.y * 10.0 ,1.0)); 
    //gl_FragColor = vec4(strength,strength,strength, 1.0);

    //pattern 8
   float strength = step(0.4,mod(vUv.x * 10.0 ,1.0)); 
   strength *= step(0.8,mod(vUv.y * 10.0 ,1.0)); 
   gl_FragColor = vec4(strength,strength,strength, 1.0);


}