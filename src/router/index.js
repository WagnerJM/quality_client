import Vue from "vue";
import Router from "vue-router";
//import store from "../store";
import Home from "@/components/Home";
import QrkOverview from "@/components/qm/QrkOverview";
import Qrk from "@/components/qm/Qrk";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/qm/qrkoverview",
      name: "QrkOverview",
      component: QrkOverview
    },
    {
      path: "/qm/qrk/:qrk_id",
      name: "qrk",
      component: Qrk,
      props: true
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
