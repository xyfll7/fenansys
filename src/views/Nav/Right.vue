<template>
  <div>
    <el-popover placement="bottom" trigger="hover">
      <p>姓名：{{user.name}}</p>
      <p>职务：{{user.position}}</p>
      <p>联系电话：{{user.tel}}</p>
      <el-avatar slot="reference" :size="35" shape="square" :src="user.avatar || avatar"></el-avatar>
    </el-popover>
    <el-badge :value="0" class="item">
      <i class="el-icon-chat-round"></i>
    </el-badge>
    <div class="logout">
      <i class="el-icon-switch-button"></i>
      <p class="popup">退出登陆</p>
    </div>
    <i class="el-icon-loading" @click="goToLogin"></i>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import { removeToken } from '@/utils/auth'
export default {
  name: 'Right',
  data () {
    return {
      avatar:
        'http://img2.imgtn.bdimg.com/it/u=320178652,790985626&fm=26&gp=0.jpg'
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    goToLogin () {
      removeToken()
    }
  }
}
</script>
<style scoped>
i {
  font-size: 30px;
}
.el-avatar {
  margin-right: 20px;
  margin-top: 3px;
}

.el-icon-switch-button {
  margin: 0 20px 0 20px;
}

/* 退出登陆效果 */
.logout {
  position: relative;
}

.popup {
  display: none;
  position: absolute;
  width: 50px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  margin-top: -3px;
  animation: 2s opacity2 0s infinite;
}

.logout:hover .popup {
  display: block;
}

@keyframes opacity2 {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}
</style>
