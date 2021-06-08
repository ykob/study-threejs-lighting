import * as THREE from 'three'
import { Reflector } from 'three/examples/jsm/objects/Reflector.js'
import { Refractor } from 'three/examples/jsm/objects/Refractor.js'

import vs from './glsl/MeshRipple.vs'
import fs from './glsl/MeshRipple.fs'

const SIZE = 6

export default class MeshRipple extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneGeometry(SIZE * 500, SIZE * 500)
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
          textureMatrix: {
            value: new THREE.Matrix4(),
          },
          tReflectionMap: {
            value: null,
          },
          tRefractionMap: {
            value: null,
          },
        },
      ]),
      vertexShader: vs,
      fragmentShader: fs,
      lights: true,
      fog: true,
    })
    material.uniforms.uvTransform.value.scale(SIZE, SIZE)
    material.uniforms.diffuse.value.set(0x001133)

    // Create Object3D
    super(geometry, material)
    this.name = 'MeshRipple'
    this.position.y = -25
    this.rotation.x = (Math.PI / 180) * -90

    const textureWidth = 1024
    const textureHeight = 1024
    const clipBias = 0
    const encoding = THREE.LinearEncoding

    this.reflector = new Reflector(geometry, {
      textureWidth,
      textureHeight,
      clipBias,
      encoding,
    })
    this.refractor = new Refractor(geometry, {
      textureWidth,
      textureHeight,
      clipBias,
      encoding,
    })
    this.reflector.matrixAutoUpdate = false
    this.refractor.matrixAutoUpdate = false
    material.uniforms.tReflectionMap.value = this.reflector.getRenderTarget().texture
    material.uniforms.tRefractionMap.value = this.refractor.getRenderTarget().texture
  }

  start(normalMap) {
    const { uniforms } = this.material

    uniforms.normalMap.value = normalMap
  }

  onBeforeRender(renderer, scene, camera) {
    const { uniforms } = this.material

    // prettier-ignore
    uniforms.textureMatrix.value.set(
      0.5, 0.0, 0.0, 0.5,
      0.0, 0.5, 0.0, 0.5,
      0.0, 0.0, 0.5, 0.5,
      0.0, 0.0, 0.0, 1.0,
    )
    uniforms.textureMatrix.value.multiply(camera.projectionMatrix)
    uniforms.textureMatrix.value.multiply(camera.matrixWorldInverse)
    uniforms.textureMatrix.value.multiply(this.matrixWorld)
    this.visible = false
    this.reflector.matrixWorld.copy(this.matrixWorld)
    this.refractor.matrixWorld.copy(this.matrixWorld)
    this.reflector.onBeforeRender(renderer, scene, camera)
    this.refractor.onBeforeRender(renderer, scene, camera)
    this.visible = true
  }

  update(time) {
    const { uniforms } = this.material

    uniforms.time.value += time
  }
}
