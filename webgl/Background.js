import * as THREE from 'three'

import vs from './glsl/Background.vs'
import fs from './glsl/Background.fs'

export default class Background extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.SphereGeometry(500, 32, 32)

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        map: {
          value: null,
        },
      },
      vertexShader: vs,
      fragmentShader: fs,
      side: THREE.BackSide,
    })

    // Create Object3D
    super(geometry, material)
    this.name = 'Background'
    this.rotation.y = (Math.PI / 180) * -180
  }

  start(map) {
    const { uniforms } = this.material

    uniforms.map.value = map
  }
}
