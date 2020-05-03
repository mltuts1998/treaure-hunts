import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Game from '../views/Game.vue'
import Image from '../views/Image.vue'
import Four04 from '../views/Four04.vue'
import Dash from "../views/Dash.vue"
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: Home
  },
   {
    path: '/games',
    component: Game

  },
    {
    path: "/dash",
    component: Dash
  },
  {
    path: '/game/:id',
    component: Image ,
    beforeEnter(to, from, next){
          if(localStorage.getItem("username")){
            if (!localStorage.getItem("id")){
              localStorage.setItem("id", 0)
              localStorage.setItem("time1", )
            }
            next();
          }else{
            next("/")
          }
    }
  },
  {
    path: "*",
    component: Four04
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
