// #extension GL_OES_standard_derivatives : enable
precision highp float;

#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb)

void main() {
  gl_FragColor = vec4(1.0);
}
