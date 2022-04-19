import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'

const routes = [
    { path: '/', redirect: '/login' },
    {
        path: '/login',
        component: Login
    }, {
        path: '/home',
        component: Home
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
