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
        >新增法官</el-button>
      </el-menu-item>
      <el-menu-item index="/addteam">
        <el-button
          :class="$route.matched[2].path === '/addteam'? 'is-active':''"
          icon="el-icon-plus"
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
.el-menu {
  background: rgba(255, 0, 0, 0);
  border-bottom-width: 0px;
}
.el-menu-item {
  border-bottom-width: 0px;
  margin: 0 5px 0 5px;
  padding: 0px;
}
.el-menu-item:hover {
  background: rgba(255, 0, 0, 0) !important;
}
.el-menu-item.is-active {
  background: rgba(255, 0, 0, 0) !important;
  border-bottom-width: 0px;
}
.is-active {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
</style>
