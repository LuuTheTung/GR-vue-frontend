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
    ]
  }
]
