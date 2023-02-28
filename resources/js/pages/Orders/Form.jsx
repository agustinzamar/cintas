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
import { useEffect, useState } from 'react';
import { SizePicker } from '@/components/Orders/SizePicker';
import { useGetAllSizes } from '@/hooks/sizes/useGetAllSizes';
import { MenuItem } from '@mui/material';
import { toast } from 'react-toastify';

function renderSizesDropdownOptions(data = []) {
  return data.map(item => {
    return (
      <MenuItem value={item.id} key={item.id}>
        {item.description} ({item.label})
      </MenuItem>
    );
  });
}

export const OrdersForm = () => {
  const navigate = useNavigate();
  const { data: vendors, isLoading: isLoadingVendors } = useGetAllVendors();
  const { data: sizes, isLoading: isLoadingSizes } = useGetAllSizes();
  const [items, setItems] = useState([]);
  const { handleSubmit, control, reset, watch } = useForm();
  const [selectedSizeRange, setSelectedSizeRange] = useState(null);
  const sizeRange = watch('size_range');

  useEffect(() => {
    if (sizes && sizeRange) {
      setSelectedSizeRange(sizes.find(size => size.id === sizeRange));
    } else {
      setSelectedSizeRange(null);
    }
  }, [sizeRange, sizes]);
  const onSubmit = () => {};

  const handleCreateItems = data => {
    const enabledSizes = Object.keys(data).filter(
      key => key.includes('size_') && data[key] && key !== 'size_range'
    );

    if (enabledSizes.length === 0) {
      toast.error('Debe seleccionar al menos un talle');
      return;
    }

    const sizes = enabledSizes
      .map(size => {
        const sizeId = size.split('_')[1];
        return data[`quantity_${sizeId}`];
      })
      .filter(x => x);

    if (sizes.length !== enabledSizes.length) {
      toast.error('Debe indicar la cantidad para cada talle elegido');
      return;
    }

    let position = items.length;
    Object.keys(data).forEach(key => {
      if (key.includes('quantity') && data[key] && data[key] > 0) {
        const item = {
          id: ++position,
          vendor_name: vendors.find(vendor => vendor.id === data.vendor_id)
            .name,
          vendor_id: data.vendor_id,
          name: data.name,
          color: data.color,
          size: key.split('_')[1],
          quantity: data[key],
          additional_information: data.additional_information,
        };
        setItems(prevItems => [...prevItems, item]);
      }
    });

    reset();
  };

  const handleDeleteItem = id => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const isLoading = isLoadingVendors || isLoadingSizes;
  const title = 'Crear pedido';

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(handleCreateItems)}
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
              data={sizes}
              required
              render={renderSizesDropdownOptions}
            />
          </Grid>
          <Grid container item xs={12} sx={{ marginLeft: '2rem' }} spacing={1}>
            {selectedSizeRange &&
              selectedSizeRange.values.map(size => {
                return (
                  <Grid item xs={6} key={size}>
                    <SizePicker control={control} size={size} watch={watch} />
                  </Grid>
                );
              })}
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Agregar al pedido
            </Button>
          </Grid>
        </Grid>
      </Box>

      <NewOrderTable items={items} onDeleteItem={handleDeleteItem} />

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
