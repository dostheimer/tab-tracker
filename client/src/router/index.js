import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Songs from '@/views/Songs'
import CreateSong from '@/views/CreateSong'
import ViewSong from '@/views/ViewSong'
import EditSong from '@/views/EditSong'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/songs',
    name: 'songs',
    component: Songs
  },
  {
    path: '/songs/create',
    name: 'songs-create',
    component: CreateSong
  },
  {
    path: '/songs/:songId',
    name: 'song',
    component: ViewSong
  },
  {
    path: '/songs/:songId/edit',
    name: 'song-edit',
    component: EditSong
  },
  {
    path: '*',
    redirect: 'songs'
  }
]

const router = new VueRouter({ // eslint-disable-line no-unused-vars
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
