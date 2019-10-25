<template>
  <el-container>
    <Nav />
    <router-view></router-view>
    <el-footer class="centerxy">
      <Footer />
    </el-footer>
  </el-container>
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
@import './views.css';
</style>
