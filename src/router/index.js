import Vue from 'vue'
import Router from 'vue-router'
import ComicList from '@/components/ComicList'
import Main from '@/components/Main'
import ComicDetail from '@/components/ComicDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/comics/:id',
      name: 'ComicList',
      component: ComicList
    },
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/comics/detail/:id',
      name: 'ComicDetail',
      component: ComicDetail
    }
    
  ]
})
