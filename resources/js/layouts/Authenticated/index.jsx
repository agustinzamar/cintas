import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import { Copyright } from '@/components/Copyright';
import { useState } from 'react';
import { Sidebar } from '@/layouts/Authenticated/Sidebar';
import { Header } from '@/layouts/Authenticated/Header';

export function Index() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Header open={open} onToggleDrawer={toggleDrawer} />
      <Sidebar onToggleDrawer={toggleDrawer} open={open} />
      <Box
        component="main"
        sx={{
          backgroundColor: theme => theme.palette.grey[100],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Outlet />
        </Container>
        <Copyright sx={{ marginTop: 'auto', marginBottom: 0 }} />
      </Box>
    </Box>
  );
}
