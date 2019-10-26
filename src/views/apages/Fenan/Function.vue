<template>
  <el-menu class="el-menu-demo" mode="horizontal" router>
    <el-menu-item index="/judge">
      <el-button>随机分案</el-button>
    </el-menu-item>
    <el-menu-item index="/addjudge">
      <el-button>指定分案</el-button>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'Function'
}
</script>
<style scoped src="../pages.css">
/** https://www.cnblogs.com/ajaxlu/p/9086651.html */
