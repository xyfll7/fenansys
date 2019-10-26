<template>
  <div>
    <AFunction>
      <Function />
    </AFunction>
    <AMain>
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
    </AMain>
  </div>
</template>
<script>
import AFunction from '@/views/AFunction'
import AMain from '@/views/AMain'

export default {
  components: {
    AFunction,
    AMain,
    Function: () => import('./Function.vue')
  }
}
</script>
