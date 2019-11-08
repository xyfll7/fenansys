<template>
  <el-card shadow="hover" :style="{ height: height+'px' }">
    <slot />
  </el-card>
</template>
<script>
import autoHeight from '@/views/mixins/autoHeight'
export default {
  name: 'AMain',
  mixins: [autoHeight],
  data () {
    return {
      subHeight: 146
    }
  }
}
</script>
<style scoped>
.el-card {
  /* background: #3d76b8db; */
  background: #ffffffdb;
  overflow: auto;
}
.el-card::-webkit-scrollbar {
  display: none;
}
</style>
