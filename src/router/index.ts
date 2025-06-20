import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthenticationView from '../views/AuthenticationView.vue'
import PrivateAreaView from '../views/PrivateAreaView.vue'
import LoginForm from '../components/LoginForm/LoginForm.vue'
import RegisterForm from '../components/RegisterForm/RegisterForm.vue'
import { useAuthStore } from '../store/AuthStore'
import ProjectView from '../views/ProjectView.vue'
import ProjectDetail from '../components/ProjectDetail/ProjectDetail.vue'
import UnauthorizedView from '../views/UnauthorizedView.vue'
import AdministrationView from '../views/AdministrationView.vue'
import MyProjects from '../components/MyProjects/MyProjects.vue'
import AdminPanel from '../components/AdminPanel/AdminPanel.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/unauthorized',
        name: 'unauthorized',
        component: UnauthorizedView,
        meta: {
            hideLayout: true
        }
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
        path: '/administration',
        name: 'administration',
        component: AdministrationView
    },
    {
        path: '/private',
        name: 'private',
        component: PrivateAreaView,
        meta: {
            hideLayout: true,
            requiresAuth: true,
            roles: ['Administrator', 'Employee', 'User']
        },
        children: [
            {
                path: 'opportunities',
                name: 'opportunities',
                component: ProjectView
            },
            {
                path: 'details/:id',
                name: 'project-details',
                component: ProjectDetail,
                props: true,
            },
            {
                path: '/private/my-projects',
                name: 'my-projects',
                component: MyProjects
            },
            {
                path: 'adminpanel',
                name: 'admin-panel',
                component: AdminPanel,
                meta:{
                    requiresAuth: true,
                    roles: ['Employee']
                }
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
    const requiresAuth = to.meta.requiresAuth;
    const requiredRoles = to.meta.roles;
    const userRole = auth.currentUser?.typeUser;

    if (requiresAuth && !auth.isAuthenticated) {
        return next({ name: 'login' });
    }

    if ((to.name === 'login' || to.name === 'register') && auth.isAuthenticated) {
        return next({ name: 'home' });
    }

    if (requiredRoles && requiredRoles.length > 0) {
        if (!userRole || !requiredRoles.includes(userRole)) {
            return next({ name: 'unauthorized' });
        }
    }

    return next();
});

export default router
