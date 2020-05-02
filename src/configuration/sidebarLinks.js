/* eslint-disable */
export default [
  /*
{
  name: 'sidebar.profile',
  icon: 'ti-user',
  path: '/gedosin/profile'
},*/
  {
    name: 'sidebar.dashboard',
    icon: 'ti-panel',
    path: '/dashboard'
  },
  {
    name: 'sidebar.management',
    icon: 'ti-package',
    collapsed: false,
    children: [{
      name: 'sidebar.claims',
      path: '/claims',
      fa_icon: 'bolt'
    },
      {
        name: 'sidebar.map',
        path: '/claim-map',
        fa_icon: 'map'
      },
      {
        name: 'sidebar.surveys',
        path: '/surveys',
        fa_icon: 'calendar'
      },
      {
        name: 'sidebar.documents',
        path: '/documents',
        fa_icon: 'file-pdf'
      },
      /*
    {
      name: 'sidebar.history',
      path: '/gedosin/management/history'
    },*/
    ]
  },
  {
    name: 'sidebar.administration',
    icon: 'ti-package',
    collapsed: false,
    children: [{
      name: 'sidebar.users',
      path: '/gedosin/administration/users',
      fa_icon: 'user'
    },
      {
        name: 'sidebar.supervisor',
        path: '/gedosin/administration/supervisor',
        fa_icon: 'user'
      }/*,
      {
        name:  'sidebar.import',
        path: '/gedosin/administration/excelimport'
      },
      {
        name:  'sidebar.roles',
        path: '/gedosin/administration/roles'
      }*/
    ]
  }
  /*
  {
    name: 'Administration',
    icon: 'ti-clipboard',
    collapsed: false,
    children: [{
      name: 'Users',
      path: '/forms/regular'
    },
    {
      name: 'Excel import',
      path: '/forms/validation'
    }
    ]
  }*/

]
