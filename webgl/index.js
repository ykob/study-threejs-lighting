import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import Camera from './Camera'
import MeshLambert from './MeshLambert'
import MeshPhong from './MeshPhong'
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
    this.meshLambert = new MeshLambert()
    this.meshPhong = new MeshPhong()
    this.ambLight = new AmbientLight()
    this.dirLight1 = new DirectionalLight()
    this.dirLight1.position.set(-20, 20, 20)
    this.dirLight2 = new DirectionalLight(0x0000ff)
    this.dirLight2.position.set(20, 20, 20)
    this.dirLightHelper1 = new THREE.DirectionalLightHelper(this.dirLight1, 5)
    this.dirLightHelper2 = new THREE.DirectionalLightHelper(this.dirLight2, 5)
    this.controls = null
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

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.dampingFactor = 0.1
    this.controls.enableDamping = true
    this.controls.enablePan = false
    this.controls.enableZoom = false

    this.scene.add(this.meshLambert)
    this.scene.add(this.meshPhong)
    this.scene.add(this.ambLight)
    this.scene.add(this.dirLight1)
    this.scene.add(this.dirLightHelper1)
    this.scene.add(this.dirLight2)
    this.scene.add(this.dirLightHelper2)

    this.meshLambert.visible = false

    this.resize()
    this.clock.start()
  }

  update() {
    this.meshLambert.update()
    this.meshPhong.update()
    this.renderer.render(this.scene, this.camera)
    this.controls.update()
  }

  resize() {
    this.resolution.set(window.innerWidth, window.innerHeight)
    this.camera.resize(this.resolution)
    this.renderer.setSize(this.resolution.x, this.resolution.y)
  }
}
