#ifdef GL_ES
precision mediump float;
#endif

//uniform sampler2D uSampler;

uniform float uLightScale;

//varying highp vec2 vTextureCoord;
varying highp vec3 vEnvironmentLight;
varying highp vec2 vTextureCoord;
varying highp vec3 vNormal;

#define PI 3.141592653589793

float toSRGB(float value) {
    if (value < 0.0031308)
        return 12.92 * value;
    return 1.055 * pow(value, 0.41666) - 0.055;
}
void main(){
  //vec3 color = vec3(1.0);//texture2D(uSampler, vTextureCoord).rgb;
  vec3 color = vEnvironmentLight*uLightScale;
  gl_FragColor = vec4(toSRGB(color.x), toSRGB(color.y), toSRGB(color.z), 1.0);
}