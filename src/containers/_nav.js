export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        badge: {
          color: 'primary',
          text: 'NEW'
        }
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Components']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Base',
        route: '/base',
        icon: 'cil-puzzle',
        items: [

          {
            name: 'Forms',
            to: '/base/forms'
          },

          {
            name: 'Tables',
            to: '/base/tables'
          },

        ]
      },

      {
        _name: 'CSidebarNavItem',
        name: 'Charts',
        to: '/charts',
        icon: 'cil-chart-pie'
      },


      {
        _name: 'CSidebarNavDropdown',
        name: 'Pages',
        route: '/pages',
        icon: 'cil-star',
        items: [
          {
            name: 'Login',
            to: '/pages/login'
          },
          {
            name: 'Register',
            to: '/pages/register'
          },
          {
            name: 'Error 404',
            to: '/pages/404'
          },
          {
            name: 'Error 500',
            to: '/pages/500'
          }
        ]
      },
    ]
  }
]
