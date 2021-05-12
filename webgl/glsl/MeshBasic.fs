// https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderLib/meshbasic_frag.glsl.js

precision highp float;

uniform vec3 ambientLightColor;

void main() {
  gl_FragColor = vec4(ambientLightColor, 1.0);
}
