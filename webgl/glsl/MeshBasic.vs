// https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderLib/meshbasic_vert.glsl.js

attribute vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

varying vec3 vIndirectFront;

void main(void) {
  vec4 mPosition = modelMatrix * vec4(position, 1.0);

  gl_Position = projectionMatrix * viewMatrix * mPosition;
}
