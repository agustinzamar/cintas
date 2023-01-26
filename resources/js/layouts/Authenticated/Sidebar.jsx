import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { ListItem } from '@/layouts/Authenticated/ListItem';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export const Sidebar = ({ onToggleDrawer, open }) => {
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={onToggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <ListItem text="Inicio" icon={<DashboardIcon />} url="/" />
        <ListItem text="Perfil" icon={<PersonIcon />} url="/profile/:id" />
        <ListItem text="Usuarios" icon={<PeopleIcon />} url="/users" />
        <ListItem
          text="Planes"
          icon={<LocalActivityIcon />}
          url="/subscriptions/add"
        />
        <ListItem
          text="Medios de pago"
          icon={<PaymentIcon />}
          url="/payment-methods"
        />
        <ListItem
          text="Configuración"
          icon={<SettingsIcon />}
          url="/settings"
        />
      </List>
    </Drawer>
  );
};
