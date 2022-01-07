import ListPage from '@/modules/pokemon/pages/ListPage'
import AboutPage from '@/modules/pokemon/pages/AboutPage'
import PokemonPage from '@/modules/pokemon/pages/PokemonPage'
import NotFoundPage from '@/modules/shared/pages/NotFoundPage'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: ListPage },
    { path: '/about', component: AboutPage },
    { path: '/id', component: PokemonPage },
    { path: '/:pathMatch(.*)*', component: NotFoundPage }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
