<template>
  <div>
    <a>
      <transition name="el-zoom-in-center">
        <el-autocomplete
          class="inline-input"
          prefix-icon="el-icon-search"
          v-if="$route.matched[2] ? $route.matched[2].path === '/judge': false"
          placeholder="请输入内容"
          :trigger-on-focus="false"
        ></el-autocomplete>
      </transition>
    </a>

    <router-link to="/judge">
      <el-button :class="{'is-active': isActive('/judge')}" plain>法官信息</el-button>
    </router-link>
    <router-link to="/addjudge">
      <el-button :class="{'is-active': isActive('/addjudge')}" plain>
        <i class="el-icon-plus"></i>法官管理
      </el-button>
    </router-link>
    <router-link to="/addteam">
      <el-button :class="{'is-active': isActive('/addteam')}" plain>
        <i class="el-icon-plus"></i>团队管理
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
