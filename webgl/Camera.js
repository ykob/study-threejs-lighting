import * as THREE from 'three'

export default class Camera extends THREE.PerspectiveCamera {
  constructor(fov, aspect, near, far) {
    super(fov, aspect, near, far)

    this.far = 1000
    this.setFocalLength(50)
    this.position.set(0, 0, 100)
    this.lookAt(new THREE.Vector3())
  }

  resize(resolution) {
    this.aspect = resolution.x / resolution.y
    this.updateProjectionMatrix()
  }
}
