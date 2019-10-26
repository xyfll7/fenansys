<template>
  <p>{{title}}</p>
</template>
<script>
export default {
  name: 'Title',
  props: {
    title: {
      type: String,
      default: '均衡分案系统'
    }
  }
}
</script>
<style scoped>
p {
  font-size: 25px;
  height: 51px;
}
</style>
