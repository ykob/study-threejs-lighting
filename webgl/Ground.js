import * as THREE from 'three'

import vs from './glsl/MeshPhong.vs'
import fs from './glsl/MeshPhong.fs'

const SIZE = 30

export default class Ground extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneGeometry(SIZE * 100, SIZE * 100)
    geometry.computeTangents()

    // Define Material
    const uvTransform = new THREE.Matrix3()
    uvTransform.scale(SIZE * 2, SIZE * 2)

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
            value: 120,
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
    this.name = 'Ground'
    this.position.y = -35
    this.rotation.x = (Math.PI / 180) * -90
  }

  start(map, normalMap) {
    const { uniforms } = this.material

    uniforms.map.value = map
    uniforms.normalMap.value = normalMap
  }
}
