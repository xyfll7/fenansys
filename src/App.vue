<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      isRouterAlive: true
    }
  },
  provide () {
    return {
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: #e1f0ff5f;
  padding: 0 20px 0 20px;
}
* {
  margin: 0px;
  padding: 0px;
}
/** https://www.cnblogs.com/sun-rain/p/5789417.html */
::-webkit-scrollbar {
  /* 滚动条整体部分 */
  width: 0px;
}

/** position */
.centerx {
  display: flex;
  justify-content: center;
}

.centery {
  display: flex;
  align-items: center;
}

.centerxy {
  display: flex;
  justify-content: center;
  align-items: center;
}

.end {
  justify-content: flex-end;
}
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
