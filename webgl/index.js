import * as THREE from 'three'

import Camera from './Camera'
import TorusKnot from './TorusKnot'
import AmbientLight from './AmbientLight'
import DirectionalLight from './DirectionalLight'

export default class WebGLContent {
  constructor() {
    this.renderer = null
    this.resolution = new THREE.Vector2()
    this.clock = new THREE.Clock({
      autoStart: false,
    })
    this.scene = new THREE.Scene()
    this.camera = new Camera()
    this.torusKnot = new TorusKnot()
    this.ambLight = new AmbientLight()
    this.dirLight = new DirectionalLight()
    this.dirLightHelper = new THREE.DirectionalLightHelper(this.dirLight, 5)
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

    this.scene.add(this.torusKnot)
    this.scene.add(this.ambLight)
    this.scene.add(this.dirLight)
    this.scene.add(this.dirLightHelper)

    this.resize()
    this.clock.start()
  }

  update() {
    this.torusKnot.update()
    this.renderer.render(this.scene, this.camera)
  }

  resize() {
    this.resolution.set(window.innerWidth, window.innerHeight)
    this.camera.resize(this.resolution)
    this.renderer.setSize(this.resolution.x, this.resolution.y)
  }
}
