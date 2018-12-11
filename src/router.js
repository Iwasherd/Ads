import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/delete/:id',
      name: 'delete',
      component: () => import('./views/Delete.vue')
    },
    {
      path: '/edit',
      name: 'create',
      component: () => import('./views/Edit.vue'),
      children : [
        {
          path: ':id',
          name: 'edit',
          component: () => import('./views/Edit.vue')
        },
      ]
    },

    {
      path: '/:id',
      name: 'Advertisement',
      component: () => import('./views/Advertisement.vue')
    }
  ]
})
