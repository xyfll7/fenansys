<template>
  <el-container>
    <Nav />
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
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
