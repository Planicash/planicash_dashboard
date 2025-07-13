import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/theme-context';
import DashboardPage from '@/routes/dashboard';
import Layout from '@/routes/dashboard/layout';
import PaymentsPage from '@/routes/dashboard/payments/payments';
import IncomesPage from '@/routes/dashboard/incomes/incomes';
import FormsPage from '@/routes/dashboard/forms/forms';
import TransactionsPage from '@/routes/dashboard/transactions/transactions';
import SavingsPage from '@/routes/dashboard/savings/savings';
import SettingsScreen from '@/routes/dashboard/settings/settings';
import LoginPage from './routes/auth/login/login';
import Register from './routes/auth/register/register';
import ProfilePage from './routes/dashboard/profile/profile';
import ForgotPasswordPage from './routes/auth/forgot-pass/forgot-password';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={"/auth/login"} />
    }, {
      path: "/auth/login",
      element: <LoginPage />
    },
    {
      path: "/auth/register",
      element: <Register />
    },
    {
      path: "/auth/forgot-password",
      element: <ForgotPasswordPage />
    },
    {
      path: "/dashboard",
      element: <Layout />,
      children: [{
        index: true,
        element: <DashboardPage />
      },
      {
        path: "settings",
        element: <SettingsScreen />
      },
      {
        path: "methods-payments",
        element: <PaymentsPage />
      },
      {
        path: "incomes",
        element: <IncomesPage />
      },
      {
        path: "forms",
        element: <FormsPage />
      },
      {
        path: "transactions",
        element: <TransactionsPage />
      },
      {
        path: "savings",
        element: <SavingsPage />
      },
      {
        path: "profile",
        element: <ProfilePage />
      }

      ]
    }
  ])

  return (
    <ThemeProvider storageKey='theme'>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
};

export default App;
