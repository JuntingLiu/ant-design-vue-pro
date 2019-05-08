import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      component: { render: h => h("router-view") }, //
      children: [
        {
          path: "login",
          name: "Login",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/user/login.vue")
        },
        {
          path: "register",
          name: "Register",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/user/register.vue")
        }
      ]
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
