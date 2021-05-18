import * as THREE from 'three'

import vs from './glsl/MeshPhong.vs'
import fs from './glsl/MeshPhong.fs'

export default class MeshPhong extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.TorusGeometry(16, 6, 16, 100)

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.lights,
        {
          time: {
            value: 0,
          },
          shininess: {
            value: 30,
          },
          normalMap: {
            value: null,
          },
        },
      ]),
      vertexShader: vs,
      fragmentShader: fs,
      lights: true,
    })

    // Create Object3D
    super(geometry, material)
    this.name = 'MeshPhong'
  }

  start(normalMap) {
    const { uniforms } = this.material

    uniforms.normalMap.value = normalMap
  }

  update() {
    this.rotation.y += 0.01
  }
}
