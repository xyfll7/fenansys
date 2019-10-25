<template>
  <div>
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
  name: 'Manage',
  components: {
    AFunction,
    AMain,
    Function: () => import('./Function')
  }
}
</script>
