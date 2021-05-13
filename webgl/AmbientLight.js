import * as THREE from 'three'

export default class AmbientLight extends THREE.AmbientLight {
  constructor(color = 0x111111, intensity = 1) {
    super(color, intensity)
  }
}
