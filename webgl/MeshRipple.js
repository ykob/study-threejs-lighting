import * as THREE from 'three'

import vs from './glsl/MeshRipple.vs'
import fs from './glsl/MeshRipple.fs'

const SIZE = 30

export default class MeshRipple extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneGeometry(SIZE * 100, SIZE * 100)
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
            value: 120,
          },
        },
      ]),
      vertexShader: vs,
      fragmentShader: fs,
      lights: true,
      fog: true,
    })
    material.uniforms.uvTransform.value.scale(SIZE, SIZE)
    material.uniforms.diffuse.value.set(0x00ff66)

    // Create Object3D
    super(geometry, material)
    this.name = 'MeshRipple'
    this.position.y = -25
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
