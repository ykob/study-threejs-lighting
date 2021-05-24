import * as THREE from 'three'

import vs from './glsl/MeshPhong.vs'
import fs from './glsl/MeshPhong.fs'

export default class MeshPhong extends THREE.Mesh {
  constructor() {
    // Define Geometry
    // const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16)
    const geometry = new THREE.TorusGeometry(16, 6, 16, 100)
    geometry.computeTangents()

    // Define Material
    const uvTransform = new THREE.Matrix3()
    uvTransform.scale(2, 1)

    const material = new THREE.RawShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.normalmap,
        THREE.UniformsLib.lights,
        THREE.UniformsLib.fog,
        {
          time: {
            value: 0,
          },
          shininess: {
            value: 30,
          },
          uvTransform: {
            value: uvTransform,
          },
        },
      ]),
      vertexShader: vs,
      fragmentShader: fs,
      lights: true,
      fog: true,
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
