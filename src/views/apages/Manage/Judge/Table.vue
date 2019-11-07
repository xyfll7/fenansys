<template>
  <el-table
    :row-style="{ background: 'rgba(0, 0, 0, 0)' }"
    :header-row-style="{ background: 'rgba(0, 0, 0, 0)' }"
    :header-cell-style="{ background: 'rgba(0, 0, 0, 0)' }"
    :data="judges"
    :height="height"
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
        <el-tag size="medium">{{ scope.row.teams | teamsFilter }}</el-tag>
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
        <el-button v-if="editIndex+1 !== scope.$index+1 ? true : false" size="mini">编辑</el-button>
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
        >保存</el-button>
        <el-button v-if="editIndex+1 === scope.$index+1 ? true : false" size="mini">取消</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import autoHeight from '@/views/mixins/autoHeight'
export default {
  name: 'Table',
  mixins: [autoHeight],
  data () {
    return {
      subHeight: 197,
      editIndex: undefined
    }
  },
  computed: {
    ...mapGetters(['judges'])
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
    }
  }
}
</script>
<style scoped src="@/views/apages/pages.css">
/** https://www.cnblogs.com/ajaxlu/p/9086651.html */
