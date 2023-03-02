import Grid from '@mui/material/Grid';
import Title from '@/components/common/Title';
import { Select } from '@/components/common/Inputs/Select';
import { TextField } from '@/components/common/Inputs/TextField';
import { SizePicker } from '@/components/Orders/SizePicker';
import Button from '@mui/material/Button';
import { Box } from '@/components/common/Box';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetAllSizes } from '@/hooks/sizes/useGetAllSizes';
import { useGetAllVendors } from '@/hooks/vendors/useGetAllVendors';
import { MenuItem } from '@mui/material';

function renderSizesDropdownOptions(data = []) {
  return data.map(item => {
    return (
      <MenuItem value={item.id} key={item.id}>
        {item.description} ({item.label})
      </MenuItem>
    );
  });
}

export const CreateOrderForm = ({ onAddItem }) => {
  const { data: vendors, isLoading: isLoadingVendors } = useGetAllVendors();
  const { data: sizes, isLoading: isLoadingSizes } = useGetAllSizes();
  const { handleSubmit, control, reset, watch, resetField } = useForm();
  const sizeRange = watch('size_range');
  const [selectedSizeRange, setSelectedSizeRange] = useState(null);
  const isLoading = isLoadingVendors || isLoadingSizes;
  const title = 'Crear pedido';

  useEffect(() => {
    if (sizes && sizeRange) {
      setSelectedSizeRange(sizes.find(size => size.id === sizeRange));
    } else {
      setSelectedSizeRange(null);
    }
  }, [sizeRange, sizes]);

  const handleCreateItems = data => {
    // Get all properties that start with `size_` to see if at least one size was selected
    const selectedSizes = Object.keys(data).filter(
      key => key.includes('size_') && data[key] && key !== 'size_range'
    );

    if (selectedSizes.length === 0) {
      toast.error('Debe seleccionar al menos un talle');
      return;
    }

    // For each size selected, check if a number was entered for the quantity
    // We should not allow to leave empty the quantity
    const sizes = selectedSizes
      .map(size => {
        const sizeId = size.split('_')[1];
        return data[`quantity_${sizeId}`];
      })
      .filter(x => x);

    if (sizes.length !== selectedSizes.length) {
      toast.error('Debe indicar la cantidad para cada talle elegido');
      return;
    }

    Object.keys(data).forEach(key => {
      if (key.includes('quantity') && data[key] && data[key] > 0) {
        const item = {
          vendor_name: vendors.find(vendor => vendor.id === data.vendor_id)
            ?.name,
          vendor_id: data.vendor_id,
          code: data.code,
          color: data.color,
          size: key.split('_')[1],
          quantity: data[key],
          additional_information: data.additional_information,
        };
        onAddItem(prevItems => [...prevItems, item]);
      }
    });

    reset();
  };

  return (
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
            name="code"
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
            data={sizes || []}
            required
            render={renderSizesDropdownOptions}
          />
        </Grid>
        <Grid container item xs={12} sx={{ marginLeft: '2rem' }} spacing={1}>
          {selectedSizeRange &&
            selectedSizeRange.values.map(size => {
              return (
                <Grid item xs={6} key={size}>
                  <SizePicker
                    control={control}
                    sizeNumber={size}
                    watch={watch}
                    reset={resetField}
                  />
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
  );
};
