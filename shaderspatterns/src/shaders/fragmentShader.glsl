// color based on vertex position
varying vec3 vPosition;
varying vec2 vUv;
#define PI 3.14159265359

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

   //pattern 6
   //float strength = mod(vUv.x * 10.0 ,1.0); 
   //strength =step(0.5, strength);
   //gl_FragColor = vec4(strength,strength,strength, 1.0);

    //pattern 7
    //float strength = mod(vUv.x * 10.0 ,1.0); 
    //strength =step(0.8, strength);
    //gl_FragColor = vec4(strength,strength,strength, 1.0);

     //pattern 8
    // float strength = step(0.8,mod(vUv.x * 10.0 ,1.0)); 
    // strength += step(0.8,mod(vUv.y * 10.0 ,1.0)); 
    // gl_FragColor = vec4(strength,strength,strength, 1.0);

    //pattern 9
    //float strength = step(0.8,mod(vUv.x * 10.0 ,1.0)); 
    //strength *= step(0.8,mod(vUv.y * 10.0 ,1.0)); 
    //gl_FragColor = vec4(strength,strength,strength, 1.0);

    //pattern 10
   // float strength = step(0.4,mod(vUv.x * 10.0 ,1.0)); 
   // strength *= step(0.8,mod(vUv.y * 10.0 ,1.0)); 
   // gl_FragColor = vec4(strength,strength,strength, 1.0);

    //pattern 11
   // float barX = step(0.4,mod(vUv.x * 10.0 ,1.0)); 
   // barX *= step(0.8,mod(vUv.y * 10.0 ,1.0)); 

   // float barY = step(0.8,mod(vUv.x * 10.0 ,1.0)); 
   // barY *= step(0.4,mod(vUv.y * 10.0 ,1.0)); 

   // float strength = barX + barY;
   // gl_FragColor = vec4(strength,strength,strength, 1.0);

   //pattern 12
   // float barX = step(0.4,mod(vUv.x * 10.0  ,1.0)); 
   // barX *= step(0.8,mod(vUv.y * 10.0 +0.2 ,1.0)); 

   // float barY = step(0.8,mod(vUv.x * 10.0 + 0.2 ,1.0)); 
   // barY *= step(0.4,mod(vUv.y * 10.0 ,1.0)); 

   // float strength = barX + barY;
   // gl_FragColor = vec4(strength,strength,strength, 1.0);

   //pattern 13
   // float strength= min(abs(vUv.x - 0.5) ,abs(vUv.y - 0.5));
   //  gl_FragColor = vec4(strength,strength,strength, 1.0);

   //pattern 14
   // float box1= step(0.2, max(abs(vUv.x - 0.5) ,abs(vUv.y - 0.5)));
   // float box2= 1.0 - step(0.25, max(abs(vUv.x - 0.5) ,abs(vUv.y - 0.5)));
   //  float strength =box1 * box2;
   //  gl_FragColor = vec4(strength,strength,strength, 1.0);

   //pattern 15 gradientcolor divide by lineshadow make small box gradient
   // float strength =floor( vUv.x *10.0) / 10.0;
   // strength *= floor( vUv.y *10.0) / 10.0;
   //  gl_FragColor = vec4(strength,strength,strength, 1.0);

   //pattern 16 mid black whole with two methods
   // float strength = length(vUv -0.5);
   //    float strength = distance(vUv, vec2(0.5));
   //  gl_FragColor = vec4(strength,strength,strength, 1.0);

   //pattern 17 mid bright other in little dark
   // float strength = 1.0 -distance(vUv, vec2(0.5));
   //  gl_FragColor = vec4(strength,strength,strength, 1.0);

   //pattern 18 mid bright other whole thing is dark
   // float strength =0.015 / distance(vUv, vec2(0.5));
   //  gl_FragColor = vec4(strength,strength,strength, 1.0);

   //patter 19
   // vec2 lightvuv = vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25);

   // float strength =0.015 / distance(lightvuv, vec2(0.5));
   //  gl_FragColor = vec4(strength,strength,strength, 1.0);

    //patter 20 star in mid other whole thing is dark
   // vec2 lightvuvX = vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25);
   // float lightX = 0.015 / distance(lightvuvX, vec2(0.5));

   // vec2 lightvuvY = vec2(vUv.y * 0.1 + 0.45, vUv.x * 0.5 + 0.25);
   // float lightY = 0.015 / distance(lightvuvY, vec2(0.5));

   // float strength =lightX * lightY;
   //  gl_FragColor = vec4(strength,strength,strength, 1.0);

   // pattern 21 circle ring in plane
      // float strength = step(0.01,abs(distance(vUv, vec2(0.5))-0.25));
      // gl_FragColor = vec4(strength,strength,strength, 1.0);

   // pattern 21 zigzag ring the plane black 
      // vec2 waveuv = vec2(vUv.x , vUv.y + sin(vUv.x * 30.0)* 0.01);
      // float strength =1.0 - step(0.01,abs(distance(waveuv, vec2(0.5))-0.25));
      // gl_FragColor = vec4(strength,strength,strength, 1.0);   

    // pattern 22 zigzag ring the plane black 
      // vec2 waveuv = vec2(
      //    vUv.x + sin(vUv.y * 30.0)* 0.1 ,
      //    vUv.y + sin(vUv.x * 30.0)* 0.1);
      // float strength =1.0 - step(0.01,abs(distance(waveuv, vec2(0.5))-0.25));
      // gl_FragColor = vec4(strength,strength,strength, 1.0);   

      // pattern 23 zigzag pattern the plane black 
      // vec2 waveuv = vec2(
      //    vUv.x + sin(vUv.y * 100.0)* 0.1 ,
      //    vUv.y + sin(vUv.x * 100.0)* 0.1);
      // float strength =1.0 - step(0.01,abs(distance(waveuv, vec2(0.5))-0.25));
      // gl_FragColor = vec4(strength,strength,strength, 1.0);    

      // pattern 24 angle gray gradient the plane black 
      //  float angle = atan(vUv.x -0.5, vUv.y -0.5);
      //  angle /= PI* 2.0;
      //  angle += 0.5;
      //  float strength = angle;
      // gl_FragColor = vec4(strength,strength,strength, 1.0); 

       // pattern 26 angle cuts pattern the plane black 
       float angle = atan(vUv.x -0.5, vUv.y -0.5);
       angle /= PI* 2.0;
       angle += 0.5;
       angle *= 20.0;
       angle =mod(angle, 1.0);
       float strength = angle;
      gl_FragColor = vec4(strength,strength,strength, 1.0); 

       // pattern 27 angle cuts pattern the plane black 
      //  float angle = atan(vUv.x -0.5, vUv.y -0.5);

      //  angle /= PI* 2.0;
      //  angle += 0.5;

      //  float strength = sin(angle * 100.0);
      // gl_FragColor = vec4(strength,strength,strength, 1.0); 

}