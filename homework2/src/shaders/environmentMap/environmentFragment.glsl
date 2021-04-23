#ifdef GL_ES
precision mediump float;
#endif

uniform vec3 uLightPos;
uniform vec3 uCameraPos;

varying highp vec3 vNormal;
varying highp vec2 vTextureCoord;

void main(){

  //gl_FragColor = vec4( 1.0, 0.0, 0.0, gl_FragCoord.z);
  gl_FragColor = pack(gl_FragCoord.z);
}