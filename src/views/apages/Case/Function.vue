<template>
  <div>
    <router-link to="/judge">
      <el-button>法官信息</el-button>
    </router-link>
    <router-link to="/addjudge">
      <el-button>
        <i class="el-icon-plus"></i>新增法官
      </el-button>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'Function'
}
</script>
<style scoped src="../pages.css">
