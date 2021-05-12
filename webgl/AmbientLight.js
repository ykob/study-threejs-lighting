import * as THREE from 'three'

export default class AmbientLight extends THREE.AmbientLight {
  constructor(color = 0xff0000, intensity = 1) {
    super(color, intensity)
  }
}
