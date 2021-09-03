import * as THREE from 'three'

import vs from './glsl/MeshPhong.vs'
import fs from './glsl/MeshPhong.fs'

export default class Ground extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneGeometry(1000, 1000)

    // Define Material
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
            value: 30,
          },
        },
      ]),
      vertexShader: vs,
      fragmentShader: fs,
      lights: true,
      fog: true,
    })
    material.uniforms.uvTransform.value.scale(10, 10)

    // Create Object3D
    super(geometry, material)
    this.name = 'Ground'
    this.position.y = -40
    this.rotation.x = (Math.PI / 180) * -90
  }

  start(map, normalMap) {
    const { uniforms } = this.material

    uniforms.map.value = map
    uniforms.normalMap.value = normalMap
  }
}
