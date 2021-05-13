import * as THREE from 'three'

export default class DirectionalLight extends THREE.DirectionalLight {
  constructor(color = 0xffffff, intensity = 0.5) {
    super(color, intensity)
    this.position.set(-25, 25, -25)
  }
}
