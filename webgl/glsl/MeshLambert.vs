// https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderLib/meshbasic_vert.glsl.js

#define PI 3.141592653589793

attribute vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

uniform vec3 ambientLightColor;

varying vec3 vIndirectFront;

vec3 getAmbientLightIrradiance(const in vec3 ambientLightColor) {
  vec3 irradiance = ambientLightColor;
  return irradiance *= PI;
}

void main(void) {
  vec4 mPosition = modelMatrix * vec4(position, 1.0);

  vIndirectFront = vec3(0.0);
  vIndirectFront += getAmbientLightIrradiance(ambientLightColor);

  gl_Position = projectionMatrix * viewMatrix * mPosition;
}
