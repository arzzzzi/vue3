import Main from '@/pages/Main'
import PostPage from '@/pages/PostPage'
import About from '@/pages/About'
import SinglePostPage from '@/pages/SinglePostPage'
import PostPageWithVuex from '@/pages/PostPageWithVuex'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: SinglePostPage
    },
    {
        path: '/store',
        component: PostPageWithVuex
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router