// https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderLib/meshbasic_frag.glsl.js

precision highp float;

varying vec3 vIndirectFront;

struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};

void main() {
  ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
  reflectedLight.indirectDiffuse += vIndirectFront;

  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;

  gl_FragColor = vec4(outgoingLight, 1.0);
}
