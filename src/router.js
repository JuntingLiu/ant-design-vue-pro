/**
 * 路由
 * @Author: Junting.liu
 * @Date: 2019-05-11 11:12:47
 * @Last Modified by: Junting.liu
 * @Last Modified time: 2019-05-11 12:57:25
 */

import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from "./views/404";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/user/login"
    },
    {
      path: "/user",
      hideInMenu: true,
      // component: { render: h => h("router-view") }, // 通过 render 函数，省略单独写一个组件
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/UserLayout"),
      children: [
        {
          path: "login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Login.vue")
        },
        {
          path: "register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Register.vue")
        }
      ]
    },
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout.vue"),
      children: [
        {
          path: "/",
          redirect: "/dashboard/analysis"
        },
        {
          path: "/dashboard",
          name: "dashboard",
          meta: { icon: "dashboard", title: "仪表盘" },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "analysis",
              name: "analysis",
              meta: { title: "仪表盘" },
              component: () =>
                import(/* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis")
            }
          ]
        }
      ]
    },
    // form
    {
      path: "/form",
      name: "form",
      meta: { icon: "form", title: "表单" },
      component: { render: h => h("router-view") },
      children: [
        {
          path: "basic-form",
          name: "basicForm",
          meta: { title: "基础表单" },
          component: () =>
            import(/* webpackChunkName: "form" */ "./views/Forms/BasicForm")
        },
        {
          path: "step-form",
          name: "stepForm",
          hideChildrenInMenu: true,
          meta: { title: "分布表单" },
          component: () =>
            import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/index"),
          children: [
            {
              path: "step-form/info",
              name: "info",
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step1")
            },
            {
              path: "step-form/confirm",
              name: "confirm",
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step2")
            },
            {
              path: "step-form/result",
              name: "result",
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step3")
            }
          ]
        }
      ]
    },
    {
      path: "*",
      name: "404",
      hideInMenu: true,
      component: NotFound
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  // 地址相同就不执行进度条了
  if (to.path !== from.path) {
    NProgress.start(); // 顶部进度条
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
