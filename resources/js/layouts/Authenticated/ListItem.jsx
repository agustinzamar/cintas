import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ListItem = ({ icon, text, url }) => {
  return (
    <Link
      to={url}
      style={{ textDecoration: 'none', color: 'rgb(0 0 0 / 54%)' }}
    >
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </Link>
  );
};

ListItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
