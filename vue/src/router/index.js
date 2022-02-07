import { createRouter, createWebHistory } from "vue-router"
import Dashboard from "../views/Dashboard.vue"
import Register from "../views/Register.vue"
import Login from "../views/Login.vue"
import Survey from "../views/Survey.vue"
import DefaultLayout from '../components/DefaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'
import store from "../store"
const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        name: 'Dashboard',
        component: DefaultLayout,
        meta: { requiresAuth: true },
        children: [
            { path: '/dashboard', name: 'Dashboard', component: Dashboard },
            { path: '/survey', name: 'Survey', component: Survey }
        ],


    },
    {
        path: '/auth',
        redirectTo: '/auth',
        name: 'Auth',
        component: AuthLayout,
        meta: { isGuest: true },
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            },

        ]
    },


];
const router = createRouter({
    history: createWebHistory(),
    routes

})
router.beforeEach((to, from, next) =>
{
    // if user try to get to this route(Dashboard) and does not have token redirect to login
    //otherwise redirect to  the next
    //isGuest
    /** 
    if (to.meta.requiresAuth && !store.state.user.token)
    {
        next({ name: "Login" })
    } else if (store.state.user.token && (to.name === "Login" || to.name === "Register"))
    {
        next({ name: "Dashboard" })
    } else
    {
        next()
    }*/
    if (to.meta.requiresAuth && !store.state.user.token)
    {
        next({ name: "Login" })
    } else if (store.state.user.token && (to.meta.isGuest))
    {
        next({ name: "Dashboard" })
    } else
    {
        next()
    }

});


export default router;