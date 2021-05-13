precision highp float;

// https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderLib/meshbasic_frag.glsl.js
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

varying vec3 vLightFront;
varying vec3 vIndirectFront;

#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif

// #include <lights_pars_begin>
uniform vec3 ambientLightColor;

struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};

void main() {
  ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));

  #ifdef DOUBLE_SIDED
		reflectedLight.indirectDiffuse += (gl_FrontFacing) ? vIndirectFront : vIndirectBack;
	#else
		reflectedLight.indirectDiffuse += vIndirectFront;
	#endif

	#ifdef DOUBLE_SIDED
		reflectedLight.directDiffuse = (gl_FrontFacing) ? vLightFront : vLightBack;
	#else
		reflectedLight.directDiffuse = vLightFront;
	#endif

  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;

  gl_FragColor = vec4(outgoingLight, 1.0);
}
