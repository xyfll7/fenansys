<template>
  <div>
    <AFunction>
      <Function />
    </AFunction>
    <AMain>
      <transition name="fade-transform" mode="out-in">
        <keep-alive include="AddJudge">
          <router-view />
        </keep-alive>
      </transition>
    </AMain>
  </div>
</template>
<script>
import AFunction from '@/views/AFunction'
import AMain from '@/views/AMain'
export default {
  name: 'Manage',
  components: {
    AFunction,
    AMain,
    Function: () => import('./Function')
  }
}
</script>
