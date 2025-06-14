import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthenticationView from '../views/AuthenticationView.vue'
import LoginForm from '../components/LoginForm/LoginForm.vue'
import RegisterForm from '../components/RegisterForm/RegisterForm.vue'
import { useAuthStore } from '../store/AuthStore'

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

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if(to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'login' });
  }

    if (to.name === 'login' && auth.isAuthenticated) {
        next({ name: 'home' });
    } else if (to.name === 'register' && auth.isAuthenticated) {
        next({ name: 'home' });
    } else {
        next();
    }

})

export default router
