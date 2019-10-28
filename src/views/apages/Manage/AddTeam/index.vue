<template>
  <div>
    <Title title="团队管理" />
    <Add />
    <Table />
  </div>
</template>
<script>
export default {
  name: 'AddTeam',
  components: {
    Title: () => import('../../Title'),
    Add: () => import('./Add'),
    Table: () => import('./Table')
  }
}
</script>
