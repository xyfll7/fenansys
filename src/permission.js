import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

// 我就是测试测试
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
