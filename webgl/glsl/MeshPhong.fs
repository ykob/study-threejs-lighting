precision highp float;

uniform vec3 specular;
uniform float shininess;

varying vec3 vViewPosition;
varying vec3 vNormal;

// Directional Lights
struct DirectionalLight {
  vec3 direction;
  vec3 color;
};
uniform DirectionalLight directionalLights[NUM_DIR_LIGHTS];

void main() {
  vec3 irradiance;

  // Diffuse
  float dotNL;
  #pragma unroll_loop_start
  for (int i = 0; i < NUM_DIR_LIGHTS; i++) {
    dotNL = dot(vNormal, directionalLights[i].direction);
    irradiance += directionalLights[i].color * clamp(dotNL, 0.0, 1.0);
  }
  #pragma unroll_loop_end

  gl_FragColor = vec4(irradiance, 1.0);
}
