import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { supabase } from '../lib/supabase'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/articles',
            name: 'articles',
            component: () => import('../views/articles/ListView.vue')
        },
        {
            path: '/articles/:slug',
            name: 'article-detail',
            component: () => import('../views/articles/DetailView.vue')
        },
        {
            path: '/admin/login',
            name: 'admin-login',
            component: () => import('../views/admin/Login.vue')
        },
        {
            path: '/admin/dashboard',
            name: 'admin-dashboard',
            component: () => import('../views/admin/Dashboard.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/admin/create',
            name: 'admin-create',
            component: () => import('../views/admin/Editor.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/admin/edit/:id',
            name: 'admin-edit',
            component: () => import('../views/admin/Editor.vue'),
            meta: { requiresAuth: true }
        }
    ],
    scrollBehavior() {
        return { top: 0 }
    }
})

// Navigation Guard
router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            next({ name: 'admin-login' })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
