import Vue from 'vue'
import Router from 'vue-router'
import FormPage from '@/components/FormPage'
import AdminPage from '@/components/AdminPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FormPage',
      component: FormPage
    },
    {
      path: '/admin',
      name: 'AdminPage',
      component: AdminPage
    }
  ]
})
