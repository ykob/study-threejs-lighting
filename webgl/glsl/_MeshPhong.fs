precision highp float;

uniform bool isOrthographic;

// https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderLib/meshphong_frag.glsl.js
#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

// #include <common>
#define PI 3.141592653589793
#define RECIPROCAL_PI 0.3183098861837907

#ifndef saturate
  #define saturate(a) clamp(a, 0.0, 1.0)
#endif

struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
  #ifdef CLEARCOAT
    vec3 clearcoatNormal;
  #endif
};

struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};

// #include <bsdfs>
vec3 F_Schlick(const in vec3 specularColor, const in float dotLH) {
	float fresnel = exp2((-5.55473 * dotLH - 6.98316) * dotLH);
	return (1.0 - specularColor) * fresnel + specularColor;
}

vec3 BRDF_Diffuse_Lambert(const in vec3 diffuseColor) {
	return RECIPROCAL_PI * diffuseColor;
}

float G_BlinnPhong_Implicit() {
	return 0.25;
}

float D_BlinnPhong(const in float shininess, const in float dotNH) {
	return RECIPROCAL_PI * (shininess * 0.5 + 1.0) * pow(dotNH, shininess);
}

vec3 BRDF_Specular_BlinnPhong(
  const in IncidentLight incidentLight,
  const in GeometricContext geometry,
  const in vec3 specularColor,
  const in float shininess
) {
	vec3 halfDir = normalize(incidentLight.direction + geometry.viewDir);
	float dotNH = saturate(dot(geometry.normal, halfDir));
	float dotLH = saturate(dot(incidentLight.direction, halfDir));
	vec3 F = F_Schlick(specularColor, dotLH);
	float G = G_BlinnPhong_Implicit();
	float D = D_BlinnPhong(shininess, dotNH);
	return F * (G * D);
}

// #include <lights_pars_begin>
uniform vec3 ambientLightColor;

struct ReflectedLight {
  vec3 directDiffuse;
  vec3 directSpecular;
  vec3 indirectDiffuse;
  vec3 indirectSpecular;
};

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

// #include <lights_phong_pars_fragment>
varying vec3 vViewPosition;

#ifndef FLAT_SHADED
  varying vec3 vNormal;
#endif

struct BlinnPhongMaterial {
  vec3 diffuseColor;
  vec3 specularColor;
  float specularShininess;
  float specularStrength;
};

void RE_Direct_BlinnPhong(
  const in IncidentLight directLight,
  const in GeometricContext geometry,
  const in BlinnPhongMaterial material,
  inout ReflectedLight reflectedLight
) {
  float dotNL = saturate(dot(geometry.normal, directLight.direction));
  vec3 irradiance = dotNL * directLight.color;

  #ifndef PHYSICALLY_CORRECT_LIGHTS
    irradiance *= PI;
  #endif
  reflectedLight.directDiffuse +=
    irradiance *
    BRDF_Diffuse_Lambert(material.diffuseColor);
  reflectedLight.directSpecular +=
    irradiance *
    BRDF_Specular_BlinnPhong(
      directLight,
      geometry,
      material.specularColor,
      material.specularShininess
  ) *
    material.specularStrength;
}

void RE_IndirectDiffuse_BlinnPhong(
  const in vec3 irradiance,
  const in GeometricContext geometry,
  const in BlinnPhongMaterial material,
  inout ReflectedLight reflectedLight
) {
  reflectedLight.indirectDiffuse +=
    irradiance * BRDF_Diffuse_Lambert(material.diffuseColor);
}

#define RE_Direct RE_Direct_BlinnPhong
#define RE_IndirectDiffuse RE_IndirectDiffuse_BlinnPhong

