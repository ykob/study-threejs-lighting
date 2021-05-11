import * as THREE from 'three'

import Camera from './Camera'
import Mesh from './Mesh'

export default class WebGLContent {
  constructor() {
    this.renderer = null
    this.resolution = new THREE.Vector2()
    this.clock = new THREE.Clock({
      autoStart: false,
    })
    this.scene = new THREE.Scene()
    this.camera = new Camera()
    this.mesh = new Mesh()
  }

  start() {
    const canvas = document.getElementById('canvas-webgl')

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    this.renderer.setClearColor(0x000000, 1.0)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

    this.scene.add(this.mesh)

    this.resize()
    this.clock.start()
  }

  update() {
    this.renderer.render(this.scene, this.camera)
  }

  resize() {
    this.resolution.set(window.innerWidth, window.innerHeight)
    this.camera.resize(this.resolution)
    this.renderer.setSize(this.resolution.x, this.resolution.y)
  }
}
