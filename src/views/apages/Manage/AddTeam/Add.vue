<template>
  <div>
    <p class="graytitle">请填写团队名称</p>
    <div class="div">
      <el-input v-model="input" placeholder="请输入团队名称" />
      <el-button type="primary" @click="addTeam">添加</el-button>
      <br />
      <span class="prompt">提示：填写办案团队名称点击添加，即可完成办案团队的添加</span>
    </div>
  </div>
</template>
<script>
import { addTeam } from '@/store/api/team'
export default {
  name: 'Add',
  data () {
    return {
      input: ''
    }
  },
  methods: {
    addTeam () {
      if (this.input !== '') {
        addTeam({ name: this.input })
      }
    }
  }
}
</script>
<style scoped>
p {
  margin: 10px 0 25px 0;
}

.div {
  display: inline-block;
  margin-bottom: 45px;
}
.el-input {
  width: 450px;
  margin: 0 10px 0 0;
}
.el-button {
  width: 130px;
}
</style>
