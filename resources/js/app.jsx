import './bootstrap';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '@/context/AuthProvider';
import { AuthMiddleware } from '@/routes/AuthMiddleware';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { LoginPage } from '@/pages/Login';
import { Index as AuthenticatedLayout } from '@/layouts/Authenticated';
import { Index as GuestLayout } from '@/layouts/Guest';
import { Dashboard } from '@/pages/Dashboard';
import { UsersList } from '@/pages/Users/List';
import { UserForm } from '@/pages/Users/Form';
import { BranchsList } from '@/pages/Branch/List';
import { BranchForm } from '@/pages/Branch/Form';
import { VendorForm } from '@/pages/Vendors/Form';
import { GuestMiddleware } from '@/routes/GuestMiddleware';

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
                <Route element={<GuestMiddleware />}>
                  <Route element={<GuestLayout />}>
                    <Route exact path="login" element={<LoginPage />} />
                  </Route>
                </Route>

                {/*Protected routes*/}
                <Route element={<AuthMiddleware />}>
                  <Route element={<AuthenticatedLayout />}>
                    <Route exact path="" element={<Dashboard />} />

                    <Route path="users">
                      <Route path="" element={<UsersList />} />
                      <Route path="add" element={<UserForm />}>
                        <Route path=":userId" element={<UserForm />} />
                      </Route>
                    </Route>

                    <Route path="branches">
                      <Route path="" element={<BranchsList />} />
                      <Route path="add" element={<BranchForm />}>
                        <Route path=":companyId" element={<BranchForm />} />
                      </Route>
                    </Route>

                    <Route path="vendors">
                      <Route path="add" element={<VendorForm />}>
                        <Route path=":vendorId" element={<VendorForm />} />
                      </Route>
                    </Route>

                    <Route path="*" element={<h1>404</h1>} />
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
