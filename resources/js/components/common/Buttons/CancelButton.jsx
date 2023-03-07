import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const CancelButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      color="cancel"
      sx={{ marginRight: '1rem' }}
      onClick={() => navigate(-1)}
    >
      Volver
    </Button>
  );
};
