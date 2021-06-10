import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import Camera from './Camera'
import MeshLambert from './MeshLambert'
import MeshPhong from './MeshPhong'
import MeshRipple from './MeshRipple'
import AmbientLight from './AmbientLight'
import DirectionalLight from './DirectionalLight'
import PointLight from './PointLight'
import Ground from './Ground'
import Background from './Background'

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
    this.dirLight1 = new DirectionalLight(0xff7777, 0.3)
    this.dirLight1.position.set(-20, 20, 20)
    this.dirLight2 = new DirectionalLight(0x7777ff, 0.3)
    this.dirLight2.position.set(20, 20, 20)
    this.pointLight1 = new PointLight(0xff3333, 0.5, 160)
    this.pointLight1.position.set(-50, 20, 0)
    this.pointLight2 = new PointLight(0x3333ff, 0.5, 160)
    this.pointLight2.position.set(50, 20, 0)
    this.dirLightHelper1 = new THREE.DirectionalLightHelper(this.dirLight1, 5)
    this.dirLightHelper2 = new THREE.DirectionalLightHelper(this.dirLight2, 5)
    this.pointLightHelper1 = new THREE.PointLightHelper(this.pointLight1, 5)
    this.pointLightHelper2 = new THREE.PointLightHelper(this.pointLight2, 5)
    this.ground = new Ground()
    this.background = new Background()

    // Other than three.js
    this.isPlaying = true

    // initialize
    this.renderer.setClearColor(0x000000, 1.0)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.scene.fog = new THREE.Fog(0x000000, 100, 500)
    this.controls.dampingFactor = 0.1
    this.controls.enableDamping = true
    this.controls.saveState()

    document.body.appendChild(canvas)
  }

  async start() {
    let map1
    let map2
    let normalMap1
    let normalMap2
    let normalMap3
    let bgMap

    await Promise.all([
      this.texLoader.loadAsync(
        require('@/assets/img/Alunar_Cliff_basecolor.png')
      ),
      this.texLoader.loadAsync(
        require('@/assets/img/Alunar_Ground_basecolor.jpg')
      ),
      this.texLoader.loadAsync(require('@/assets/img/Alunar_Cliff_normal.jpg')),
      this.texLoader.loadAsync(
        require('@/assets/img/Alunar_Ground_normal.jpg')
      ),
      this.texLoader.loadAsync(require('@/assets/img/Ocean-4-Normal.jpg')),
      this.texLoader.loadAsync(require('@/assets/img/004_nebula_red.jpg')),
    ]).then((response) => {
      map1 = response[0]
      map1.wrapT = map1.wrapS = THREE.RepeatWrapping
      map2 = response[1]
      map2.wrapT = map2.wrapS = THREE.RepeatWrapping
      normalMap1 = response[2]
      normalMap1.wrapT = normalMap1.wrapS = THREE.RepeatWrapping
      normalMap2 = response[3]
      normalMap2.wrapT = normalMap2.wrapS = THREE.RepeatWrapping
      normalMap3 = response[4]
      normalMap3.wrapT = normalMap3.wrapS = THREE.RepeatWrapping
      bgMap = response[5]
      bgMap.wrapT = bgMap.wrapS = THREE.RepeatWrapping
    })
    this.meshLambert.start(normalMap1)
    this.meshPhong.start(map1, normalMap1)
    this.meshRipple.start(normalMap3)
    this.ground.start(map2, normalMap2)
    this.background.start(bgMap)

    this.scene.add(this.meshLambert)
    this.scene.add(this.meshPhong)
    this.scene.add(this.meshRipple)
    this.scene.add(this.ambLight)
    this.scene.add(this.dirLight1)
    this.scene.add(this.dirLightHelper1)
    this.scene.add(this.dirLight2)
    this.scene.add(this.dirLightHelper2)
    this.scene.add(this.pointLight1)
    this.scene.add(this.pointLightHelper1)
    this.scene.add(this.pointLight2)
    this.scene.add(this.pointLightHelper2)
    this.scene.add(this.ground)
    this.scene.add(this.background)

    this.meshLambert.visible = false
    this.meshPhong.visible = true
    this.meshRipple.visible = true
    this.dirLightHelper1.visible = false
    this.dirLightHelper2.visible = false
    this.pointLightHelper1.visible = false
    this.pointLightHelper2.visible = false

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

  toggleHelper() {
    this.dirLightHelper1.visible = !this.dirLightHelper1.visible
    this.dirLightHelper2.visible = !this.dirLightHelper2.visible
    this.pointLightHelper1.visible = !this.pointLightHelper1.visible
    this.pointLightHelper2.visible = !this.pointLightHelper2.visible
  }
}
