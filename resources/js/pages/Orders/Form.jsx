import Grid from '@mui/material/Grid';
import Title from '@/components/common/Title';
import { TextField } from '@/components/common/Inputs/TextField';
import Button from '@mui/material/Button';
import { Box } from '@/components/common/Box';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useGetAllVendors } from '@/hooks/vendors/useGetAllVendors';
import { Select } from '@/components/common/Inputs/Select';
import { NewOrderTable } from '@/components/Table/Orders/NewOrderTable';
import { useState } from 'react';
import MuiBox from '@mui/material/Box';
import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

export const OrdersForm = () => {
  const navigate = useNavigate();
  const { data: vendors, isLoading: isLoadingVendors } = useGetAllVendors();
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({});
  const { handleSubmit, control } = useForm();

  const onSubmit = () => {};

  const isLoading = isLoadingVendors;
  const title = 'Crear pedido';

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        isLoading={isLoading}
        sx={{ marginBottom: '1rem' }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Title>{title}</Title>
          </Grid>
          <Grid item xs={6}>
            <Select
              control={control}
              name="vendor_id"
              labelText="Proveedor"
              data={vendors}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              control={control}
              name="name"
              labelText="Articulo"
              required
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              control={control}
              name="color"
              labelText="Color"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              name="additional_information"
              labelText="Observaciones"
            />
          </Grid>
          <Grid item xs={3}>
            <Select
              control={control}
              name="size_range"
              labelText="Talles"
              data={[{ name: '38 - 40', id: 1 }]}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginLeft: '2rem' }}>
            <MuiBox
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <FormControlLabel control={<Checkbox />} label="38" />
              <TextField
                control={control}
                name="quantity"
                labelText="Cantidad"
                fullWidth={false}
                sx={{ marginLeft: '1rem' }}
              />
            </MuiBox>
            <MuiBox
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <FormControlLabel control={<Checkbox />} label="39" />
              <TextField
                control={control}
                name="quantity"
                labelText="Cantidad"
                fullWidth={false}
                sx={{ marginLeft: '1rem' }}
              />
            </MuiBox>
            <MuiBox
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <FormControlLabel control={<Checkbox />} label="40" />
              <TextField
                control={control}
                name="quantity"
                labelText="Cantidad"
                fullWidth={false}
                sx={{ marginLeft: '1rem' }}
              />
            </MuiBox>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Agregar al pedido
            </Button>
          </Grid>
        </Grid>
      </Box>

      <NewOrderTable />

      <Box sx={{ marginTop: '1rem' }}>
        <Button
          variant="outlined"
          sx={{ marginRight: '1rem' }}
          onClick={() => navigate(-1)}
        >
          Cancelar
        </Button>
        <Button variant="contained" sx={{ marginRight: '1rem' }}>
          Guardar borrador
        </Button>
        <Button variant="contained" type="submit">
          {title}
        </Button>
      </Box>
    </>
  );
};
