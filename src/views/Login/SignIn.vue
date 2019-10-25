<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <p>登陆</p>
      <br />
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item prop="email">
          <el-input
            v-model.number="ruleForm.email"
            placeholder="请输入邮箱账号"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="请输入密码"
            prefix-icon="el-icon-key"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width:100%"
            :loading="loading"
            type="primary"
            @click="submitForm('ruleForm')"
          >登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'SignIn',
  data() {
    var checkEmail = (rule, value, callback) => {
      if (this.email) {
        callback(new Error(this.emailMessage))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (this.password) {
        callback(new Error(this.passwordMessage))
      }
      callback()
    }
    return {
      ruleForm: {
        email: 'l.7@qq.com',
        password: 'yangqi77'
      },
      rules: {
        email: [{ validator: checkEmail, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }]
      },
      loading: false,
      redirect: '/views',
      email: false, // 点击登陆按钮后，服务器验证email账号不存在
      password: false, // 点击登陆按钮后，服务器验证password错误
      emailMessage: '',
      passwordMessage: ''
    }
  },
  methods: {
    ...mapActions(['user/login']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 向服务器提交账号密码
          this.loading = true
          const { email, password } = this.ruleForm
          this['user/login']({ email, password })
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(response => {
              if (response.errors) {
                // 点击登陆按钮后，服务器验证email账号不合法
                if (response.errors.email) {
                  this.email = true
                  this.emailMessage = response.errors.email
                  this.$refs[formName].validate(() => {})
                  this.email = false
                }
                // 点击登陆按钮后，服务器验证password长度不对
                if (response.errors.password) {
                  this.password = true
                  this.passwordMessage = response.errors.password
                  this.$refs[formName].validate(() => {})
                  this.password = false
                }
              }
              // 点击登陆按钮后，服务器验证email账号不存在
              if (response.email) {
                this.email = true
                this.emailMessage = response.email
                this.$refs[formName].validate(() => {})
                this.email = false
              }
              // 点击登陆按钮后，服务器验证password错误
              if (response.password) {
                this.password = true
                this.passwordMessage = response.password
                this.$refs[formName].validate(() => {})
                this.password = false
              }
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
@import './index.css';
</style>
