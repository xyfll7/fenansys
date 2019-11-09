<template>
  <div class="main">
    <el-table
      :row-style="{ background: 'rgba(0, 0, 0, 0)' }"
      :header-row-style="{ background: 'rgba(0, 0, 0, 0)' }"
      :header-cell-style="{ background: 'rgba(0, 0, 0, 0)' }"
      :data="judges"
      :height="height"
      v-loading="loading"
      style="width: 100%"
    >
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="proportion" label="分案比例"></el-table-column>
      <el-table-column prop="address" label="本轮剩余"></el-table-column>
      <el-table-column prop="address" label="本轮状态"></el-table-column>
      <el-table-column label="本月分案数">
        <template v-slot="scope">
          <p>{{scope.row.teams | numberOfCasesHandledFilter }}</p>
        </template>
      </el-table-column>
      <el-table-column label="所属团队[办案数量]" width="300">
        <template v-slot="scope">
          <el-tag
            :disable-transitions="true"
            size="medium"
            v-if="editIndex +1 !== scope.$index+1"
          >{{ scope.row.teams | teamsFilter }}</el-tag>
          <!-- 编辑团队⬇⬇⬇ -->
          <transition name="el-zoom-in-center">
            <div v-if="editIndex +1 === scope.$index+1">
              <!-- 表单验证 -->
              <el-form :model="{}" :rules="rules" ref="ruleForm">
                <div v-for="(team, index) in storeJudges.teams" :key="index" style="display:flex">
                  <el-tag
                    class="error-message"
                    type="danger"
                    effect="plain"
                    size="medium"
                    closable
                    @close="closeTag(index)"
                    @click="closeTag(index)"
                    v-if="rules[`team${index}`][0].message"
                  >{{ rules[`team${index}`][0].message }}</el-tag>

                  <el-form-item :prop="`team${index}`">
                    <el-input
                      v-model.number="team.numberOfCasesHandled[0]"
                      placeholder="初始办案数量"
                      size="mini"
                      @focus="closeTag(index)"
                    >
                      <el-select
                        v-model="team.name"
                        slot="prepend"
                        placeholder="请选择"
                        width="100px"
                        @visible-change="autoRemoveSelectedTeam"
                        :disabled="isEditable(team.numberOfCasesHandled)"
                      >
                        <el-option
                          v-for="(team,index) in storeTeams"
                          :key="index"
                          :label="team.name"
                          :value="team.name"
                        ></el-option>
                      </el-select>
                    </el-input>
                  </el-form-item>
                  <i style="margin-left:5px">
                    <el-button @click="addTeam" v-if="index === 0" size="mini">添加</el-button>
                    <el-button
                      @click.prevent="removeTeam(index)"
                      v-if="index !== 0"
                      size="mini"
                      :disabled="isEditable(team.numberOfCasesHandled)"
                    >删除</el-button>
                  </i>
                </div>
              </el-form>
            </div>
          </transition>
          <!-- 编辑团队⬆⬆⬆ -->
        </template>
      </el-table-column>
      <el-table-column prop="address" label="请假"></el-table-column>
      <el-table-column prop="address" label="回避"></el-table-column>
      <el-table-column prop="address" label="暂停"></el-table-column>
      <el-table-column prop="address" label="超额"></el-table-column>
      <el-table-column prop="address" align="right" width="150">
        <template v-slot:header>
          <el-popover trigger="hover">
            <p>提示：</p>
            <p>团队中一旦有成员，则禁止编辑或删除团队</p>
            <div slot="reference" class="name-wrapper">
              操作
              <i class="el-icon-question"></i>
            </div>
          </el-popover>
        </template>
        <template v-slot="scope">
          <el-button
            v-if="editIndex+1 !== scope.$index+1 ? true : false"
            size="mini"
            @click="editJudge(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            v-if="editIndex+1 !== scope.$index+1 ? true : false"
            size="mini"
            type="danger"
            @click="_deleteJudge(scope.$index, scope.row)"
          >删除</el-button>
          <el-button
            v-if="editIndex+1 === scope.$index+1 ? true : false"
            type="primary"
            size="mini"
            @click="test"
          >保存</el-button>
          <el-button
            v-if="editIndex+1 === scope.$index+1 ? true : false"
            size="mini"
            @click="cancel"
          >取消</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import autoHeight from '@/views/mixins/autoHeight'
