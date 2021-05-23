import WebGLContent from '@/webgl'

export default ({}, inject) => {
  inject('webgl', new WebGLContent())
}
