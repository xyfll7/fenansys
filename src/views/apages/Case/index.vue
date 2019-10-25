<template>
  <div>
    <AFunction>
      <Function />
    </AFunction>
    <AMain>
      <p>案件</p>
    </AMain>
  </div>
</template>
<script>
import AFunction from '@/views/AFunction'
import AMain from '@/views/AMain'
export default {
  name: 'Case',
  components: {
    AFunction,
    AMain,
    Function: () => import('./Function')
  }
}
</script>
