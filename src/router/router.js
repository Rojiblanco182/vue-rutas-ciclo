import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/pokemon'
    },
    {
        path: '/pokemon',
        name: 'pokemon',
        component: () => import(/* webpackChunkName: "Pokemon Layout" */ '@/modules/pokemon/layouts/PokemonLayout'),
        children: [
            { 
                path: 'home',
                name: 'pokemon-home',
                component: () => import(/* webpackChunkName: "ListPage" */ '@/modules/pokemon/pages/ListPage')
            },
            { 
                path: 'about',
                name: 'pokemon-about',
                component: () => import(/* webpackChunkName: "AboutPage" */ '@/modules/pokemon/pages/AboutPage')
            },
            { 
                path: 'pokemonid/:id',
                component: () => import(/* webpackChunkName: "PokemonPage" */ '@/modules/pokemon/pages/PokemonPage'),
                props: (route) => {
                    const id = Number(route.params.id)
                    return isNaN(id) ? { id: 1 } : { id }
                },
                name:'pokemon-id'
            },
            {
                path: '',
                redirect: { name: "pokemon-home" }
            }
        ]
    },
    {
        path: '/dbz',
        name: 'dbz',
        component: () => import(/* webpackChunkName: "Dragon Ball layout" */ '@/modules/dbz/layouts/DragonBallLayout'),
        children: [
            {
                path: 'characters',
                name: 'dbz-characters',
                component: () => import(/* webpackChunkName: "DBZ Characters" */ '@/modules/dbz/pages/Characters')
            },
            {
                path: 'about',
                name: 'dbz-about',
                component: () => import(/* webpackChunkName: "DBZ About" */ '@/modules/dbz/pages/About')
            },
            {
                path: '',
                redirect: { name: 'dbz-characters' }
            }
        ]
    },
    { 
        path: '/:pathMatch(.*)*',
        component: () => import(/* webpackChunkName: "NotFoundPage" */ '@/modules/shared/pages/NotFoundPage')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


// Synchronous global guard

/* router.beforeEach((to, from, next) => {
    const random = Math.random() * 100

    if (random > 50) {
        console.log('autenticado')
        next()
    } else {
        console.log(random, 'bloqueado por el guard')
        next({ name: 'pokemon-home' })
    }
}) */

// Asynchronous global guard

const canAccess = () => {
    return new Promise(resolve => {
        const random = Math.random() * 100

        if (random > 50) {
            console.log('autenticado-canAccess')
            resolve(true)
        } else {
            console.log(random, 'bloqueado por el guard-canAccess')
            resolve(false)
        }        
    })
}

router.beforeEach(async (to, from, next) => {
    const authorized = await canAccess()
    authorized
        ? next()
        : next({ name: 'pokemon-home' })
})

export default router
