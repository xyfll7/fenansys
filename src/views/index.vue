<template>
  <div class="main">
    <el-container>
      <Nav />
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
      <el-footer class="centery" style="height:28px">
        <Footer />
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import Nav from '@/views/Nav'
import Footer from '@/views/Footer'
export default {
  name: 'Views',
  components: {
    Nav,
    Footer
  }
}
</script>
<style scoped>
.main {
  padding: 0 20px 0 20px;
}
</style>
