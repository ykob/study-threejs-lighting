<template lang="pug">
.modal
  .modal__content
    ModalHelp
  .modal__bg
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.modal {
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: z(modal);
  &__content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 24px;
    padding-left: 24px;
  }
  &__bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: auto;
    background-color: rgba(#202, 0.6);
  }
}
</style>
