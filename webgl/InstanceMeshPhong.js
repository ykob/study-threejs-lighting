import * as THREE from 'three'

import vs from './glsl/InstanceMeshPhong.vs'
import fs from './glsl/MeshPhong.fs'

const COUNT = 3

export default class InstanceMeshPhong extends THREE.InstancedMesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.IcosahedronGeometry(12, 1)

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
    material.uniforms.uvTransform.value.scale(2, 1)

    // Create Object3D
    super(geometry, material, COUNT)
    this.name = 'InstanceMeshPhong'

    const dummy = new THREE.Object3D()
    for (let i = 0; i < COUNT; i++) {
      const alpha = i / COUNT
      dummy.position.set(
        Math.cos(alpha * ((Math.PI / 180) * 360)) * 60,
        -20,
        Math.sin(alpha * ((Math.PI / 180) * 360)) * 60
      )
      dummy.updateMatrix()
      this.setMatrixAt(i, dummy.matrix)
    }
    this.instanceMatrix.needsUpdate = true
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
