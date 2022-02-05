import { createRouter, createWebHistory } from "vue-router";
import { AUTH } from '@/constants/AUTH_ROUTES';
import * as SHARED_ROUTES from '@/constants/SHARED_ROUTES';
import { DASHBOARD } from "@/constants/ADMIN_ROUTES.js";
import authRouter from "./authRouter";
import adminRouter from "./adminRouter";
import AuthHook from "@/helpers/customHooks/AuthHook";
import { refreshToken, checkUIAccess, access } from "@/helpers/customHooks/AuthHook";


const PageNotFound = () => import('@/components/main/PageNotFound.vue');

const routes = [...authRouter, ...adminRouter, {
  path: SHARED_ROUTES.NOT_FOUND,
  component: PageNotFound,
  meta: {
    title: `${process.env.VUE_APP_APP_NAME} | Página no encontrada`
  }
}];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkExactActiveClass: 'bg-dark-gray-lighter text-primary',
  routes,
});


router.beforeEach(async (to, from, next) => {
  if (!AuthHook.value.isAuth)
    await refreshToken();

  if (to.fullPath.includes(AUTH) && AuthHook.value.isAuth) {
    return next({ name: from.name });
  }

  if (!to.fullPath.includes(AUTH)) {
    localStorage.setItem('storedRoute', to.fullPath);
  }

  if (to.meta.id) {
    await checkUIAccess(to.meta.id);
    if (!access.value[to.meta.id]) {
      localStorage.removeItem('storedRoute');
      if (to.fullPath !== from.fullPath)
        return next({ name: from.name });
      else
        return next({ name: 'not-found' });
    }
  }

  if (to.meta.requiresAuth && !AuthHook.value.isAuth) {
    return next({ name: 'Auth' });
  }

  return next();
});

router.afterEach((to, from, failure) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
})

export default router;
