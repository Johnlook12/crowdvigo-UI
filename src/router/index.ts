import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthenticationView from '../views/AuthenticationView.vue'
import PrivateAreaView from '../views/PrivateAreaView.vue'
import LoginForm from '../components/LoginForm/LoginForm.vue'
import RegisterForm from '../components/RegisterForm/RegisterForm.vue'
import { useAuthStore } from '../store/AuthStore'
import ProjectView from '../views/ProjectView.vue'
import ProjectDetail from '../components/ProjectDetail/ProjectDetail.vue'

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
    },
    {
        path: '/private',
        name: 'private',
        component: PrivateAreaView,
        meta: {
            hideLayout: true,
            requiresAuth: true
        },
        children:[
            {
                path: 'opportunities',
                name: 'opportunities',
                component: ProjectView
            },
            {
                path: 'details/:id',
                name: 'project-details',
                component: ProjectDetail,
                props: true
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
