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
          component: { render: h => h("router-view") },
          children: [
            {
              path: "analysis",
              name: "analysis",
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
      component: { render: h => h("router-view") },
      children: [
        {
          path: "basic-form",
          name: "basicForm",
          component: () =>
            import(/* webpackChunkName: "form" */ "./views/Forms/BasicForm")
        },
        {
          path: "step-form",
          name: "stepForm",
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
  NProgress.start(); // 顶部进度条
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
