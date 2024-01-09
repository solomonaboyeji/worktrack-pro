/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },

  {
    icon: 'PagesIcon',
    name: 'Skills',
    routes: [
      // submenu
      {
        path: '/app/admin/new-skill',
        name: 'New Skills',
      },
      {
        path: '/app/admin/skills',
        name: 'List Skills',
      }
    ],
  },
  {
    icon: 'PagesIcon',
    name: 'Tasks',
    routes: [
      // submenu
      {
        path: '/app/admin/new-task',
        name: 'New Task',
      },
      {
        path: '/app/admin/tasks',
        name: 'List Tasks',
      }
    ],
  },
  {
    icon: 'PagesIcon',
    name: 'Staffs',
    routes: [
      // submenu
      {
        path: '/app/admin/staffs',
        name: 'List Staffs',
      }
    ],
  },
  {
    path: '/app/forms',
    icon: 'FormsIcon',
    name: 'Forms',
  },
  {
    path: '/app/cards',
    icon: 'CardsIcon',
    name: 'Cards',
  },
  {
    path: '/app/charts',
    icon: 'ChartsIcon',
    name: 'Charts',
  },
  {
    path: '/app/buttons',
    icon: 'ButtonsIcon',
    name: 'Buttons',
  },
  {
    path: '/app/modals',
    icon: 'ModalsIcon',
    name: 'Modals',
  },
  {
    path: '/app/tables',
    icon: 'TablesIcon',
    name: 'Tables',
  },
  {
    icon: 'PagesIcon',
    name: 'Pages',
    routes: [
      // submenu
      {
        path: '/login',
        name: 'Login',
      },
      {
        path: '/create-account',
        name: 'Create account',
      },
      {
        path: '/forgot-password',
        name: 'Forgot password',
      },
      {
        path: '/app/404',
        name: '404',
      },
      {
        path: '/app/blank',
        name: 'Blank',
      },
    ],
  },
]

export default routes
