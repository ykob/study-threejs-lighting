import * as THREE from 'three'

export default class AmbientLight extends THREE.AmbientLight {
  constructor(color = 0xffffff, intensity = 0.1) {
    super(color, intensity)
  }
}
