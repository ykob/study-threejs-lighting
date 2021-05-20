attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec4 tangent;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

varying vec3 vViewPosition;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBitangent;

void main(void) {
  vec3 transformedNormal = normal;
  transformedNormal = normalMatrix * transformedNormal;

  vec3 transformed = vec3(position);
  vec4 mvPosition = viewMatrix * modelMatrix * vec4(transformed, 1.0);

  vec3 objectTangent = vec3(tangent.xyz);
  vec3 transformedTangent = (viewMatrix * modelMatrix * vec4(objectTangent, 0.0)).xyz;

  vViewPosition = -mvPosition.xyz;
  vUv = uv;
  vNormal = normalize(transformedNormal);
  vTangent = normalize(transformedTangent);
  vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);

  gl_Position = projectionMatrix * mvPosition;
}
