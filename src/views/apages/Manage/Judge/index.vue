<template>
  <div>
    <Table />
  </div>
</template>
<script>
export default {
  name: 'Judge',
  components: {
    Table: () => import('./Table')
  }
}
</script>
