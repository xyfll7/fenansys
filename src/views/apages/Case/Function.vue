<template>
  <div>
    <router-link to="/judge">
      <el-button :class="{'is-active': isActive('/judge')}" plain>法官信息</el-button>
    </router-link>
    <router-link to="/addjudge">
      <el-button :class="{'is-active': isActive('/judge')}" plain>
        <i class="el-icon-plus"></i>新增法官
      </el-button>
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
