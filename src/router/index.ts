import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import BridgeView from '@/views/BridgeView.vue'
import UploadView from '@/views/UploadView.vue'
import DownLoadView from '@/views/DownLoadView.vue'
import AccountView from '@/views/AccountView.vue'
import LoginView from '@/views/LoginCheckView.vue'
import BridgeSeoulView from '@/views/BridgeSeoulView.vue'
import AppDownLoad from '@/views/AppDownLoad.vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/',
    name: 'bridge',
    component: BridgeView
  },
  {
    path: '/upload',
    name: 'upload',
    component: UploadView
  },
  {
    path: '/download',
    name: 'download',
    component: DownLoadView
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/seoul',
    name: 'bridgeSeoul',
    component: BridgeSeoulView
  },
  {
    path: '/appdown',
    name: 'appDownload',
    component: AppDownLoad
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
