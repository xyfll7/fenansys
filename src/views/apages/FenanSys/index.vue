<template>
  <div>
    <p>aaa</p>
    <AFunction>
      <Function />
    </AFunction>
    <AMain>
      <router-view />
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
