<template>
  <div>
    <Title title="新增法官" />
    <el-row>
      <el-col :span="12">
        <Avatar />
      </el-col>
      <el-col :span="12">
        <Add />
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'AddJudge',
  components: {
    Title: () => import('../../Title'),
    Avatar: () => import('./Avatar'),
    Add: () => import('./Add')
  }
}
</script>
