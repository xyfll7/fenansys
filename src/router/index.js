import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import SignIn from '@/views/Login/SignIn'
import SignUp from '@/views/Login/SignUp'

import Dashboard from '@/views/Dashboard'

Vue.use(Router)

// 路由
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      redirect: '/signin',
      children: [
        {
          path: '/signin',
          name: 'signin',
          meta: { title: '登陆' },
          component: SignIn
        },
        {
          path: '/signup',
          name: 'signup',
          meta: { title: '注册' },
          component: SignUp
        }
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { title: '分案系统' },
      component: Dashboard
      // children: [
      //   {},
      // ]
    }
  ]
})
