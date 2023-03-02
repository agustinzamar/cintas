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

export const OrdersForm = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const { mutate, isLoading } = useMutation(OrdersApi.create);

  const onSubmit = statusId => {
    const data = {
      items,
      order_status_id: statusId,
    };
    mutate(data, {
      onSuccess: () => {
        toast.success(
          `Pedido ${
            statusId === OrderStatusEnum.DRAFT ? 'guardado' : 'enviado'
          } exitosamente.`
        );
        setItems(() => []);
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

      <Box sx={{ marginTop: '1rem' }}>
        <Button
          variant="outlined"
          sx={{ marginRight: '1rem' }}
          onClick={() => navigate(-1)}
        >
          Cancelar
        </Button>
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
      </Box>
    </>
  );
};
