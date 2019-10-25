import { asyncRoutes, constantRoutes, routerMode } from '@/router'
import { validatenull } from '@/utils/validate'
// for get menus from server
import { getMenuByRole } from '@/api/menuManage'
/* Layout */
import Layout from '@/layout'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
    routers: [],
    addRouters: []
  }
const mutations = {
    SET_ROUTERS: (state, routers) => {
      state.addRoutes = routers
      state.routes = constantRoutes.concat(routers)
    }
  }
const actions = {
    generateRoutes({ commit }, roles) {
      // default routerMode is local
      if (routerMode === 'local') {
        return new Promise(resolve => {
          let accessedRouters
          if (roles.includes('admin')) {
            accessedRouters = asyncRoutes
          } else {
            accessedRouters = filterAsyncRouter(asyncRoutes, roles)
          }
          commit('SET_ROUTERS', accessedRouters)
          // return for add to router
          resolve(accessedRouters)
        })
      } else {
        return new Promise((resolve, reject) => {

          getMenuByRole({'role' : roles.join(',')}).then(response => {// 将数组转换为字符串
            if (!response.data) {
              reject('GenerateRoutesFromServer failed, please try later again.')
            }

            const menus = response.data

            if (menus.length === 0) {
              reject('menus data is null')
            }
            const accessedRouters = buildRouter(menus)

            // final add 404
            accessedRouters.push({ path: '*', redirect: '/404', hidden: true })
            // commit to stores
            commit('SET_ROUTERS', accessedRouters)
            // return for add to router
            resolve(accessedRouters)
          })
        })
      }
    }
  }

/** ************************************
 * build Router by menu api
 * add 20190213
***************************************/
function buildRouter(aMenu) {
  const aRouter = []
  aMenu.forEach(item => {
    if (!validatenull(item.component)) {
      const oRouter = {
        meta: { 'title': '', 'icon': '' },
        children: []
      }

      if (item.component === 'Layout') {
        oRouter.component = Layout
      } else {
        oRouter.component = require('@/views/' + item.component + '.vue').default
      }

      oRouter.path = item.path
      oRouter.name = item.name
      oRouter.id = item.id || null
      oRouter.redirect = item.redirect || null
      oRouter.meta.icon = item.icon
      oRouter.meta.title = item.title
      oRouter.meta.noCache = item.noCache || false
      oRouter.meta.breadcrumb = item.breadcrumb || true
      oRouter.children = validatenull(item.children) ? [] : buildRouter(item.children)
      aRouter.push(oRouter)
    }
  })

  return aRouter
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
