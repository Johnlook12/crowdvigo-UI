import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthenticationView from '../views/AuthenticationView.vue'
import LoginForm from '../components/LoginForm/LoginForm.vue'
import RegisterForm from '../components/RegisterForm/RegisterForm.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/auth',
        name: 'authentication',
        component: AuthenticationView,
        meta: {
            hideLayout: true
        },
        children: [ 
            {
                path: 'login',
                name: 'login',
                component: LoginForm
            },
            {
                path: 'register',
                name: 'register',
                component: RegisterForm
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
