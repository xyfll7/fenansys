<template>
  <div class="bg-image centerxy">
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Login'
}
</script>
<style scoped>
@import '../views.css';
.bg-image {
  background-image: url('../../assets/bgg.jpeg');
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  overflow: hidden;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
</style>
