import Register from './views/Register.vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Saves from './views/Saves.vue'
import Game from './views/Game.vue'
import Scoreboard from './views/Scoreboard.vue'
import End from './views/End.vue'
//import About from './views/About.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta:{
            requiresVisitor: true,
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta:{
            requiresVisitor: true,
        }
    },
    {
        path: '/scoreboard',
        name: 'scoreboard',
        component: Scoreboard,
        meta:{
            requiresAuth: true,
        }
    },
    {
        path: '/saves',
        name: 'saves',
        component: Saves,
        meta:{
            requiresAuth: true,
        }
    },
    {
        path: '/game',
        name: 'game',
        component: Game,
        meta:{
            requiresAuth: true,
        }
    },
    {
        path: '/game/end',
        name: 'end',
        component: End,
        meta:{
            requiresAuth: true,
        }
    },

/*
	{
		path: '/about',
		name: 'about',
		component: About,      
	},
	*/

	
]

export default routes