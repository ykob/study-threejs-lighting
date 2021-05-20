import * as THREE from 'three'

import vs from './glsl/MeshRipple.vs'
import fs from './glsl/MeshRipple.fs'

export default class MeshRipple extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneGeometry(48, 48)
    geometry.computeTangents()

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
    this.name = 'MeshRipple'
    this.rotation.x = (Math.PI / 180) * -90
  }

  start(normalMap) {
    const { uniforms } = this.material

    uniforms.normalMap.value = normalMap
  }

  update(time) {
    const { uniforms } = this.material

    uniforms.time.value += time
  }
}
