<template>
  <div class="bg-image centerxy">
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Login'
}
</script>
<style scoped>
.bg-image {
  background-image: url('../../assets/bgg.jpeg');
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  overflow: hidden;
}
</style>
