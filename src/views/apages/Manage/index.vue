<template>
  <div>
    <AFunction>
      <Function />
    </AFunction>
    <AMain>
      <transition name="fade-transform" mode="out-in">
        <keep-alive include="Judge">
          <router-view />
        </keep-alive>
      </transition>
    </AMain>
  </div>
</template>
<script>
import AFunction from '@/views/AFunction'
import AMain from '@/views/AMain'
import { mapActions } from 'vuex'
export default {
  name: 'Manage',
  components: {
    AFunction,
    AMain,
    Function: () => import('./Function')
  },
  created () {
    this.getTeams()
    this.getJudges()
  },
  methods: {
    ...mapActions(['getTeams', 'getJudges'])
  }
}
</script>
