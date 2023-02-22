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
import { TextField } from '@/components/common/Inputs/TextField';
import CompaniesApi from '@/api/CompaniesApi';
import { useGetCompany } from '@/hooks/companies/useGetCompany';
import { Select } from '@/components/common/Inputs/Select';
import { useGetProvinces } from '@/hooks/address/useGetProvinces';
import { useGetCitiesByProvince } from '@/hooks/address/useGetCitiesByProvince';

export const BranchForm = () => {
  const { companyId } = useParams();
  const existingCompany = useGetCompany(companyId);
  const navigate = useNavigate();
  const { handleSubmit, control, reset, watch } = useForm({
    defaultValues: existingCompany,
  });
  const { mutate, isLoading: isLoadingMutate } = useMutation(
    companyId ? CompaniesApi.update : CompaniesApi.create
  );
  const province_id = watch('province_id');
  const { data: provinces, isLoading: isLoadingProvinces } = useGetProvinces();
  const { data: cities, isLoading: isLoadingCities } =
    useGetCitiesByProvince(province_id);

  useEffect(() => {
    if (existingCompany) {
      reset({
        ...existingCompany,
        province_id: existingCompany.city.province_id,
      });
    }
  }, [existingCompany]);

  const onSubmit = data => {
    data.id = companyId;
    mutate(data, {
      onSuccess: () => {
        toast.success(
          `Sucursal ${companyId ? 'actualizada' : 'creada'} exitosamente`
        );
        if (!companyId) {
          navigate(-1);
        }
      },
      onError: () => toast.error('Lo sentimos, algo salió mal'),
    });
  };

  const title = `${existingCompany ? 'Modificar' : 'Crear'} sucursal`;
  const isLoading = isLoadingMutate || isLoadingProvinces || isLoadingCities;

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
            labelText="Nombre de la sucursal"
            name="name"
            required
          />
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <Select
            control={control}
            labelText="Provincia"
            name="province_id"
            data={provinces}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            control={control}
            labelText="Ciudad"
            name="city_id"
            data={cities}
            disabled={!province_id}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField control={control} labelText="Dirección" name="address" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            control={control}
            labelText="Descripción"
            name="description"
          />
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
