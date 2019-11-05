<template>
  <div>
    <router-link to="/judge">
      <el-button :class="{'is-active': isActive('/judge')}" plain>随机分案</el-button>
    </router-link>
    <router-link to="/addjudge">
      <el-button :class="{'is-active': isActive('/addjudge')}" plain>指定分案</el-button>
    </router-link>
  </div>
</template>
<script>
import isActive from '@/views/mixins/isActive'
export default {
  name: 'Function',
  mixins: [isActive]
}
</script>
<style >
