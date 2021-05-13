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

// https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderLib/meshbasic_vert.glsl.js

#define LAMBERT

varying vec3 vLightFront;
varying vec3 vIndirectFront;

#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif

// #include <common>
#define PI 3.141592653589793

#ifndef saturate
  #define saturate(a) clamp(a, 0.0, 1.0)
#endif

struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};

struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
  #ifdef CLEARCOAT
    vec3 clearcoatNormal;
  #endif
};

// #include <lights_pars_begin>
uniform vec3 ambientLightColor;

vec3 getAmbientLightIrradiance(const in vec3 ambientLightColor) {
  vec3 irradiance = ambientLightColor;
  return irradiance *= PI;
}

#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};

	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];

	void getDirectionalDirectLightIrradiance(
    const in DirectionalLight directionalLight,
    const in GeometricContext geometry,
    out IncidentLight directLight
  ) {
		directLight.color = directionalLight.color;
		directLight.direction = directionalLight.direction;
		directLight.visible = true;
	}
#endif

void main(void) {
  // #include <beginnormal_vertex>
  vec3 objectNormal = vec3( normal );

  // #include <defaultnormal_vertex>
  vec3 transformedNormal = objectNormal;

  // #include <begin_vertex>
  vec3 transformed = vec3(position);

  // #include <project_vertex>
  vec4 mvPosition = vec4(transformed, 1.0);
  mvPosition = modelViewMatrix * mvPosition;
  gl_Position = projectionMatrix * mvPosition;

  // #include <lights_lambert_vertex>
  vec3 diffuse = vec3( 1.0 );

  GeometricContext geometry;
  geometry.position = mvPosition.xyz;
  geometry.normal = normalize(transformedNormal);
  geometry.viewDir = (isOrthographic)
    ? vec3(0, 0, 1)
    : normalize(-mvPosition.xyz);
  
  GeometricContext backGeometry;
  backGeometry.position = geometry.position;
  backGeometry.normal = -geometry.normal;
  backGeometry.viewDir = geometry.viewDir;
  
  vLightFront = vec3(0.0);
  vIndirectFront = vec3(0.0);
  #ifdef DOUBLE_SIDED
    vLightBack = vec3(0.0);
    vIndirectBack = vec3(0.0);
  #endif

  IncidentLight directLight;
  float dotNL;
  vec3 directLightColor_Diffuse;

  vIndirectFront += getAmbientLightIrradiance(ambientLightColor);

  #if NUM_DIR_LIGHTS > 0
    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
      getDirectionalDirectLightIrradiance(directionalLights[ i ], geometry, directLight);
      dotNL = dot(geometry.normal, directLight.direction);
      directLightColor_Diffuse = PI * directLight.color;
      vLightFront += saturate(dotNL) * directLightColor_Diffuse;
      #ifdef DOUBLE_SIDED
        vLightBack += saturate(-dotNL) * directLightColor_Diffuse;
      #endif
    }
    #pragma unroll_loop_end
  #endif
}
