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
body {
  background-color: #e1f0ff5f;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  margin: 0px;
  padding: 0px;
}

/** 隐藏滚动条 */
/** https://www.cnblogs.com/sun-rain/p/5789417.html */
body::-webkit-scrollbar {
  display: none;
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

/** 文字颜色 */
.graytitle {
  color: #606266;
}
.prompt {
  color: #40a0ffb6;
  font-size: 14px;
  float: left;
  margin-left: 3px;
}
.prompt-warn {
  color: #f56c6c;
  font-size: 14px;
  float: left;
  margin-left: 3px;
}
</style>
