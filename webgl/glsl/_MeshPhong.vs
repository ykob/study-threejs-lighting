attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;
uniform bool isOrthographic;

// https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderLib/meshphong_vert.glsl.js

#define PHONG

varying vec3 vViewPosition;

#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif

void main(void) {
  // #include <beginnormal_vertex>
  vec3 objectNormal = vec3(normal);

  // #include <defaultnormal_vertex>
  vec3 transformedNormal = objectNormal;
  transformedNormal = normalMatrix * transformedNormal;

  // meshphong_vert.glsl.js
  vNormal = normalize(transformedNormal);

  // #include <begin_vertex>
  vec3 transformed = vec3(position);

  // #include <project_vertex>
  vec4 mvPosition = vec4(transformed, 1.0);
  mvPosition = modelViewMatrix * mvPosition;
  gl_Position = projectionMatrix * mvPosition;

  // meshphong_vert.glsl.js
  vViewPosition = - mvPosition.xyz;
}
