import * as THREE from 'three'

import vs from './glsl/MeshPhong.vs'
import fs from './glsl/MeshPhong.fs'

export default class MeshPhong extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16)

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

  update() {
    this.rotation.y += 0.01
  }
}
