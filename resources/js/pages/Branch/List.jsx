import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { BranchesTable } from '@/components/Table/Branches/BranchesTable';

export const BranchsList = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/branches/add"
        >
          Nueva sucursal
        </Button>
      </Grid>
      <Grid item xs={12}>
        <BranchesTable />
      </Grid>
    </Grid>
  );
};
