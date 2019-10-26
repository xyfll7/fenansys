<template>
  <el-menu class="el-menu-demo" mode="horizontal" router>
    <el-menu-item index="/judge">
      <el-button>法官信息</el-button>
    </el-menu-item>
    <el-menu-item index="/addjudge">
      <el-button size="medium">
        <i class="el-icon-plus"></i>新增法官
      </el-button>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'Function'
}
</script>
<style scoped src="../pages.css">
