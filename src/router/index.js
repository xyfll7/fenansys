import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    redirect: '/views'
  },
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
    path: '/views',
    name: 'views',
    meta: { title: '首页' },
    component: () => import('@/views'),
    redirect: '/fenansys',
    children: [
      {
        path: '/fenansys',
        name: 'fenansys',
        meta: { title: '分案中心' },
        component: () => import('@/views/apages/FenanSys'),
        redirect: '/random',
        children: [
          {
            path: '/random',
            name: 'random',
            meta: { title: '随机分案' },
            component: () => import('@/views/apages/FenanSys/Random')
          }
        ]
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
