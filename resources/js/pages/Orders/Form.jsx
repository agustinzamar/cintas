import Button from '@mui/material/Button';
import { Box } from '@/components/common/Box';
import { useNavigate, useParams } from 'react-router-dom';
import { NewOrderTable } from '@/components/Table/Orders/NewOrderTable';
import { useEffect, useState } from 'react';
import { CreateOrderForm } from '@/components/Orders/CreateOrderForm';
import { useMutation, useQueryClient } from 'react-query';
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
import { useGetOrder } from '@/hooks/orders/useGetOrder';
import { CancelButton } from '@/components/common/Buttons/CancelButton';

export const OrdersForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { data: existingOrder, isLoading: isLoadingOrder } =
    useGetOrder(orderId);
  const { auth: user } = useAuth();
  const [items, setItems] = useState([]);
  const { mutate, isLoading: isLoadingMutate } = useMutation(
    existingOrder ? OrdersApi.update : OrdersApi.create
  );
  const { data: companies } = useGetAllCompanies();
  const [companyId, setCompanyId] = useState(null);
  const isLoading = isLoadingOrder || isLoadingMutate;

  useEffect(() => {
    if (existingOrder && existingOrder.status?.id !== OrderStatusEnum.DRAFT) {
      navigate(`/orders/view/${existingOrder.id}`);
    }

    setCompanyId(existingOrder?.company?.id);
  }, [existingOrder]);

  const onSubmit = statusId => {
    const data = {
      items,
      order_status_id: statusId,
      company_id: companyId,
      id: existingOrder?.id,
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

        queryClient.invalidateQueries(['order']);

        navigate('/orders');
      },
      onError: () => toast.error('Lo sentimos, algo salió mal'),
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <CreateOrderForm onAddItem={setItems} existingOrder={existingOrder} />

      <NewOrderTable items={items} onDeleteItem={setItems} />

      <Box sx={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
        <CancelButton />
        <Button
          variant="outlined"
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
