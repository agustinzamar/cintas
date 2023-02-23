import { Box } from '@/components/common/Box';
import Grid from '@mui/material/Grid';
import Title from '@/components/common/Title';
import { TextField } from '@/components/common/Inputs/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useGetVendor } from '@/hooks/vendors/useGetVendor';
import { toast } from 'react-toastify';
import VendorsApi from '@/api/VendorsApi';
import { useEffect } from 'react';

export const VendorForm = () => {
  const { vendorId } = useParams();
  const existingVendor = useGetVendor(vendorId);
  const navigate = useNavigate();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: existingVendor,
  });
  const { mutate, isLoading: isLoadingMutate } = useMutation(
    vendorId ? VendorsApi.update : VendorsApi.create
  );

  useEffect(() => {
    if (existingVendor) {
      reset(existingVendor);
    }
  }, [existingVendor, reset]);

  const onSubmit = data => {
    data.id = vendorId;
    mutate(data, {
      onSuccess: () => {
        toast.success(
          `Usuario ${vendorId ? 'actualizado' : 'creado'} exitosamente`
        );
        if (!vendorId) {
          navigate(-1);
        }
      },
      onError: () => toast.error('Lo sentimos, algo salió mal'),
    });
  };

  const title = `${existingVendor ? 'Modificar' : 'Crear'} proveedor`;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoadingMutate}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Title>{title}</Title>
        </Grid>
        <Grid item xs={6}>
          <TextField
            control={control}
            name="name"
            labelText="Nombre"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            control={control}
            name="email"
            labelText="Correo electrónico"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField control={control} name="phone" labelText="Teléfono" />
        </Grid>
        <Grid item xs={6}>
          <TextField control={control} name="website" labelText="Sitio web" />
        </Grid>
        <Grid item xs={12}>
          <TextField control={control} name="address" labelText="Dirección" />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            sx={{ marginRight: '1rem' }}
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            {title}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
