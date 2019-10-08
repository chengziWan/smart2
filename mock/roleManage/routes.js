// Just a mock data

export const constantRoutes = [
{
    path: '/redirect',
    component: 'layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: 'layout/Layout',
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: 'layout/Layout',
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

export const asyncRoutes = [
{
    path: '/sysManage',
    component: 'layout/Layout',
    redirect: '/sysManage/page',
    alwaysShow: true, // will always show the root menu
    name: '系统管理',
    meta: {
      title: '系统管理',
      icon: 'lock',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      //add by wcc 20190919--菜单管理
      {
        path: 'menuManage',
        component: () => import('@/views/sysManage/menuManage'),
        name: '菜单管理',
        meta: {
          title: '菜单管理',
          roles: ['admin']
        }
      },
      //add by wcc 20190919--角色管理
      {
        path: 'roleManage',
        component: () => import('@/views/sysManage/roleManage'),
        name: '角色管理',
        meta: {
          title: '角色管理',
          roles: ['admin']
        }
      },
      //add by wcc 20190919--账户管理
      {
        path: 'userManage',
        component: () => import('@/views/sysManage/userManage'),
        name: '账户管理',
        meta: {
          title: '账户管理',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/business',
    component: 'layout/Layout',
    //redirect: '/dataReport/page',
    alwaysShow: true, // will always show the root menu
    name: '业务配置',
    meta: {
      title: '业务配置',
      icon: 'component',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      //add by wcc 20190919--银行组织机构
      {
        path: 'bankManage',
        component: () => import('@/views/business/bankManage'),
        name: '银行组织机构',
        meta: {
          title: '银行组织机构',
          roles: ['admin'] // you can set roles in root nav
        }
      },
      //add by wcc 20190919--业务类型设置
      {
        path: 'settleTypeManage',
        component: () => import('@/views/business/settleTypeManage'),
        name: '业务类型设置',
        meta: {
          title: '业务类型设置',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/dataReport',
    component: 'layout/Layout',
    //redirect: '/dataReport/page',
    alwaysShow: true, // will always show the root menu
    name: 'dataReportAll',
    meta: {
      title: '数据上报',
      icon: 'list',
      roles: ['admin','editor'] // you can set roles in root nav
    },
    children: [
      //add by wcc 20190919--数据上传
      {
        path: 'dataUpload',
        component: () => import('@/views/dataReport/dataUpload'),
        name: '数据上传',
        meta: {
          title: '数据上传',
          roles: ['admin', 'editor']// you can set roles in root nav
        }
      },
      // {
      //   path: 'dataSelect',
      //   component: () => import('@/views/dataReport/dataSelect'),
      //   name: '数据查看',
      //   meta: {
      //     title: '数据查看',
      //     roles: ['admin', 'editor'] // you can set roles in root nav
      //   }
      // },
      //add by wcc 20190919--数据上报
      {
        path: 'dataReport',
        component: () => import('@/views/dataReport/dataReport'),
        name: 'dataReport',
        meta: {
          title: '数据上报',
          roles: ['admin', 'editor']// you can set roles in root nav
        }
      }
    ]
  },
  {
    path: '/dataView',
    component: 'layout/Layout',
    //redirect: '/dataReport/page',
    alwaysShow: true, // will always show the root menu
    name: 'dataView',
    meta: {
      title: '数据查询',
      icon: 'eye-open',
      roles: ['admin','editor'] // you can set roles in root nav
    },
    children: [
     {
       path: 'dataSelect',
       component: () => import('@/views/dataView/dataSelect'),
       name: 'dataSelect',
       meta: { title: '原始数据查看',
               roles: ['admin', 'editor']// you can set roles in root nav
             }
     },
      {
        path: 'dataAuditView',
        component: () => import('@/views/dataView/dataAuditView'),
        name: 'dataAuditView',
        meta: {
          title: '审计结果查看',
          roles: ['admin', 'editor']// you can set roles in root nav
        }
      }
    ]
  },
  //add by wcc 20190919--数据审计
  {
    path: '/dataAudit',
    component: 'layout/Layout',
    children: [
      {
        path: 'dataAudit',
        component: () => import('@/views/dataAudit/dataAudit'),
        name: '数据审计',
        meta: { title: '数据审计', icon: 'excel',
                roles: ['admin'],// you can set roles in root nav
              }
      }
    ]
  },
  {
    path: '/dataSave',
    component: 'layout/Layout',
    children: [
      {
        path: 'dataSave',
        component: () => import('@/views/dataSave/dataSave'),
        name: '数据归档',
        meta: { title: '数据归档', icon: 'documentation',
                roles: ['admin'],// you can set roles in root nav
              }
      }
    ]
  },
  {
    path: '/logView',
    component: 'layout/Layout',
    children: [
      {
        path: 'logView',
        component: () => import('@/views/logManage/logView'),
        name: '日志查询',
        meta: { title: '日志查询', icon: 'nested',
                roles: ['admin'],// you can set roles in root nav
              }
      }
    ]
  }
]
