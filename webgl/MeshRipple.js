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
          resolution: {
            value: new THREE.Vector2(),
          },
        },
      ]),
      vertexShader: vs,
      fragmentShader: fs,
      lights: true,
      fog: true,
    })
    material.uniforms.uvTransform.value.scale(SIZE / 2, SIZE / 2)
    material.uniforms.diffuse.value.set(0x0099ff)

    // Create Object3D
    super(geometry, material)
    this.name = 'MeshRipple'
    this.position.y = -25
    this.rotation.x = (Math.PI / 180) * -90
  }

  start(map, normalMap) {
    const { uniforms } = this.material

    uniforms.map.value = map
    uniforms.normalMap.value = normalMap
  }

  update(time) {
    const { uniforms } = this.material

    uniforms.time.value += time
  }

  resize(resolution) {
    const { uniforms } = this.material

    uniforms.resolution.value.copy(resolution)
  }
}
