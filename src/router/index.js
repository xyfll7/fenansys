import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// debug https://www.cnblogs.com/rever/p/11577322.html
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    redirect: '/signin',
    children: [
      {
        path: '/signin',
        name: 'signin',
        meta: { title: '登陆' },
        component: () => import('@/views/Login/SignIn')
      },
      {
        path: '/signup',
        name: 'signup',
        meta: { title: '注册' },
        component: () => import('@/views/Login/SignUp')
      }
    ]
  },
  {
    path: '/',
    redirect: '/views'
  },
  {
    path: '/views',
    name: 'views',
    meta: { title: '首页' },
    component: () => import('@/views'),
    redirect: '/fenan',
    children: [
      {
        path: '/fenan',
        name: 'fenan',
        meta: { title: '分案中心' },
        component: () => import('@/views/apages/Fenan'),
        redirect: '/random',
        children: [
          {
            path: '/random',
            name: 'random',
            meta: { title: '随机分案' },
            component: () => import('@/views/apages/Fenan/Random')
          }
        ]
      },
      {
        path: '/case',
        name: 'case',
        meta: { title: '案件中心' },
        component: () => import('@/views/apages/Case')
      },
      {
        path: '/manage',
        name: 'manage',
        meta: { title: '管理中心' },
        component: () => import('@/views/apages/Manage')
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roules
 */

export const asyncRoutes = []

const createRouter = () =>
  new Router({
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
