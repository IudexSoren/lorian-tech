import * as AUTH_ROUTES from "@/constants/AUTH_ROUTES";

const Authentication = () => import("@/components/auth/Authentication.vue");
const Login = () => import("@/components/auth/Login.vue");
const PasswordReset = () => import("@/components/auth/PasswordReset.vue");

const authRouter = [
  {
    path: AUTH_ROUTES.AUTH,
    name: "Auth",
    component: Authentication,
    redirect: AUTH_ROUTES.LOGIN,
    children: [
      {
        path: AUTH_ROUTES.LOGIN,
        name: "Login",
        meta: {
          title: `${process.env.VUE_APP_APP_NAME} | Inicio de sesión`
        },
        component: Login,
      },
      {
        path: AUTH_ROUTES.PASS_RESET,
        name: "PasswordReset",
        meta: {
          title: `${process.env.VUE_APP_APP_NAME} | Reiniciar contraseña`
        },
        component: PasswordReset,
      },
    ],
  },
];

export default authRouter;
