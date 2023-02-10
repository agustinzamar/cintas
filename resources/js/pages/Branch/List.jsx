import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@/components/common/Box';
import { Loader } from '@/components/common/Loader';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { EditButton } from '@/components/common/IconButtons/EditButton';
import { ActivateButton } from '@/components/common/IconButtons/ActivateButton';
import { DeactivateButton } from '@/components/common/IconButtons/DeactivateButton';
import { useIsSuperAdmin } from '@/hooks/useIsSuperAdmin';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import CompaniesApi from '@/api/CompaniesApi';
import { useGetAllCompanies } from '@/hooks/companies/useGetAllCompanies';

export const BranchsList = () => {
  const isSuperAdmin = useIsSuperAdmin();
  const { data, isLoading } = useGetAllCompanies();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleDeleteBranch = branchId => {
    CompaniesApi.delete(branchId)
      .then(() => {
        toast.success('Sucursal desactivada exitosamente');
        queryClient.invalidateQueries(['companies']);
      })
      .catch(() => toast.error('Algo salio mal'));
  };

  const handleActivateBranch = branchId => {
    CompaniesApi.enable(branchId)
      .then(() => {
        toast.success('Sucursal activada exitosamente');
        queryClient.invalidateQueries(['companies']);
      })
      .catch(() => toast.error('Algo salio mal'));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/branchs/add"
        >
          Nueva sucursal
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Box>
          {isLoading && <Loader />}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Estado</TableCell>
                {isSuperAdmin && <TableCell>Tipo</TableCell>}
                {isSuperAdmin && <TableCell>Empresa</TableCell>}
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length > 0 &&
                data.map(branch => (
                  <TableRow key={branch.id}>
                    <TableCell>{branch.name}</TableCell>
                    <TableCell>{branch.description}</TableCell>
                    <TableCell>
                      {branch.deleted_at ? 'Inactivo' : 'Activo'}
                    </TableCell>
                    {isSuperAdmin && (
                      <TableCell>
                        {branch.headquarters ? 'Sucursal' : 'Empresa'}
                      </TableCell>
                    )}
                    {isSuperAdmin && (
                      <TableCell>{branch.headquarters?.name}</TableCell>
                    )}
                    <TableCell align="right">
                      <EditButton
                        tooltipText="Editar plan"
                        onClick={() => navigate(`/branchs/add/${branch.id}`)}
                      />
                      {branch.deleted_at ? (
                        <ActivateButton
                          tooltipText="Habilitar sucursal"
                          onClick={() => handleActivateBranch(branch.id)}
                        />
                      ) : (
                        <DeactivateButton
                          tooltipText="Desactivar sucursal"
                          onClick={() => handleDeleteBranch(branch.id)}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </Grid>
    </Grid>
  );
};
