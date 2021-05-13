import * as THREE from 'three'

export default class DirectionalLight extends THREE.DirectionalLight {
  constructor(color = 0xff0000, intensity = 0.2) {
    super(color, intensity)
    this.position.set(-10, 20, 20)
  }
}
