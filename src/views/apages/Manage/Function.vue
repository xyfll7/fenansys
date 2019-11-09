<template>
  <div>
    <router-link to="/judge">
      <el-button :class="{'is-active': isActive('/judge')}" :size="functionButtonSize" plain>
        <i class="el-icon-plus"></i>法官管理
      </el-button>
    </router-link>
    <router-link to="/addteam">
      <el-button :class="{'is-active': isActive('/addteam')}" :size="functionButtonSize" plain>
        <i class="el-icon-plus"></i>团队管理
      </el-button>
    </router-link>
  </div>
</template>
<script>
import isActive from '@/views/mixins/isActive'
import { functionButtonSize } from '@/settings'
export default {
  name: 'Function',
  mixins: [isActive],
  data () {
    return {
      functionButtonSize
    }
  }
}
</script>
