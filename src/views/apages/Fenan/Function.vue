<template>
  <div>
    <router-link to="/judge">
      <el-button>随机分案</el-button>
    </router-link>
    <router-link to="/addjudge">
      <el-button>指定分案</el-button>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'Function'
}
</script>
<style scoped src="../pages.css">
/** https://www.cnblogs.com/ajaxlu/p/9086651.html */
