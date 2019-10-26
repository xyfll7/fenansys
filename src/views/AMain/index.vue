<template>
  <el-card shadow="hover" :style="{ height: tableHeight+'px' }">
    <div class="div">
      <slot />
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'AMain',
  data () {
    return {
      tableHeight: '0',
      screenHeight: window.innerHeight
    }
  },

  created () {
    this.tableHeight = window.innerHeight - 183
    window.onresize = () => {
      return (() => {
        this.screenHeight = window.innerHeight
      })()
    }
  },
  watch: {
    screenHeight (val) {
      this.screenHeight = val
      this.tableHeight = this.screenHeight - 183
    }
  }
}
</script>
<style scoped>
.el-card {
  background: #ffffffbd;
  overflow: auto;
}
.el-card::-webkit-scrollbar {
  display: none;
}
</style>
