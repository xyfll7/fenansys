<template>
  <el-row type="flex" justify="center">
    <el-col :xs="22" :sm="20" :md="17" :lg="12" :xl="11">
      <el-table
        :row-style="{ background: 'rgba(0, 0, 0, 0)' }"
        :header-row-style="{ background: 'rgba(0, 0, 0, 0)' }"
        :header-cell-style="{ background: 'rgba(0, 0, 0, 0)' }"
        :data="teams"
        :height="height"
      >
        <el-table-column label="团队名称">
          <template slot-scope="scope">
            <i v-if="editIndex+1 === scope.$index+1 ? false : true " class="ico icon-tuandui"></i>
            <span
              v-if="editIndex+1 === scope.$index+1 ? false : true "
              style="margin-left: 10px"
            >{{ scope.row.name }}</span>
            <el-input
              v-if="editIndex+1 === scope.$index+1 ? true : false "
              size="mini"
              prefix-icon="ico icon-tuandui"
              :placeholder="scope.row.name"
              v-model="name"
            ></el-input>
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
            <el-button
              v-if="editIndex+1 === scope.$index+1 ? false : true "
              size="mini"
              @click="editTeam(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              v-if="editIndex+1 === scope.$index+1 ? false : true "
              size="mini"
              type="danger"
              @click="deleteTeam(scope.$index, scope.row)"
            >删除</el-button>
            <el-button
              v-if="editIndex+1 === scope.$index+1 ? true : false "
              size="mini"
              type="primary"
              @click="updateTeam(scope.$index, scope.row)"
            >保存</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import autoHeight from '@/views/mixins/autoHeight'
export default {
  name: 'Table',
  mixins: [autoHeight],
  data () {
    return {
      subHeight: 407, // mixins-autoHeight 自定义参数
      editIndex: undefined,
      name: ''
    }
  },
  computed: {
    ...mapGetters(['teams'])
  },
  async created () {
    this['team/getTeams']()
  },

  methods: {
    ...mapActions([
      'team/getTeams',
      'team/deleteTeam',
      'team/updateTeam'
    ]),
    editTeam (index, row) {
      this.editIndex = index
    },
    deleteTeam (index, row) {
      const _id = { _id: row._id }
      this['team/deleteTeam']({ _id, index })
    },
    async updateTeam (index, row) {
      if (this.name === '') return
      const team = row
      team.name = this.name
      try {
        const res = await this['team/updateTeam']({ team, index })
        if (res.data) {
          this.editIndex = undefined
        }
      } catch { }
    }
  }
}
</script>
<style scoped>
/** 表头图标 */
.el-icon-finished {
  font-size: 20px;
}
/** 表格 */
.el-table {
  background: rgba(0, 0, 0, 0);
}
.el-input {
  width: 200px;
}

/** 表格滚动条 */
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
</style>