import dcopy from 'deep-copy'
import { team } from '../AddJudge/store'
export default {
  name: 'Table',
  mixins: [autoHeight],
  data () {
    const checkTeam = (rule, value, callback) => {
      const i = parseInt(rule.field.charAt(rule.field.length - 1))
      let isVlidate = true
      let message = ''
      const val = this.storeJudges.teams[i].numberOfCasesHandled[0]
      if (this.storeJudges.teams[i].name === '') {
        message = '团队不能为空'
      }
      if (!(typeof val === 'number' && !isNaN(val))) {
        if (message) message += '\xa0\xa0\xa0\xa0'
        message += '初始办案数量必须为数字'
      }

      if (message) {
        this.rules[rule.field][0].message = message
        this.$forceUpdate() // 当采用特殊方法操作数组后，导致无法更新数据到UI，此时可使用强制渲染
        isVlidate = false
      }
      if (isVlidate) {
        callback()
      }
    }
    return {
      errorMessage: ',',
      loading: true,
      subHeight: 246,
      editIndex: undefined,
      storeJudges: [],
      storeTeams: [],
      rules: {
        team: [{ required: true, validator: checkTeam, message: '' }] // 初始化的验证规则，以供深拷贝
      }
    }
  },
  created () {
    this.storeTeams = [...dcopy(this.teams)] // 在autoRemoveSelectedTeam 中还会刷新这个值
    console.log(this.teams)
  },
  computed: {
    ...mapGetters(['judges', 'teams'])
  },
  watch: {
    judges: { // 刷新页面以后的加载效果，监听judges，如果judges不为空，则结束加载效果
      handler (val) {
        if (val.length) {
          this.loading = false
        }
      },
      immediate: true
    },
    'storeJudges.teams': {
      // 下拉选择框只能添加团队名称，不能添加团队_id，
      // 此处监听团队变化，补充添加团队_id
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
  filters: {
    teamsFilter: function (val) {
      let str = ''
      val.forEach(team => {
        let sum = 0
        team.numberOfCasesHandled.forEach(num => { if (num) { sum += num } })
        str += `${team.name}[${sum}]、`
      })
      return str.substr(0, str.length - 1)
    },
    numberOfCasesHandledFilter (val) {
      let sum = 0
      val.forEach(team => {
        team.numberOfCasesHandled.forEach(num => {
          if (num) {
            sum += num
          }
        })
      })
      return sum
    }
  },
  methods: {
    ...mapActions(['deleteJudge']),
    _deleteJudge (index, row) {
      const judge = row
      this.deleteJudge({ judge, index })
    },
    editJudge (index, row) {
      this.editIndex = index
      // 不能直接编辑vuex,所以点击编辑按钮的时候,拷贝当前行的法官信息,就可以在组件内编辑了。
      this.storeJudges = dcopy(row)
      // 拷贝完法官信息以后，还要根据法官所属团队数量，向团队添加验证器
      this.storeJudges.teams.forEach((_, index) => { this.rules[`team${index}`] = [...dcopy(this.rules.team)] })
    },
    cancel () {
      this.editIndex = undefined
    },
    addTeam () {
      const len = this.storeJudges.teams.length
      // 要将已有法官所属团队添加到团队列表中。
      if (len < 4) {
        this.storeJudges.teams.push(dcopy(team))
        this.rules[`team${len}`] = [...dcopy(this.rules.team)]
      }
    },
    removeTeam (index) {
      // 这里有一个假设，每一个法官都至少属于一个团队，所以第一个团队是无法被删除的，也没有相应的删除按钮
      if (this.storeJudges.teams.length > 1) {
        this.storeJudges.teams.splice(index, 1)
      }
    },
    autoRemoveSelectedTeam () {
      // 这里仅仅是刷新弹窗中选项的数据
      this.storeTeams = this.teams.filter((team) => {
        let isEqual = true
        this.storeJudges.teams.forEach(item => {
          if (item.name === team.name) isEqual = false
        })
        return isEqual
      })
    },
    isEditable (numberOfCasesHandled) {
      // 团队办案数量分12个月，设置了13个月，第0个专门存放初始办案数量
      // 初始办案数量是可以修改的
      // 正常月份的办案数量不可更改（正常月份的办案数量是由案件信息列表自动统计出来的，所以不可更改）
      // 此处是检查正常月份是否已经有办案数量，如果正常月份已经有办案数量则这个团队是不可以被修改的（但是仍然可以编辑初始办案数量）
      // 初始办案数量任何时候都可以编辑
      let sum = 0
      numberOfCasesHandled.forEach((num, index) => {
        if (index !== 0) { // 排除初始办案数量
          sum += num
        }
      })
      if (sum !== 0) {
        return true
      } else {
        return false
      }
    },
    closeTag (index) {
      this.rules[`team${index}`][0].message = ''
      this.$forceUpdate() // 当采用特殊方法操作数组后，导致无法更新数据到UI，此时可使用强制渲染
    },
    test () {

    }
  }
}
</script>
<style scoped src="@/views/apages/pages.css">
/** https://www.cnblogs.com/ajaxlu/p/9086651.html */
</style>
<style scoped>
.main {
  margin: 0 50px 0 50px;
}
.el-select {
  width: 150px;
}
.el-form-item {
  margin-bottom: -7px;
}
/* 团队验证错误提示 */
.error-message {
  position: absolute;
  z-index: 1;
}
</style>
