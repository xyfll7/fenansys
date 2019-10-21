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
@import '../views.css';
.centerxy {
  padding: 5px;
}
</style>
