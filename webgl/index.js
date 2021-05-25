import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import Camera from './Camera'
import MeshLambert from './MeshLambert'
import MeshPhong from './MeshPhong'
import MeshRipple from './MeshRipple'
import AmbientLight from './AmbientLight'
import DirectionalLight from './DirectionalLight'

const canvas = document.createElement('canvas')
canvas.setAttribute('id', 'canvas-webgl')

export default class WebGLContent {
  constructor() {
    // basics three.js instances
    this.renderer = new THREE.WebGL1Renderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    this.resolution = new THREE.Vector2()
    this.clock = new THREE.Clock({
      autoStart: false,
    })
    this.scene = new THREE.Scene()
    this.camera = new Camera()
    this.texLoader = new THREE.TextureLoader()
    this.controls = new OrbitControls(this.camera, canvas)

    // meshes and lights
    this.meshLambert = new MeshLambert()
    this.meshPhong = new MeshPhong()
    this.meshRipple = new MeshRipple()
    this.ambLight = new AmbientLight()
    this.dirLight1 = new DirectionalLight()
    this.dirLight1.position.set(-20, 20, 20)
    this.dirLight2 = new DirectionalLight(0x0000ff)
    this.dirLight2.position.set(20, 20, 20)
    this.dirLightHelper1 = new THREE.DirectionalLightHelper(this.dirLight1, 5)
    this.dirLightHelper2 = new THREE.DirectionalLightHelper(this.dirLight2, 5)

    // Other than three.js
    this.isPlaying = true

    // initialize
    this.renderer.setClearColor(0x000000, 1.0)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.scene.fog = new THREE.Fog(0x000000, 150, 300)
    this.controls.dampingFactor = 0.1
    this.controls.enableDamping = true
    this.controls.enablePan = false
    this.controls.saveState()

    document.body.appendChild(canvas)
  }

  async start() {
    let normalMap1
    let normalMap2

    await Promise.all([
      this.texLoader.loadAsync(require('@/assets/img/normal.jpg')),
      this.texLoader.loadAsync(require('@/assets/img/Ocean-4-Normal.jpg')),
    ]).then((response) => {
      normalMap1 = response[0]
      normalMap1.wrapT = normalMap1.wrapS = THREE.RepeatWrapping
      normalMap2 = response[1]
      normalMap2.wrapT = normalMap2.wrapS = THREE.RepeatWrapping
    })
    this.meshLambert.start(normalMap1)
    this.meshPhong.start(normalMap1)
    this.meshRipple.start(normalMap2)

    this.scene.add(this.meshLambert)
    this.scene.add(this.meshPhong)
    this.scene.add(this.meshRipple)
    this.scene.add(this.ambLight)
    this.scene.add(this.dirLight1)
    this.scene.add(this.dirLightHelper1)
    this.scene.add(this.dirLight2)
    this.scene.add(this.dirLightHelper2)

    this.meshLambert.visible = false
    this.meshPhong.visible = true
    this.meshRipple.visible = true

    this.resize()
    this.clock.start()
  }

  update() {
    const time = this.clock.running === true ? this.clock.getDelta() : 0

    if (this.isPlaying) {
      this.meshLambert.update()
      this.meshPhong.update()
      this.meshRipple.update(time)
    }
    this.renderer.render(this.scene, this.camera)
    this.controls.update()
  }

  resize() {
    this.resolution.set(window.innerWidth, window.innerHeight)
    this.camera.resize(this.resolution)
    this.renderer.setSize(this.resolution.x, this.resolution.y)
  }

  playPause(bool) {
    this.isPlaying = bool
  }

  resetControls() {
    this.controls.reset()
  }
}
