<template>
  <div class="centerxy">
    <div class="main">
      <a>
        <el-autocomplete
          class="inline-input"
          prefix-icon="el-icon-search"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          :size="functionButtonSize"
        ></el-autocomplete>
      </a>
      <router-link to="/table">
        <el-button :class="{'is-active': isActive('/table')}" :size="functionButtonSize" plain>
          <i class="el-icon-plus"></i>法官信息
        </el-button>
      </router-link>
      <router-link to="/addjudge">
        <el-button :class="{'is-active': isActive('/addjudge')}" :size="functionButtonSize" plain>
          <i class="el-icon-plus"></i>新增法官
        </el-button>
      </router-link>
    </div>
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
  },
  methods: {
    isActive (path) {
      return this.$route.matched[3] ? this.$route.matched[3].path === path : false
    }
  }
}
</script>
<style scoped>
a {
  margin: 0 5px 0 5px;
}
.main {
  padding-bottom: 20px;
}
</style>
