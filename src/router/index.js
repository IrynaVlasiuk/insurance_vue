import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import beforeEach from "./middlewares/beforeEach";
import afterEach from "./middlewares/afterEach";

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
    mode: 'history',
    routes, // short for routes: routes
    linkActiveClass: "active"
});

router.beforeEach(beforeEach);
router.afterEach(afterEach);


export default router;
