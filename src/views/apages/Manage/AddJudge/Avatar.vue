<template>
  <div class="main">
    <el-form :model="{}" :rules="rules" ref="ruleForm" inline>
      <el-form-item prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="action"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
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
import PubSub from 'pubsub-js'
export default {
  name: 'Avatar',
  data () {
    const checkAvatar = (rule, value, callback) => {
      if (this.avatarURL) {
        callback()
      }
      callback(new Error('法官照片不能为空'))
    }
    return {
      action: `${process.env.VUE_APP_BASE_API}api/v1/avatar/avatar`,
      imageUrl: '',
      rules: {
        avatar: [
          { required: true, validator: checkAvatar }
        ]
      },
      avatarURL: ''
    }
  },
  created () {
    PubSub.subscribe('validate', (msg, avatarURL) => {
      console.log(msg)
      this.avatarURL = avatarURL
      this.validate()
    })
    PubSub.subscribe('resetform', () => {
      this.resetform()
    })
  },
  methods: {
    validate () {
      this.$refs['ruleForm'].validate(() => { })
    },
    resetform () {
      this.$refs['ruleForm'].resetFields()
    },

    handleAvatarSuccess (res, file) {
      this.resetform()
      PubSub.publish('avatar', { avatarURL: res.filename })
      this.imageUrl = URL.createObjectURL(file.raw)
    },

    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'

      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
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
