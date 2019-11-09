<template>
  <div class="centerxy">
    <div class="main">
      <transition name="el-zoom-in-center">
        <a v-if="isActive('/table')">
          <el-autocomplete
            prefix-icon="el-icon-search"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            :size="functionButtonSize"
            :round="round"
          ></el-autocomplete>
        </a>
      </transition>
      <router-link to="/table">
        <el-button
          :class="{'is-active': isActive('/table')}"
          :size="functionButtonSize"
          :round="round"
          plain
        >
          <i class="el-icon-plus"></i>法官信息
        </el-button>
      </router-link>
      <router-link to="/addjudge">
        <el-button
          :class="{'is-active': isActive('/addjudge')}"
          :size="functionButtonSize"
          :round="round"
          plain
        >
          <i class="el-icon-plus"></i>新增法官
        </el-button>
      </router-link>
    </div>
  </div>
</template>
<script>
import isActive from '@/views/mixins/isActive'
// import { functionButtonSize } from '@/settings'
export default {
  name: 'Function',
  mixins: [isActive],
  data () {
    return {
      functionButtonSize: 'small',
      round: true
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
.el-autocomplete /deep/ .el-input__inner {
  border-radius: 20px;
}
</style>
