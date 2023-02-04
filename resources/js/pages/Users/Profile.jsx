import { useAuth } from '@/hooks/useAuth';
import { Box } from '@/components/common/Box';
import { Title } from '@/components/common/Title';
import { SubTitle } from '@/components/common/SubTitle';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { mapRoleToForm } from '../../utils/users';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import UsersApi from '@/api/UsersApi';
import { RoleEnum } from '@/enums/RoleEnum';
import { CustomerAdditionalForms } from '@/pages/Users/Forms/CustomerAdditionalForms';

export const Profile = () => {
  const { auth: user } = useAuth();
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const {
    control: controlPersonal,
    handleSubmit: handleSubmitPersonal,
    reset: resetPersonal,
  } = useForm();
  const { mutate, isLoading } = useMutation(UsersApi.update);

  useEffect(() => {
    if (user) {
      resetPersonal({
        ...user,
        role_id: user.role?.id,
      });
    }
  }, [user]);

  const toggleEditPersonal = () => setIsEditingPersonal(!isEditingPersonal);
  const cancelEditingPersonal = () => {
    resetPersonal(user);
    toggleEditPersonal();
  };

  const onSubmitPersonalData = data => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Perfil actualizado exitosamente');
        toggleEditPersonal();
      },
      onError: () => toast.error('Lo sentimos, algo salió mal'),
    });
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmitPersonal(onSubmitPersonalData)}
        isLoading={isLoading}
      >
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <Title>Datos Personales</Title>
          </Grid>
          <Grid item xs={1}>
            {!isEditingPersonal && (
              <IconButton onClick={toggleEditPersonal}>
                <EditIcon />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={12}>
            <SubTitle>
              {user.role.name || 'No Rol'} ({user.company?.name || 'No Empresa'}
              )
            </SubTitle>
          </Grid>
          {mapRoleToForm(user.role.id, controlPersonal, !isEditingPersonal)}
          {isEditingPersonal && (
            <Grid item xs={12}>
              <Button
                variant="outlined"
                sx={{ marginRight: '1rem' }}
                onClick={cancelEditingPersonal}
              >
                Cancelar
              </Button>
              <Button variant="contained" type="submit">
                Guardar
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>

      {user.role.id === RoleEnum.CUSTOMER && <CustomerAdditionalForms />}
    </>
  );
};
