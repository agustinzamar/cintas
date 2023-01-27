import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Title from '@/components/common/Title';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { Loader } from '@/components/common/Loader';
import { Box } from '@/components/common/Box';
import { Select } from '@/components/common/Inputs/Select';
import { useGetCompanies } from '@/hooks/companies/useGetCompanies';
import SubscriptionsApi from '@/api/SubscriptionsApi';
import { TextField } from '@/components/common/Inputs/TextField';
import { useGetSubscription } from '@/hooks/subscriptions/useGetSubscription';

export const SubscriptionForm = () => {
  const { data: companies } = useGetCompanies();
  const { subscriptionId } = useParams();
  const existingSubscription = useGetSubscription(subscriptionId);
  const navigate = useNavigate();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: existingSubscription,
  });
  const { mutate, isLoading } = useMutation(
    subscriptionId ? SubscriptionsApi.update : SubscriptionsApi.create
  );

  useEffect(() => {
    if (existingSubscription) {
      reset(existingSubscription);
    }
  }, [existingSubscription]);

  const onSubmit = data => {
    data.id = subscriptionId;
    mutate(data, {
      onSuccess: () => {
        toast.success(
          `Plan ${subscriptionId ? 'actualizado' : 'creado'} exitosamente`
        );
        if (!subscriptionId) {
          navigate(-1);
        }
      },
      onError: () => toast.error('Lo sentimos, algo salió mal'),
    });
  };

  const title = `${existingSubscription ? 'Modificar' : 'Crear'} plan`;

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <Loader />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Title>{title}</Title>
        </Grid>
        <Grid item xs={6}>
          <TextField
            control={control}
            labelText="Nombre del plan/clase"
            name="name"
            required
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            control={control}
            labelText="Precio"
            name="price"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            control={control}
            labelText="Descripción"
            name="description"
          />
        </Grid>
        {companies?.length > 0 && (
          <Grid item xs={6}>
            <Select
              control={control}
              data={companies}
              name="company_id"
              labelText="Empresa"
              required
            />
          </Grid>
        )}
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
