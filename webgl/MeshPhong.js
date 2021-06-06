import * as THREE from 'three'

import vs from './glsl/MeshPhong.vs'
import fs from './glsl/MeshPhong.fs'

export default class MeshPhong extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.TorusGeometry(16, 6, 16, 100)
    geometry.computeTangents()

    const material = new THREE.RawShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        THREE.UniformsLib.normalmap,
        THREE.UniformsLib.lights,
        THREE.UniformsLib.fog,
        {
          time: {
            value: 0,
          },
          shininess: {
            value: 100,
          },
        },
      ]),
      vertexShader: vs,
      fragmentShader: fs,
      lights: true,
      fog: true,
    })
    material.uniforms.uvTransform.value.scale(3, 1)

    // Create Object3D
    super(geometry, material)
    this.name = 'MeshPhong'
  }

  start(map, normalMap) {
    const { uniforms } = this.material

    uniforms.map.value = map
    uniforms.normalMap.value = normalMap
  }

  update() {
    this.rotation.y += 0.01
  }
}
