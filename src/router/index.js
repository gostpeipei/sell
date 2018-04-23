import Vue from 'vue'
import Router from 'vue-router'
import Goods from 'components/content/goods/goods';
import Ratings from 'components/content/ratings/ratings';
import Seller from 'components/content/seller/seller';
import Sellerson from 'components/content/seller/sellerson';

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [{
      path: '/',
      redirect: '/goods'
    },{
      path: '/goods',
      // name: 'Goods',
      component: Goods
    },
    {
      path: '/ratings',
      // name: 'Ratings',
      component: Ratings
    },
    {
      path: '/seller',
      // name: 'Seller',
      component: Seller,
      children: [
        { path: '/seller/aaa', component: Sellerson }
      ]
    },
  ]
})
