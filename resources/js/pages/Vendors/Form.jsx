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
import { CancelButton } from '@/components/common/Buttons/CancelButton';
import { parseBackendErrors } from '@/utils/validations';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const VendorForm = () => {
  const schema = yup.object().shape({
    email: yup.string().email('Error de formato en el email'),
  });
  const { vendorId } = useParams();
  const existingVendor = useGetVendor(vendorId);
  const navigate = useNavigate();
  const { handleSubmit, control, reset, formState } = useForm({
    defaultValues: existingVendor,
    resolver: yupResolver(schema),
  });
  const { mutate, isLoading: isLoadingMutate } = useMutation(
    vendorId ? VendorsApi.update : VendorsApi.create
  );
  const { errors } = formState;

  useEffect(() => {
    if (existingVendor) {
      reset(existingVendor);
    }
  }, [existingVendor]);

  const onSubmit = data => {
    data.id = vendorId;
    mutate(data, {
      onSuccess: () => {
        toast.success(
          `Proveedor ${vendorId ? 'actualizado' : 'creado'} exitosamente`
        );
        if (!vendorId) {
          navigate(-1);
        }
      },
      onError: err =>
        toast.error(
          parseBackendErrors(err, 'Hubo un error al crear el proveedor')
        ),
    });
  };

  const showErrors = error => {
    toast.error(errors[error]?.message);
  };

  useEffect(() => {
    let err = Object.keys(errors);
    if (err.length > 0) err.map(e => showErrors(e));
  }, [errors]);

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
            labelText="Correo electr??nico"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField control={control} name="phone" labelText="Tel??fono" />
        </Grid>
        <Grid item xs={6}>
          <TextField control={control} name="website" labelText="Sitio web" />
        </Grid>
        <Grid item xs={12}>
          <TextField control={control} name="address" labelText="Direcci??n" />
        </Grid>
        <Grid item xs={12}>
          <CancelButton />
          <Button variant="contained" type="submit">
            {title}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
