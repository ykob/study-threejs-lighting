#extension GL_OES_standard_derivatives : enable

precision highp float;

uniform mat4 viewMatrix;
uniform float time;
uniform float shininess;
uniform sampler2D normalMap;
uniform vec2 normalScale;

varying vec3 vViewPosition;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBitangent;

// Common
#define RECIPROCAL_PI 0.3183098861837907

struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
};

// Ambient Light
uniform vec3 ambientLightColor;

// Directional Lights
struct DirectionalLight {
  vec3 direction;
  vec3 color;
};
uniform DirectionalLight directionalLights[NUM_DIR_LIGHTS];

// Diffuse
vec3 calcDiffuse(
  const in GeometricContext geometry,
  const in DirectionalLight directLight
) {
  float dotNL = dot(geometry.normal, directLight.direction);
  return directLight.color * clamp(dotNL, 0.0, 1.0);
}

// Specular
vec3 F_Schlick(const in vec3 specularColor, const in float dotLH) {
  float fresnel = exp2((-5.55473 * dotLH - 6.98316) * dotLH);
  return (1.0 - specularColor) * fresnel + specularColor;
}
float D_BlinnPhong(const in float shininess, const in float dotNH) {
  return RECIPROCAL_PI * (shininess * 0.5 + 1.0) * pow(dotNH, shininess);
}
vec3 calcSpecular(
  const in GeometricContext geometry,
  const in DirectionalLight directLight
) {
  vec3 halfDir = normalize(directLight.direction + geometry.viewDir);
  float dotNH = clamp(dot(geometry.normal, halfDir), 0.0, 1.0);
  float dotLH = clamp(dot(directLight.direction, halfDir), 0.0, 1.0);
  vec3 F = F_Schlick(vec3(1.0), dotLH);
  float G = 0.25;
  float D = D_BlinnPhong(shininess, dotNH);
  return (F * (G * D));
}

vec3 blendNormalRNM(vec3 n1, vec3 n2) {
	n1 += vec3(0.0, 0.0, 1.0);
	n2 *= vec3(-1.0, -1.0, 1.0);
  return n1 * dot(n1, n2) / n1.z - n2;
}

void main() {
  // Normal with Tangent Space
  vec3 normal = normalize(vNormal);
  vec3 tangent = normalize(vTangent);
  vec3 bitangent = normalize(vBitangent);
  mat3 vTBN = mat3(tangent, bitangent, normal);
  vec3 mapN1 = texture2D(normalMap, vUv + time * 0.01).xyz * 2.0 - 1.0;
  vec3 mapN2 = texture2D(normalMap, vUv + vec2(0.0, 0.5) - time * 0.01).xyz * 2.0 - 1.0;
  vec3 mapN = blendNormalRNM(mapN1, mapN2);
  mapN.xy *= normalScale;
  normal = normalize(vTBN * mapN);

  // Define geometry
  GeometricContext geometry;
  geometry.position = -vViewPosition;
  geometry.normal = normal;
  geometry.viewDir = normalize(vViewPosition);

  vec3 diffuse;
  vec3 specular;
  vec3 irradiance;

  #pragma unroll_loop_start
  for (int i = 0; i < NUM_DIR_LIGHTS; i++) {
    // diffuse
    irradiance = calcDiffuse(geometry, directionalLights[i]);
    diffuse += irradiance;

    // specular
    specular += irradiance * calcSpecular(geometry, directionalLights[i]);
  }
  #pragma unroll_loop_end

  vec3 light = diffuse + specular + ambientLightColor;

  gl_FragColor = vec4(light, 1.0);
}
