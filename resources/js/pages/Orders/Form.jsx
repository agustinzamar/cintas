import Button from '@mui/material/Button';
import { Box } from '@/components/common/Box';
import { useNavigate } from 'react-router-dom';
import { NewOrderTable } from '@/components/Table/Orders/NewOrderTable';
import { useState } from 'react';
import { CreateOrderForm } from '@/components/Orders/CreateOrderForm';
import { useMutation } from 'react-query';
import { Loader } from '@/components/common/Loader';
import { OrderStatusEnum } from '@/enums/OrderStatusEnum';
import { toast } from 'react-toastify';
import OrdersApi from '@/api/OrdersApi';
import { useGetAllCompanies } from '@/hooks/companies/useGetAllCompanies';
import { useAuth } from '@/hooks/useAuth';
import MuiSelect from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Cancel } from '@/components/common/Buttons/Cancel';

export const OrdersForm = () => {
  const { auth: user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const { mutate, isLoading } = useMutation(OrdersApi.create);
  const { data: companies } = useGetAllCompanies();
  const [companyId, setCompanyId] = useState(null);

  const onSubmit = statusId => {
    const data = {
      items,
      order_status_id: statusId,
      company_id: companyId,
    };

    mutate(data, {
      onSuccess: () => {
        toast.success(
          `Pedido ${
            statusId === OrderStatusEnum.DRAFT ? 'guardado' : 'enviado'
          } exitosamente.`
        );
        setItems(() => []);
        setCompanyId(() => null);

        if (data.order_status_id === OrderStatusEnum.DRAFT) {
          navigate('/orders');
        }
      },
      onError: () => toast.error('Lo sentimos, algo salió mal'),
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <CreateOrderForm onAddItem={setItems} />

      <NewOrderTable items={items} onDeleteItem={setItems} />

      <Box sx={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
        <Cancel />
        <Button
          variant="contained"
          sx={{ marginRight: '1rem' }}
          onClick={() => onSubmit(OrderStatusEnum.DRAFT)}
        >
          Guardar borrador
        </Button>
        <Button
          variant="contained"
          onClick={() => onSubmit(OrderStatusEnum.SUBMITTED)}
        >
          Enviar pedido
        </Button>
        {!user.company && (
          <FormControl sx={{ width: '200px', marginLeft: '1rem' }}>
            <InputLabel id="company_id">Sucursal</InputLabel>
            <MuiSelect
              value={companyId || ''}
              name="company_id"
              required
              onChange={e => setCompanyId(e.target.value)}
            >
              {companies?.map(company => (
                <MenuItem value={company.id} key={company.id}>
                  {company.name}
                </MenuItem>
              ))}
            </MuiSelect>
          </FormControl>
        )}
      </Box>
    </>
  );
};
