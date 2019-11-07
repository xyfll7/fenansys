<template>
  <div class="main">
    <el-form :model="{}" :rules="rules" ref="ruleForm" inline>
      <el-form-item prop="avatar">
        <el-upload
          :class="{'avatar-uploader':'avatar-uploader', disabled: success? 'disabled':''}"
          :action="action"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :disabled="success"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <p class="p">法官照片</p>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Bus, ADDJUDGE } from '@/utils/bus'
import { store, mutations } from './store'
export default {
  name: 'Avatar',
  data () {
    const checkAvatar = (rule, value, callback) => {
      if (this.avatarUrl) {
        callback()
      }
      callback(new Error(this.message))
    }
    return {
      success: false,
      action: `${process.env.VUE_APP_BASE_API}api/v1/avatar/avatar`,
      imageUrl: '',
      rules: {
        avatar: [
          { required: true, validator: checkAvatar }
        ]
      },
      message: ''
    }
  },
  computed: {
    avatarUrl () {
      return store.avatarUrl
    }
  },

  created () {
    Bus.$on(ADDJUDGE.VALIDATE, () => {
      this.validate()
    })
    Bus.$on(ADDJUDGE.RESETFORM, () => {
      this.resetform()
      this.success = false
      this.imageUrl = ''
    })
    Bus.$on(ADDJUDGE.SUCCESS, () => {
      this.success = true
    })
  },
  methods: {
    setAvatar: mutations.setAvatar,
    validate () {
      this.message = '法官照片不能为空'
      this.$refs['ruleForm'].validate(() => { })
    },
    resetform () {
      this.$refs['ruleForm'].resetFields()
    },

    handleAvatarSuccess (res, file) {
      this.resetform()
      console.log(res.filename)
      Bus.$emit(ADDJUDGE.AVATAR, { avatarURL: res.filename })
      this.setAvatar(res.filename)
      console.log('bbbb', store.avatarUrl)
      this.imageUrl = URL.createObjectURL(file.raw)
    },

    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'

      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.message = '上传头像图片只能是 JPG 格式!'
        this.$refs['ruleForm'].validate(() => { })
      }

      if (!isLt2M) {
        this.message = '上传头像图片大小不能超过 2MB!'
        this.$refs['ruleForm'].validate(() => { })
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style>
.main {
  display: flex;
  justify-content: flex-end;
}

.p {
  display: flex;
  justify-content: center;
  width: 16px;
  margin-top: 15px;
  margin-right: 10px;
}

.disabled .el-upload {
  background: #f5f7fa;
  opacity: 0.4;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  cursor: not-allowed !important;
  overflow: hidden;
  width: 221px;
  height: 310px;
  justify-content: center;
  flex-direction: column;
  margin-right: 10px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  width: 221px;
  height: 310px;
  justify-content: center;
  flex-direction: column;
  margin-right: 10px;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #409eff;
  width: 221px;
  height: 310px;
  line-height: 310px;
  text-align: center;
}

.avatar {
  width: 221px;
  height: 310px;
  display: block;
  object-fit: cover;
}
</style>
