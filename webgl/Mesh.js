import * as THREE from 'three'

import vs from './glsl/Mesh.vs'
import fs from './glsl/Mesh.fs'

export default class Mesh extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16)

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          value: 0,
        },
      },
      vertexShader: vs,
      fragmentShader: fs,
    })

    // Create Object3D
    super(geometry, material)
    this.name = 'Mesh'
  }
}
