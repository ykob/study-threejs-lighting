attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

varying vec2 vUv;

void main(void) {
  vec3 transformed = position;
  vec4 mvPosition = viewMatrix * modelMatrix * vec4(transformed, 1.0);

  vUv = uv + vec2(0.45, 0.0);

  gl_Position = projectionMatrix * mvPosition;
}