void main() {
  // meshphong_vert.glsl.js
  vec4 diffuseColor = vec4(diffuse, opacity);
  ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
  vec3 totalEmissiveRadiance = emissive;

  // #include <specularmap_fragment>
  float specularStrength;

  #ifdef USE_SPECULARMAP
    vec4 texelSpecular = texture2D(specularMap, vUv ;
    specularStrength = texelSpecular.r;
  #else
    specularStrength = 1.0;
  #endif

  // #include <normal_fragment_begin>
  float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;

  #ifdef FLAT_SHADED
    // Workaround for Adreno GPUs not able to do dFdx(vViewPosition)
    vec3 fdx = vec3(dFdx(vViewPosition.x), dFdx(vViewPosition.y), dFdx(vViewPosition.z));
    vec3 fdy = vec3(dFdy(vViewPosition.x), dFdy(vViewPosition.y), dFdy(vViewPosition.z));
    vec3 normal = normalize(cross(fdx, fdy));
  #else
    vec3 normal = normalize(vNormal);
    #ifdef DOUBLE_SIDED
      normal = normal * faceDirection;
    #endif
    #ifdef USE_TANGENT
      vec3 tangent = normalize(vTangent);
      vec3 bitangent = normalize(vBitangent);
      #ifdef DOUBLE_SIDED
        tangent = tangent * faceDirection;
        bitangent = bitangent * faceDirection;
      #endif
    #endif
  #endif

  // non perturbed normal for clearcoat among others
  vec3 geometryNormal = normal;

  // accumulation
  // #include <lights_phong_fragment>
  BlinnPhongMaterial material;
  material.diffuseColor = diffuseColor.rgb;
  material.specularColor = specular;
  material.specularShininess = shininess;
  material.specularStrength = specularStrength;

  // #include <lights_fragment_begin>
  GeometricContext geometry;
  geometry.position = - vViewPosition;
  geometry.normal = normal;
  geometry.viewDir = (isOrthographic)
    ? vec3(0, 0, 1)
    : normalize(vViewPosition);

  IncidentLight directLight;

  #if (NUM_DIR_LIGHTS > 0) && defined(RE_Direct)
    DirectionalLight directionalLight;
    #if defined(USE_SHADOWMAP) && NUM_DIR_LIGHT_SHADOWS > 0
      DirectionalLightShadow directionalLightShadow;
    #endif
    #pragma unroll_loop_start

    for (int i = 0; i < NUM_DIR_LIGHTS; i ++) {
      directionalLight = directionalLights[ i ];
      getDirectionalDirectLightIrradiance(directionalLight, geometry, directLight);
      RE_Direct(directLight, geometry, material, reflectedLight);
    }
    #pragma unroll_loop_end

    #if defined(RE_IndirectSpecular)
      vec3 radiance = vec3(0.0);
      vec3 clearcoatRadiance = vec3(0.0);
    #endif
  #endif

  #if defined(RE_IndirectDiffuse)
    vec3 iblIrradiance = vec3(0.0);
    vec3 irradiance = getAmbientLightIrradiance(ambientLightColor);

    #if (NUM_HEMI_LIGHTS > 0)
      #pragma unroll_loop_start
      for (int i = 0; i < NUM_HEMI_LIGHTS; i ++) {
        irradiance += getHemisphereLightIrradiance(hemisphereLights[i], geometry);
      }
      #pragma unroll_loop_end
    #endif
  #endif

  // #include <lights_fragment_end>
  #if defined(RE_IndirectDiffuse)
    RE_IndirectDiffuse(irradiance, geometry, material, reflectedLight);
  #endif

  #if defined(RE_IndirectSpecular)
    RE_IndirectSpecular(radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight);
  #endif

  // meshphong_vert.glsl.js
  vec3 outgoingLight =
    reflectedLight.directDiffuse +
    reflectedLight.indirectDiffuse +
    reflectedLight.directSpecular +
    reflectedLight.indirectSpecular +
    totalEmissiveRadiance;

  gl_FragColor = vec4(outgoingLight, 1.0);
  // gl_FragColor = vec4(outgoingLight, diffuseColor.a);
}
