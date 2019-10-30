<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="法官姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="法官职务" prop="position">
        <el-input v-model="ruleForm.position"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="tel">
        <el-input v-model.number="ruleForm.tel"></el-input>
      </el-form-item>
      <el-form-item label="办公室" prop="office">
        <el-input v-model="ruleForm.office"></el-input>
      </el-form-item>
      <el-form-item label="分案比例" prop="proportion">
        <div style="display:flex">
          <el-input-number v-model.number="ruleForm.proportion" :min="1" :max="10"></el-input-number>
        </div>
      </el-form-item>
      <!-- 办案团队⬇⬇⬇ -->
      <div v-for="(team, index) in ruleForm.teams" :key="index" style="display:flex">
        <el-form-item :label="`办案团队[${index+1}]`" :prop="`name${index}`">
          <el-input v-model.number="team.numberOfCasesHandled[0]" placeholder="初始办案数量">
            <!-- 选择团队⬇⬇⬇ -->
            <el-select
              v-model="team.name"
              slot="prepend"
              @visible-change="autoRemoveSelectedTeam"
              placeholder="请选择办案团队"
            >
              <el-option
                v-for="(team,index) in storeTeams"
                :key="index"
                :label="team.name"
                :value="team.name"
              ></el-option>
            </el-select>

            <!-- 选择团队⬆⬆⬆ -->
          </el-input>
        </el-form-item>
        <i style="margin-left:10px">
          <el-button v-if="index !== 0" @click.prevent="removeTeam(index)">删除</el-button>
          <el-button v-if="index === 0" @click.prevent="addTeam()">添加</el-button>
        </i>
      </div>
      <!-- 办案团队⬆⬆⬆ -->
    </el-form>
    <div class="end">
      <el-button>取消</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
      <el-button @click="submitForm('ruleForm')" type="primary">立即提交</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dcopy from 'deep-copy'
export default {
  name: 'Add',
  data () {
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
    const checkTeamName = (rule, value, callback) => {
      const i = parseInt(rule.field.charAt(rule.field.length - 1))
      let isVlidate = true
      let message = ''
      const val = this.ruleForm.teams[i].numberOfCasesHandled[0]
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
      ruleForm: { name: '', position: '', tel: undefined, office: '', proportion: 1, teams: [{ name: '', numberOfCasesHandled: [] }] },
      rules: {
        name: [{ required: true, message: '请输入法官名称', trigger: 'blur' }, { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
        position: [{ required: true, message: '请输入法官职务', trigger: 'blur' }, { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }],
        tel: [{ required: true, validator: checkTel, trigger: 'blur' }],
        office: [{ required: true, message: '请输入办公室', trigger: 'blur' }],
        proportion: [{ required: true, message: '请输入分案比例' }, { type: 'number', message: '分案比例必须位数字' }],
        name0: [{ required: true, validator: checkTeamName }]
      },
      storeTeams: []
    }
  },
  computed: {
    ...mapGetters(['teams'])
  },
  created () {
    this.storeTeams = dcopy(this.teams)
  },
  methods: {
    addTeam () {
      const len = this.ruleForm.teams.length
      if (len < 4) {
        this.ruleForm.teams.push({ name: '', numberOfCasesHandled: [] })
        this.rules[`name${len}`] = this.rules.name0
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
