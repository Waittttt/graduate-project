import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Attendance from '../views/Attendance'
import ApplyWork from '../views/ApplyWork'
import Login from '../components/Login.vue'

const routes = [
    { path: '/', redirect: '/login' },
    {
        path: '/login',
        component: Login
    }, {
        path: '/home',
        component: Home,
        redirect: '/welcome',
        children: [
            { path: '/welcome', component: Welcome },
            { path: '/attendance', component: Attendance },
            { path: '/applywork', component: ApplyWork }

        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
