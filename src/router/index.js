import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Charts = () => import('@/views/charts/Charts')

// Views - Components
const Forms = () => import('@/views/base/Forms')
const Tables = () => import('@/views/base/Tables')
const Category = () => import('@/views/base/category')
const Catalog = () => import('@/views/base/Catalog')
const Bill = () => import('@/views/base/Bill')
const GuestInvoice = () => import('@/views/base/GuestInvoice')
// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/pages/login',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },

        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'category',
          name: 'Category',
          component: Category
        },
        {
          path: 'tables',
          name: 'Tables',
          component: Tables
        },
        {
          path: 'catalog',
          name: 'Catalog',
          component: Catalog
        },
        {
          path: 'bill',
          name: 'Bill',
          component: Bill
        },
        {
          path: 'guest-invoice',
          name: 'guest-invoice',
          component: GuestInvoice
        },
        {
          path: 'forms',
          name: 'Forms',
          component: Forms
        },
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        }
      ]
    }
  ]
}

