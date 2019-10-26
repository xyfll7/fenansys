<template>
  <el-menu
    :default-active="$route.matched[1].path"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    router
  >
    <el-menu-item index="/fenan">分案中心</el-menu-item>
    <el-menu-item index="/case">案件信息</el-menu-item>
    <el-menu-item index="/manage">管理中心</el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'Cneter',
  data () {
    return {
      activeIndex: ''
    }
  },

  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped>
.el-menu {
  background: #00000000;
  border-bottom-width: 0px !important;
}

.el-menu-item:hover {
  background: #00000000 !important;
}

.el-menu-item.is-active {
  background: #00000000 !important;
}
</style>
