#ifdef GL_ES
precision mediump float;
#endif

//uniform sampler2D uSampler;

//varying highp vec2 vTextureCoord;
varying highp vec3 vEnvironmentLight;
varying highp vec2 vTextureCoord;
varying highp vec3 vNormal;

#define PI 3.141592653589793

void main(){
  vec3 color = vec3(1.0);//texture2D(uSampler, vTextureCoord).rgb;
  gl_FragColor = vec4(vEnvironmentLight*15.0, 1.0);
}