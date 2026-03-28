import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Login from '../views/login/index.vue'
import Layout from '../layout/index.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { public: true },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/data_board',
    children: [
      {
        path: 'data_board',
        name: 'DataBoard',
        component: () => import('../views/dashboard/index.vue'),
        meta: { title: '平台数据看板', icon: 'DataLine' },
      },
      {
        path: 'boss_consume',
        name: 'BossConsume',
        component: () => import('../views/boss/consume.vue'),
        meta: { title: '老板消费记录', icon: 'ShoppingCart', parent: '老板管理' },
      },
      {
        path: 'boss_list',
        name: 'BossList',
        component: () => import('../views/boss/list.vue'),
        meta: { title: '老板信息管理', icon: 'UserFilled', parent: '老板管理' },
      },
      {
        path: 'boss_recharge',
        name: 'BossRecharge',
        component: () => import('../views/boss/recharge.vue'),
        meta: { title: '老板充值记录', icon: 'Wallet', parent: '老板管理' },
      },
      {
        path: 'boss_type_list',
        name: 'BossTypeList',
        component: () => import('../views/basic/boss-type.vue'),
        meta: { title: '老板类型管理', icon: 'SetUp', parent: '老板管理' },
      },
      {
        path: 'player_board',
        name: 'PlayerBoard',
        component: () => import('../views/dashboard/player-board.vue'),
        meta: { title: '陪玩数据看板', icon: 'TrendCharts', parent: '平台数据看板' },
      },
      {
        path: 'player_list',
        name: 'PlayerList',
        component: () => import('../views/player/list.vue'),
        meta: { title: '陪玩信息管理', icon: 'User', parent: '陪玩管理' },
      },
      {
        path: 'player_order',
        name: 'PlayerOrder',
        component: () => import('../views/order/index.vue'),
        meta: { title: '陪玩派单管理', icon: 'List', parent: '陪玩管理' },
      },
      {
        path: 'player_bill',
        name: 'PlayerBill',
        component: () => import('../views/bill/index.vue'),
        meta: { title: '陪玩报单审核', icon: 'Coin', parent: '陪玩管理' },
      },
      {
        path: 'player_withdraw',
        name: 'PlayerWithdraw',
        component: () => import('../views/withdraw/index.vue'),
        meta: { title: '陪玩提现审核', icon: 'Wallet', parent: '陪玩管理' },
      },
      {
        path: 'game_category',
        name: 'GameCategory',
        component: () => import('../views/basic/game-category.vue'),
        meta: { title: '游戏分类管理', icon: 'Grid', parent: '基础数据' },
      },
      {
        path: 'order_customer',
        name: 'OrderCustomer',
        component: () => import('../views/basic/customer-service.vue'),
        meta: { title: '客服信息管理', icon: 'Service', parent: '基础数据' },
      },
      {
        path: 'role_list',
        name: 'RoleList',
        component: () => import('../views/system/role.vue'),
        meta: { title: '职位权限管理', icon: 'Lock' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (!to.meta.public && !authStore.token) {
    next('/login')
  } else {
    next()
  }
})

export default router
