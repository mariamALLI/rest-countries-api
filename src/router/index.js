import { createRouter, createWebHistory } from "vue-router";
import DisplayCountries from "../components/DisplayCountries.vue";
import CountryDetail from "../components/CountryDetail.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: DisplayCountries,
  },
  {
    path: "/country/:name",
    name: "CountryDetail",
    component: CountryDetail,
    props: (route) => ({ name: route.params.name }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
