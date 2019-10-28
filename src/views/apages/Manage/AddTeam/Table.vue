<template>
  <el-row type="flex" justify="center">
    <el-col :xs="22" :sm="20" :md="17" :lg="12" :xl="11">
      <el-table
        :row-style="{ background: 'rgba(0, 0, 0, 0)' }"
        :header-row-style="{ background: 'rgba(0, 0, 0, 0)' }"
        :header-cell-style="{ background: 'rgba(0, 0, 0, 0)' }"
        :data="tableData"
        :height="height"
      >
        <el-table-column label="团队名称">
          <template slot-scope="scope">
            <i class="ico icon-tuandui"></i>
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="团队成员">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.member }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.members }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template v-slot:header>
            <i class="el-icon-finished"></i>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
import { getTeam } from '@/store/api/team'
import autoHeight from '@/views/mixins/autoHeight'
export default {
  name: 'Table',
  mixins: [autoHeight],
  data () {
    return {
      tableData: [],
      subHeight: 407
    }
  },
  async created () {
    const res = await getTeam()
    const { data } = res
    this.tableData = data
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>
<style scoped>
.el-table {
  background: rgba(0, 0, 0, 0);
}

.el-table >>> .el-table__header-wrapper .gutter {
  background: rgba(0, 0, 0, 0);
}
.el-table >>> .el-table__body-wrapper::-webkit-scrollbar {
  width: 7px;
}
.el-table >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background: #77777727;
  border-radius: 4px;
}

.el-icon-finished {
  font-size: 20px;
}
</style>
