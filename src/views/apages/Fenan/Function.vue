<template>
  <div>
    <router-link to="/judge">
      <el-button
        :class="{'is-active': isActive('/judge')}"
        :size="functionButtonSize"
        :round="round"
        plain
      >随机分案</el-button>
    </router-link>
    <router-link to="/addjudge">
      <el-button
        :class="{'is-active': isActive('/addjudge')}"
        :size="functionButtonSize"
        :round="round"
        plain
      >指定分案</el-button>
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
      functionButtonSize,
      round: true
    }
  }
}
</script>
<style >
