precision highp float;

uniform sampler2D map;

varying vec2 vUv;

void main() {
  vec4 texelColor = texture2D(map, vUv);
  float gradual = smoothstep(0.48, 0.55, vUv.y);

  gl_FragColor = vec4(texelColor.rgb * gradual, 1.0);
}
