<template>
  <el-container>
    <el-header>
      <NavMenu></NavMenu>
    </el-header>
    <router-view></router-view>
    <el-footer>
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
