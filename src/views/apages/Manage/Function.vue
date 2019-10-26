<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="/judge">
        <el-button :class="$route.matched[2].path === '/judge'? 'is-active':''">法官信息</el-button>
      </el-menu-item>
      <el-menu-item index="/addjudge">
        <el-button
          :class="$route.matched[2].path === '/addjudge'? 'is-active':''"
          icon="el-icon-plus"
          size="medium"
        >新增法官</el-button>
      </el-menu-item>
      <el-menu-item index="/addteam">
        <el-button
          :class="$route.matched[2].path === '/addteam'? 'is-active':''"
          icon="el-icon-plus"
          size="medium"
        >新增团队</el-button>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'Function'
}
</script>
<style scoped>
@import '../pages.css';
</style>
