<template>
  <el-container>
    <NavMenu></NavMenu>
    <router-view></router-view>
    <el-footer class="centerxy">
      <Footer />
    </el-footer>
  </el-container>
</template>
<script>
import NavMenu from '@/views/NavMenu'
import Footer from '@/views/Footer'
export default {
  name: 'Views',
  components: {
    NavMenu,
    Footer
  }
}
</script>
<style scoped>
@import './views.css';
</style>
