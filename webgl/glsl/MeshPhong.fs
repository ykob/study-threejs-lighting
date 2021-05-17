precision highp float;

uniform mat4 viewMatrix;
uniform float shininess;

varying vec3 vViewPosition;
varying vec3 vNormal;

// Common
#define RECIPROCAL_PI 0.3183098861837907

struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
};

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
  float dotNL = dot(normalize(geometry.normal), normalize(directLight.direction));
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

void main() {
  GeometricContext geometry;
  geometry.position = -vViewPosition;
  geometry.normal = normalize(vNormal);
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

  vec3 light = diffuse + specular;

  gl_FragColor = vec4(light, 1.0);
}
