import * as ADMIN_ROUTES from "@/constants/ADMIN_ROUTES";

const MainWrapper = () => import("@/components/admin/MainWrapper.vue");
const DashboardContentWrapper = () =>
  import(
    "@/components/admin/dashboard/dashboardContent/DashboardContentWrapper.vue"
  );
const Profile = () =>
  import(
    "@/components/admin/dashboard/profile/Profile.vue"
  );

const GeneralStateDashboard = () =>
  import("@/components/admin/dashboard/generalState/GeneralStateDashboard.vue");
const UsuarioDashboard = () =>
  import(
    "@/components/admin/dashboard/administration/usuarios/usuario/UsuarioDashboard.vue"
  );
const RolDashboard = () =>
  import(
    "@/components/admin/dashboard/administration/usuarios/rol/RolDashboard.vue"
  );
const PermisoDashboard = () =>
  import(
    "@/components/admin/dashboard/administration/usuarios/permiso/PermisoDashboard.vue"
  );
const ComponenteDashboard = () =>
  import(
    "@/components/admin/dashboard/administration/usuarios/componente/ComponenteDashboard.vue"
  );

const adminRouter = [
  {
    path: ADMIN_ROUTES.DASHBOARD,
    name: "Dashboard",
    component: MainWrapper,
    meta: { requiresAuth: true, },
    children: [
      {
        path: ADMIN_ROUTES.DASHBOARD,
        name: "ContentWrapper",
        component: DashboardContentWrapper,
        children: [
          {
            path: ADMIN_ROUTES.DASHBOARD,
            name: "GeneralState",
            meta: {
              title: `${process.env.VUE_APP_APP_NAME} | Panel de control`,
              id: 1
            },
            component: GeneralStateDashboard,
          },
          {
            path: ADMIN_ROUTES.DASHBOARD_USUARIO,
            name: "UsuarioDashboard",
            meta: {
              title: `${process.env.VUE_APP_APP_NAME} | Administración de Usuarios`,
              id: 2
            },
            component: UsuarioDashboard,
          },
          {
            path: ADMIN_ROUTES.DASHBOARD_ROL,
            name: "RolDashboard",
            meta: {
              title: `${process.env.VUE_APP_APP_NAME} | Administración de Roles`,
              id: 3
            },
            component: RolDashboard,
          },
          {
            path: ADMIN_ROUTES.DASHBOARD_PERMISO,
            name: "PermisoDashboard",
            meta: {
              title: `${process.env.VUE_APP_APP_NAME} | Administración de Permisos`,
              id: 4
            },
            component: PermisoDashboard,
          },
          {
            path: ADMIN_ROUTES.DASHBOARD_COMPONENTE,
            name: "ComponenteDashboard",
            meta: {
              title: `${process.env.VUE_APP_APP_NAME} | Administración de Componentes`,
              id: 5
            },
            component: ComponenteDashboard,
          },
        ],
      },
      {
        path: ADMIN_ROUTES.DASHBOARD_PERFIL,
        name: 'ProfileAdmin',
        component: Profile,
        meta: {
          title: `${process.env.VUE_APP_APP_NAME} | Perfil`
        }
      }
    ],
  },
];

export default adminRouter;
