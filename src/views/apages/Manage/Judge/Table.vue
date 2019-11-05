<template>
  <el-table :data="judges" :height="height" style="width: 100%">
    <el-table-column prop="name" label="姓名"></el-table-column>
    <el-table-column prop="proportion" label="分案比例"></el-table-column>
    <el-table-column prop="address" label="剩余次数"></el-table-column>
    <el-table-column prop="address" label="本轮状态"></el-table-column>
    <el-table-column prop="address" label="本月分案数"></el-table-column>
    <el-table-column label="所属团队" width="300">
      <template v-slot="scope">
        <el-tag size="medium">{{ scope.row.teams | teamsFilter }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="请假"></el-table-column>
    <el-table-column prop="address" label="回避"></el-table-column>
    <el-table-column prop="address" label="暂停"></el-table-column>
    <el-table-column prop="address" label="超额"></el-table-column>
    <el-table-column prop="address" label></el-table-column>
  </el-table>
</template>
<script>
import { mapGetters } from 'vuex'
import autoHeight from '@/views/mixins/autoHeight'
export default {
  name: 'Table',
  mixins: [autoHeight],
  data () {
    return {
      subHeight: 196
    }
  },
  computed: {
    ...mapGetters(['judges'])
  },
  filters: {
    teamsFilter (val) {
      let str = ''
      val.forEach(team => { str += `${team.name}、` })
      return str.substr(0, str.length - 1)
    }
  }
}
</script>
<style scoped>
</style>
