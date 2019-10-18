import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

// 测试一键部署到服务器
// 再次测试一键部署到服务器
// 我只是想测试一下啊

router.beforeEach(async (to, from, next) => {
  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
    }
  }
})
