precision highp float;

#define RECIPROCAL_PI 0.3183098861837907

uniform mat4 viewMatrix;
uniform float shininess;

varying vec3 vViewPosition;
varying vec3 vNormal;

// Directional Lights
struct DirectionalLight {
  vec3 direction;
  vec3 color;
};
uniform DirectionalLight directionalLights[NUM_DIR_LIGHTS];

// Diffuse
vec3 calcDiffuse(
  const in vec3 normal,
  const in DirectionalLight directLight
) {
  float dotNL = dot(normalize(normal), normalize(directLight.direction));
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
  const in vec3 normal,
  const in vec3 viewPosition,
  const in DirectionalLight directLight
) {
  vec3 halfDir = normalize(directLight.direction + normalize(viewPosition));
  float dotNH = clamp(dot(normalize(normal), halfDir), 0.0, 1.0);
  float dotLH = clamp(dot(normalize(directLight.direction), halfDir), 0.0, 1.0);
  vec3 F = F_Schlick(vec3(1.0), dotLH);
  float G = 0.25;
  float D = D_BlinnPhong(shininess, dotNH);
  return (F * (G * D));
}

void main() {
  vec3 diffuse;
  vec3 specular;
  vec3 irradiance;

  #pragma unroll_loop_start
  for (int i = 0; i < NUM_DIR_LIGHTS; i++) {
    // diffuse
    irradiance = calcDiffuse(vNormal, directionalLights[i]);
    diffuse += irradiance;

    // specular
    specular += irradiance * calcSpecular(vNormal, vViewPosition, directionalLights[i]);
  }
  #pragma unroll_loop_end

  vec3 light = diffuse + specular;

  gl_FragColor = vec4(light, 1.0);
}
