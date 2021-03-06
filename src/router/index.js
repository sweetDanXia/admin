import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

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
    },
    {
      path: '/items/create',
      name: 'ItemEdit',
      component: ItemEdit
    },
    {
      path: '/items/list',
      name: 'ItemEdit',
      component: ItemList
    },
    {
      path: '/items/edit/:id',
      name: 'ItemEdit',
      component: ItemEdit,
      props: true
    },
    {
      path: '/heroes/create',
      name: 'HeroEdit',
      component: HeroEdit
    },
    {
      path: '/heroes/list',
      name: 'HeroEdit',
      component: HeroList
    },
    {
      path: '/heroes/edit/:id',
      name: 'HeroEdit',
      component: HeroEdit,
      props: true
    },
    {
      path: '/articles/create',
      name: 'ArticleEdit',
      component: ArticleEdit
    },
    {
      path: '/articles/list',
      name: 'ArticleEdit',
      component: ArticleList
    },
    {
      path: '/articles/edit/:id',
      name: 'ArticleEdit',
      component: ArticleEdit,
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
