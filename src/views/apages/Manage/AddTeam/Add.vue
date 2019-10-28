<template>
  <div>
    <p class="graytitle">请填写团队名称</p>
    <div class="div">
      <el-input v-model="input" @focus="onfocus" placeholder="请输入团队名称" />
      <el-button type="primary" @click="addTeam">添加</el-button>
      <br />
      <span :class="prompt">{{ promptText }}</span>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
const promptText = '提示：填写办案团队名称点击添加，即可完成办案团队的添加'
const prompt = 'prompt'
export default {
  name: 'Add',
  data () {
    return {
      input: '',
      promptText,
      prompt
    }
  },
  methods: {
    ...mapActions(['team/addTeam']),
    async addTeam () {
      if (this.input !== '') {
        const team = { name: this.input }
        try {
          await this['team/addTeam'](team)
        } catch (err) {
          this.promptText = err.message
          this.prompt = 'prompt-warn'
        }
      }
    },
    onfocus () {
      this.prompt = prompt
      this.promptText = promptText
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
