import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
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
    component: Layout,
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
    component: Layout,
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

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/sysManage',
    component: Layout,
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
    component: Layout,
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
    component: Layout,
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
    component: Layout,
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
    component: Layout,
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
    component: Layout,
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
    component: Layout,
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
  },
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
