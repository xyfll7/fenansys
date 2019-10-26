<template>
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
      <el-input-number v-model.number="ruleForm.proportion" :min="1" :max="10"></el-input-number>
    </el-form-item>
    <!-- 办案团队⬇⬇⬇ -->
    <div v-for="(team, index) in ruleForm.team" :key="index" style="display:flex">
      <el-form-item :label="`办案团队[${index+1}]`" :prop="'name'+index">
        <el-input v-model.number="team.numberOfCasesHandled[0]">
          <!-- 选择团队⬇⬇⬇ -->
          <el-select
            v-model="team.name"
            slot="prepend"
            @visible-change="autoRemoveSelectedTeam"
            placeholder="请选择办案团队"
          >
            <el-option
              v-for="(storeTeam,index) in storeTeams"
              :key="index"
              :label="storeTeam.name"
              :value="storeTeam.name"
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
</template>

<script>
export default {
  name: 'Add',
  data () {
    let checkTel = (rule, value, callback) => {
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
    let checkName = (rule, value, callback) => {
      callback()
    }
    return {
      ruleForm: { name: '', position: '', tel: undefined, office: '', proportion: 1, team: [{ name: '', numberOfCasesHandled: [0] }] },
      rules: {
        name: [{ required: true, message: '请输入法官名称', trigger: 'blur' }, { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
        position: [{ required: true, message: '请输入法官职务', trigger: 'blur' }, { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }],
        tel: [{ required: true, validator: checkTel, trigger: 'blur' }],
        office: [{ required: true, message: '请输入办公室', trigger: 'blur' }],
        proportion: [{ required: true, message: '请输入分案比例' }, { type: 'number', message: '分案比例必须位数字' }],
        team: [{ required: true, message: '请输入办案团队', trigger: 'blur' }, { type: 'array', message: '办案团队不能为空', trigger: 'blur' }],
        name0: [{ required: true, validator: checkName }]
      },
      storeTeams: []
    }
  },
  methods: {
    addTeam () {
      const len = this.ruleForm.team.length
      if (len < 4) {
        this.ruleForm.team.push(this.ruleForm.team[0])
        this.rules[`name${len}`] = this.rules.name0
      }
    },
    removeTeam (index) {
      if (this.ruleForm.team.length > 1) {
        this.ruleForm.team.splice(index, 1)
      }
    },
    autoRemoveSelectedTeam () {
      this.storeTeams = this.teams.filter((team) => {
        let isEqual = true
        this.ruleForm.team.forEach(item => {
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
