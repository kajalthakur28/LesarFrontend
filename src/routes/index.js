import { Outlet } from 'react-router-dom';
import { Layout as MarketingLayout } from 'src/layouts/marketing';
import HomePage from 'src/pages';
import Error401Page from 'src/pages/401';
import Error404Page from 'src/pages/404';
import Error500Page from 'src/pages/500';
import ContactPage from 'src/pages/contact';
import CheckoutPage from 'src/pages/checkout';
import PricingPage from 'src/pages/pricing';
import { authRoutes } from './auth';
import { authDemoRoutes } from './auth-demo';
import { componentsRoutes } from './components';
import { dashboardRoutes } from './dashboard';
import { Layout as AuthLayout } from 'src/layouts/auth/classic-layout';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';


export const routes = [
  {
    element: (
      <MarketingLayout>
        <Outlet />
      </MarketingLayout>
    ),
    children: [
      {
        index: true,
        element: 
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      },
      {
        path: 'pricing',
        element: <PricingPage />
      },
      ...componentsRoutes
    ]
  },
  ...authRoutes,
  ...authDemoRoutes,
  ...dashboardRoutes,
  {
    path:'login',
    element:
    <AuthLayout>
      <LoginPage />
    </AuthLayout>
  },
  {
    path:'register',
    element:
    <AuthLayout>
      <RegisterPage />
    </AuthLayout>
  },
  {
    path: 'checkout',
    element: <CheckoutPage />
  },
  {
    path: 'contact',
    element: <ContactPage />
  },
  {
    path: '401',
    element: <Error401Page />
  },
  {
    path: '404',
    element: <Error404Page />
  },
  {
    path: '500',
    element: <Error500Page />
  },
  {
    path: '*',
    element: <Error404Page />
  }
];
