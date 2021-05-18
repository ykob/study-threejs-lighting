attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

varying vec3 vViewPosition;
varying vec2 vUv;
varying vec3 vNormal;

void main(void) {
  vec3 transformedNormal = normal;
  transformedNormal = normalMatrix * transformedNormal;

  vec3 transformed = vec3(position);
  vec4 mvPosition = viewMatrix * modelMatrix * vec4(transformed, 1.0);

  vViewPosition = -mvPosition.xyz;
  vUv = uv;
  vNormal = normalize(transformedNormal);

  gl_Position = projectionMatrix * mvPosition;

}
