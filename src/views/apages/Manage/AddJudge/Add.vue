<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="法官姓名" prop="name">
        <el-input v-model="ruleForm.name" @focus="clear" :disabled="success"></el-input>
      </el-form-item>
      <el-form-item label="法官职务" prop="position">
        <el-input v-model="ruleForm.position" :disabled="success"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="tel">
        <el-input v-model.number="ruleForm.tel" :disabled="success"></el-input>
      </el-form-item>
      <el-form-item label="办公室" prop="office">
        <el-input v-model="ruleForm.office" :disabled="success"></el-input>
      </el-form-item>
      <el-form-item label="分案比例" prop="proportion">
        <div style="display:flex">
          <el-input-number
            v-model.number="ruleForm.proportion"
            :disabled="success"
            :min="1"
            :max="10"
          ></el-input-number>
        </div>
      </el-form-item>
      <!-- 办案团队⬇⬇⬇ -->
      <div v-for="(team, index) in ruleForm.teams" :key="index" style="display:flex">
        <el-form-item :label="`办案团队[${index+1}]`" :prop="`team${index}`">
          <el-input
            v-model.number="team.numberOfCasesHandled[new Date().getMonth()]"
            placeholder="初始办案数量"
            :disabled="success"
          >
            <!-- 选择团队⬇⬇⬇ -->
            <el-select
              v-model="team.name"
              slot="prepend"
              @visible-change="autoRemoveSelectedTeam"
              placeholder="请选择办案团队"
              :disabled="success"
            >
              <el-option
                v-for="team in storeTeams"
                :key="team._id"
                :label="team.name"
                :value="team.name"
              ></el-option>
            </el-select>
            <!-- 选择团队⬆⬆⬆ -->
          </el-input>
        </el-form-item>
        <i style="margin-left:10px">
          <el-button v-if="index !== 0" @click.prevent="removeTeam(index)">删除</el-button>
          <el-button v-if="index === 0" @click.prevent="addTeam()" :disabled="success">添加</el-button>
        </i>
      </div>
      <!-- 办案团队⬆⬆⬆ -->
    </el-form>
    <div class="end">
      <el-button v-if="success" type="success">✨法官添加成功✨</el-button>
      <el-button v-if="success" type="success" @click="resetForm('ruleForm')" plain>继续添加</el-button>
      <el-button plain>返回法官信息列表</el-button>
      <el-button v-if="!success" type="warning" @click="resetForm('ruleForm')" plain>重置表单</el-button>
      <el-button v-if="!success" type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import dcopy from 'deep-copy'
import { Bus, ADDJUDGE } from '@/utils/bus'
const team = { _id: '', name: '', numberOfCasesHandled: [null, null, null, null, null, null, null, null, null, null, null, null] }
export default {
  name: 'Add',
  data () {
    const checkName = (rule, value, callback) => {
      console.log(!this.nameError)
      if (this.nameError) {
        callback(new Error(this.nameError))
      }
      if (!value) {
        callback(new Error('法官姓名必须填写'))
      }
      if (value.length < 2 || value.length > 8) {
        callback(new Error('法官姓名长度至少2个字符，最大8个字符'))
      }
      callback()
    }
    const checkTel = (rule, value, callback) => {
      const tel = value ? value.toString() : 0
      if (tel.length !== 11) {
        callback(new Error('电话号码长度有误'))
      } else {
        if (this.ruleForm.tel === '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const checkTeam = (rule, value, callback) => {
      const i = parseInt(rule.field.charAt(rule.field.length - 1))
      let isVlidate = true
      let message = ''
      const val = this.ruleForm.teams[i].numberOfCasesHandled[new Date().getMonth()]
      if (this.ruleForm.teams[i].name === '') {
        message = '团队不能为空'
      }
      if (!(typeof val === 'number' && !isNaN(val))) {
        if (message) message += '\xa0\xa0\xa0\xa0'
        message += ' 初始办案数量必须填写且必须为数字值'
      }

      if (message) {
        callback(new Error(message))
        isVlidate = false
      }
      if (isVlidate) {
        callback()
      }
    }
    return {
      success: false,
      nameError: '',
      storeTeams: [],
      ruleForm: {
        name: '闰土',
        position: '渔民',
        tel: undefined || 19978663462,
        office: '渔村',
        proportion: 1,
        teams: [dcopy(team)],
        avatar: '994'
      },
      rules: {
        name: [{ required: true, validator: checkName, trigger: 'blur' }],
        position: [{ required: true, message: '请输入法官职务', trigger: 'blur' }, { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }],
        tel: [{ required: true, validator: checkTel, trigger: 'blur' }],
        office: [{ required: true, message: '请输入办公室', trigger: 'blur' }],
        proportion: [{ required: true, message: '请输入分案比例' }, { type: 'number', message: '分案比例必须位数字' }],
        team0: [{ required: true, validator: checkTeam }]
      }
    }
  },
  computed: {
    ...mapGetters(['teams'])
  },
  created () {
    this.storeTeams = dcopy(this.teams)
    Bus.$on(ADDJUDGE.AVATAR, ({ avatarURL }) => {
      console.log('SS', avatarURL)
      this.ruleForm.avatar = avatarURL
    })
  },
  watch: {
    'ruleForm.teams': {
      handler: function (val) {
        val.forEach((item, index) => {
          const res = this.storeTeams.filter(team => item.name === team.name)
          if (res[0]) {
            item._id = res[0]._id
          }
        })
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['judge/addJudge']),
    addTeam () {
      const len = this.ruleForm.teams.length
      if (len < 4) {
        this.ruleForm.teams.push(dcopy(team))
        this.rules[`team${len}`] = this.rules.team0
      }
    },
    removeTeam (index) {
      if (this.ruleForm.teams.length > 1) {
        this.ruleForm.teams.splice(index, 1)
      }
    },
    autoRemoveSelectedTeam () {
      this.storeTeams = this.teams.filter((team) => {
        let isEqual = true
        this.ruleForm.teams.forEach(item => {
          if (item.name === team.name) isEqual = false
        })
        return isEqual
      })
    },
    submitForm (formName) {
      // 清空姓名错误信息
      this.nameError = ''
      // 调用Avatar.vue 的 validate 方法验证头是否填写正确。
      Bus.$emit(ADDJUDGE.VALIDATE, this.ruleForm.avatar)
      this.$refs[formName].validate(async valid => {
        if (valid && this.ruleForm.avatar) {
          try {
            await this['judge/addJudge'](this.ruleForm)
            this.success = true
            Bus.$emit(ADDJUDGE.SUCCESS)
          } catch (err) {
            this.nameError = err.message
            this.$refs[formName].validate(() => { })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      // 调用Avatar.vue中的 resetform 方法
      Bus.$emit(ADDJUDGE.RESETFORM)
      this.success = false
      this.ruleForm.teams = [dcopy(team)]
      this.ruleForm.avatar = ''
      this.$refs[formName].resetFields()
    },
    clear () {
      this.nameError = ''
    }
  }
}
</script>
<style scoped>
.el-select {
  width: 190px;
}
.end {
  margin-top: 30px;
}
</style>
