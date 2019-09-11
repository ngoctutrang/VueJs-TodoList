import App from './App.vue'
import About from './components/marketing/About'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import Register from './components/auth/Register'
import LandingPage from './components/marketing/LandingPage'
import TestTodoVariable from './components/marketing/TestTodoVariable'
const routes =[
    {
        path: '/',
        name: 'home',
        component: LandingPage
    },
    {
        path: '/todos',
        name: 'todos',
        component: App,
        meta:{
            requiresAuth: true,
        }
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        props: true,
        meta:{
            requiresVisistor: true,
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta:{
            requiresVisistor: true,
        }
    },
    {
        path: '/todos/:id',
        name: 'todoitem',
        component: TestTodoVariable
    },
  ]

export default routes