import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [{
      path: '/categories/create',
      name: 'CategoryEdit',
      component: CategoryEdit
    },
    {
      path: '/categories/list',
      name: 'CategoryList',
      component: CategoryList
    },
    {
      path: '/categories/edit/:id',
      name: 'CategoryEdit',
      component: CategoryEdit,
      // props: true 表示把任何url参数，比如id注入到CategoryEdit页面，在CategoryEdit页面可以直接使用变量id，通过props接收
      props: true
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
