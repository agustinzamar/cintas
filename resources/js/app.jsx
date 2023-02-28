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
import { VendorsList } from '@/pages/Vendors/List';
import { OrdersForm } from '@/pages/Orders/Form';

const element = document.getElementById('app');
const root = createRoot(element);

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#004e7b',
      light: '#0268a2',
      dark: '#002f4a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#E63462',
      light: '#f34772',
      dark: '#ad1a40',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
      disabled: '#000000',
      hint: '#000000',
    },
    error: {
      main: '#d20f46',
      light: '#f24073',
      dark: '#86092c',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#000000',
    },
    info: {
      main: '#0288d1',
      light: '#349fda',
      dark: '#015f92',
      contrastText: '#ffffff',
    },
    success: {
      main: '#2e7d32',
      light: '#57975b',
      dark: '#205723',
      contrastText: '#ffffff',
    },
    divider: 'rgba(0,0,0,0.3)',
  },
  typography: {
    fontSize: 16,
    fontWeightBold: 700,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    htmlFontSize: 16,
    h1: {
      fontSize: 32,
      fontWeight: 600,
      lineHeight: 1,
      letterSpacing: '0em',
    },
    h2: {
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1,
      letterSpacing: '0em',
    },
    h3: {
      fontSize: 18,
      fontWeight: 400,
      lineHeight: 1,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1,
      letterSpacing: '0em',
    },
    h5: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1,
      letterSpacing: '0em',
    },
    button: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.01,
      letterSpacing: '0em',
    },
  },
  components: {
    MuiInputBase: {
      defaultProps: {
        size: 'medium',
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: '#d20f46',
          '&$error': {
            color: '#d20f46',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        type: 'submit',
      },
      styleOverrides: {
        root: {
          padding: '12px 16px',
          minWidth: '0px',
          lineHeight: 'initial',
          textTransform: 'initial',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          overflowX: 'auto',
        },
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
                      <Route path="" element={<VendorsList />} />
                      <Route path="add" element={<VendorForm />}>
                        <Route path=":vendorId" element={<VendorForm />} />
                      </Route>
                    </Route>

                    <Route path="orders">
                      <Route path="new" element={<OrdersForm />}>
                        <Route path=":orderId" element={<OrdersForm />} />
                      </Route>
                    </Route>
                  </Route>
                </Route>

                <Route path="*" element={<h1>404</h1>} />
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
