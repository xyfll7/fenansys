<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">分案中心</el-menu-item>
      <el-menu-item index="2">案件信息</el-menu-item>
      <el-menu-item index="3">管理中心</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'Cneter',
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped>
.el-menu {
  border-bottom: 0px;
}
</style>
