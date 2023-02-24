import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import MuiAppBar from '@mui/material/AppBar';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import { useAuth } from '@/hooks/useAuth';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Header = ({ onToggleDrawer, open }) => {
  const { auth, logout } = useAuth();

  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={onToggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ marginRight: '32px', marginLeft: 'auto' }}
        >
          Bienvenido, {auth?.name}
        </Typography>
        <Tooltip title="Cerrar sesión">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={logout}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
        {/*<IconButton color="inherit">*/}
        {/*  <Badge badgeContent={4} color="secondary">*/}
        {/*    <NotificationsIcon />*/}
        {/*  </Badge>*/}
        {/*</IconButton>*/}
      </Toolbar>
    </AppBar>
  );
};
