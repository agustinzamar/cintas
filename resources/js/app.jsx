import './bootstrap';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '@/context/AuthProvider';
import { AuthMiddleware } from '@/routes/AuthMiddleware';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

import { GuestMiddleware } from '@/routes/GuestMiddleware';
import { LoginPage } from '@/pages/Login';
import { Index as AuthenticatedLayout } from '@/layouts/Authenticated';
import { Index as GuestLayout } from '@/layouts/Guest';
import { Dashboard } from '@/pages/Dashboard';
import { UsersList } from '@/pages/Users/List';
import { UserForm } from '@/pages/Users/Form';
import { PaymentMethodsList } from '@/pages/PaymentMethods/List';
import { AddSubscription } from '@/pages/Subscriptions/Add';
import { SubscriptionsList } from '@/pages/Subscriptions/List';

const element = document.getElementById('app');
const root = createRoot(element);

const queryClient = new QueryClient();

const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: '#db3131',
          '&$error': {
            color: '#db3131',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        type: 'submit',
      },
    },
  },
});

function App() {
  return (
    <StrictMode>
      <CssBaseline />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ToastContainer autoClose={3000} />
          <ThemeProvider theme={theme}>
            <Router>
              <Routes>
                {/*Public routes*/}
                <Route
                  element={
                    <GuestMiddleware>
                      <GuestLayout />
                    </GuestMiddleware>
                  }
                >
                  <Route exact path="login" element={<LoginPage />} />
                </Route>

                {/*Protected routes*/}
                <Route element={<AuthMiddleware />}>
                  <Route element={<AuthenticatedLayout />}>
                    <Route exact path="" element={<Dashboard />} />
                    <Route path="subscriptions">
                      <Route exact path="" element={<SubscriptionsList />} />
                      <Route exact path="add" element={<AddSubscription />} />
                    </Route>

                    <Route path="users">
                      <Route path="" element={<UsersList />} />
                      <Route path="add" element={<UserForm />}>
                        <Route path=":userId" element={<UserForm />} />
                      </Route>
                    </Route>

                    <Route path="payment-methods">
                      <Route path="" element={<PaymentMethodsList />} />
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </Router>
          </ThemeProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </AuthProvider>
    </StrictMode>
  );
}

root.render(<App />);
