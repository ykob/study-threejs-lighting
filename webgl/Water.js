import * as THREE from 'three'
import { Reflector } from 'three/examples/jsm/objects/Reflector.js'
import { Refractor } from 'three/examples/jsm/objects/Refractor.js'

import vs from './glsl/Water.vs'
import fs from './glsl/Water.fs'

export default class Water extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneGeometry(1000, 1000)
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
          reflectivity: {
            value: 0.05,
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
          resolution: {
            value: new THREE.Vector2(),
          },
          tDepth1: {
            value: null,
          },
          tDepth2: {
            value: null,
          },
          cameraNear: {
            value: 0.1,
          },
          cameraFar: {
            value: 1000,
          },
        },
      ]),
      vertexShader: vs,
      fragmentShader: fs,
      lights: true,
      fog: true,
    })
    material.uniforms.uvTransform.value.scale(5, 5)
    material.uniforms.diffuse.value.set(0x440044)

    // Create Object3D
    super(geometry, material)
    this.name = 'MeshRipple'
    this.position.y = -25
    this.rotation.x = (Math.PI / 180) * -90

    const textureWidth = 1024
    const textureHeight = 1024
    const clipBias = 0
    const encoding = THREE.LinearEncoding

    // Define Reflector and Refractor
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

  start(normalMap, tDepth1, tDepth2) {
    const { uniforms } = this.material

    uniforms.normalMap.value = normalMap
    uniforms.tDepth1.value = tDepth1
    uniforms.tDepth2.value = tDepth2
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

  resize(resolution) {
    const { uniforms } = this.material

    uniforms.resolution.value.copy(resolution)
  }
}
