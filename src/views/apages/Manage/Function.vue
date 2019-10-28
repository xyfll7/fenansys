<template>
  <el-menu class="el-menu-demo" mode="horizontal" router>
    <el-menu-item index="/judge">
      <el-button :class="$route.matched[2].path === '/judge'? 'is-active':''">法官信息</el-button>
    </el-menu-item>
    <el-menu-item index="/addjudge">
      <el-button :class="$route.matched[2].path === '/addjudge'? 'is-active':''" size="medium">
        <i class="el-icon-plus"></i>法官管理
      </el-button>
    </el-menu-item>
    <el-menu-item index="/addteam">
      <el-button :class="$route.matched[2].path === '/addteam'? 'is-active':''" size="medium">
        <i class="el-icon-plus"></i>团队管理
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
