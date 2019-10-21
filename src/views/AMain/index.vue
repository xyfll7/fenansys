<template>
  <el-card shadow="hover">
    <slot />
  </el-card>
</template>
<script>
export default {
  name: 'AMain'
}
</script>
<style scoped>
.el-card {
  margin: 0 5px 0 5px;
}
</style>
