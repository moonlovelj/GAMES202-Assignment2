attribute mat3 aPrecomputeLT;
attribute vec3 aVertexPosition;
attribute vec3 aNormalPosition;
attribute vec2 aTextureCoord;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 aPrecomputeL[9];


varying highp vec2 vTextureCoord;
varying highp vec3 vNormal;
varying highp vec3 vEnvironmentLight;

void main(void) {

  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix *
                vec4(aVertexPosition, 1.0);

  vTextureCoord = aTextureCoord;
  vNormal = (uModelMatrix * vec4(aNormalPosition, 0.0)).xyz;

  vEnvironmentLight = vec3(0.0);
  for(int i=0; i<3; i++)
  {
    for(int j=0; j<3; j++)
    {
      vEnvironmentLight+=(aPrecomputeLT[i][j]*aPrecomputeL[i*3+j]);
    }
  }
}