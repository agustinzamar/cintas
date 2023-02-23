import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { VendorsTable } from '@/components/Table/Vendors/VendorsTable';

export const VendorsList = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/vendors/add"
        >
          Nuevo proveedor
        </Button>
      </Grid>
      <Grid item xs={12}>
        <VendorsTable />
      </Grid>
    </Grid>
  );
};
