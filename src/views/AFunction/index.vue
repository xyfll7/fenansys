<template>
  <div class="centerxy">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'AFunction'
}
</script>
<style scoped>
.centerxy {
  padding: 7px 0 7px 0;
}
.centerxy /deep/ a {
  margin: 0 5px 0 5px;
}
</style>
