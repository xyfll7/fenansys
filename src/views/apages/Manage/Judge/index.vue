<template>
  <div>
    <Function />
    <transition name="fade-transform" mode="out-in">
      <keep-alive include="AddJudge">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import Function from './Function'
export default {
  name: 'Judge',
  components: {
    Function
  }
}
</script>
