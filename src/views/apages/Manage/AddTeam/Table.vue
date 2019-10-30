<template>
  <div>
    <el-table
      :row-style="{ background: 'rgba(0, 0, 0, 0)' }"
      :header-row-style="{ background: 'rgba(0, 0, 0, 0)' }"
      :header-cell-style="{ background: 'rgba(0, 0, 0, 0)' }"
      :data="teams"
      :height="height"
    >
      <el-table-column label="团队名称">
        <template slot-scope="scope">
          <div @dblclick="editTeam(scope.$index, scope.row ,$event)">
            <i v-if="editIndex+1 === scope.$index+1 ? false : true " class="ico icon-tuandui"></i>
            <span
              v-if="editIndex+1 === scope.$index+1 ? false : true "
              style="margin-left: 10px"
            >{{ scope.row.name }}</span>
          </div>
          <el-input
            v-if="editIndex+1 === scope.$index+1 ? true : false "
            size="mini"
            prefix-icon="ico icon-tuandui"
            :placeholder="scope.row.name"
            v-model="text"
            :class="prompt? 'prompt': ''"
            @focus="clearDuplicate"
            @keyup.enter.native="updateTeam(scope.$index, scope.row,$event)"
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
            @click="editTeam(scope.$index, scope.row, $event)"
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
            @click="updateTeam(scope.$index, scope.row, $event)"
          >保存</el-button>
          <el-button
            v-if="editIndex+1 === scope.$index+1 ? true : false "
            size="mini"
            @click="cancel(scope.$index, scope.row)"
          >取消</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import dcopy from 'deep-copy'
import autoHeight from '@/views/mixins/autoHeight'
export default {
  name: 'Table',
  mixins: [autoHeight],
  data () {
    return {
      subHeight: 407, // mixins/autoHeight 自定义参数
      editIndex: undefined,
      prompt: false, // 编辑输入框错误提示（边框颜色改变）
      name: '',
      duplicate: ''
    }
  },
  computed: {
    ...mapGetters(['teams']),
    text: {
      get () {
        if (this.duplicate) { return this.duplicate } else {
          return this.name
        }
      },
      set (value) {
        this.name = value
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.addEventListener('click', this.cancel)
    })
  },
  beforeDestroy () {
    document.removeEventListener('click', this.cancel)
  },
  methods: {
    ...mapActions([
      'team/deleteTeam',
      'team/updateTeam'
    ]),
    editTeam (index, row, event) {
      event.stopPropagation()
      this.editIndex = index
      this.name = ''
    },
    deleteTeam (index, row) {
      const _id = { _id: row._id }
      this['team/deleteTeam']({ _id, index })
    },
    async updateTeam (index, row, event) {
      event.stopPropagation()
      if (this.name === '') {
        this.editIndex = undefined
        return
      }
      if (this.duplicate) return
      const team = dcopy(row)
      team.name = this.name
      try {
        const res = await this['team/updateTeam']({ team, index })
        if (res.data) {
          this.editIndex = undefined
        }
      } catch (err) {
        console.log(err)
        this.prompt = true
        this.duplicate = err.message
      }
    },
    clearDuplicate () {
      this.duplicate = ''
      this.prompt = false
    },
    // 点击输入框以外的区域隐藏输入框
    cancel (e) {
      if (e.target && e.target.className === 'el-input__inner') return
      this.editIndex = undefined
      this.duplicate = ''
      this.prompt = false
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
/**编辑框宽度 */
.el-input {
  width: 200px;
}
/**编辑框错误提示 */
.prompt /deep/ .el-input__inner {
  border-color: red;
}
/**表格行高 */
.el-table /deep/ .el-popover__reference {
  padding: 0px;
  height: 28px;
}
/** 表格滚动条 */
.el-table /deep/ .el-table__header-wrapper .gutter {
  background: rgba(0, 0, 0, 0);
}
.el-table /deep/ .el-table__body-wrapper::-webkit-scrollbar {
  width: 7px;
}
.el-table /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background: #77777727;
  border-radius: 4px;
}
</style>
