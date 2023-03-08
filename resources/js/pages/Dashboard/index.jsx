import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Deposits from '@/components/dashboard/Deposits';
import { MyResponsiveBar } from '@/components/charts/Bar';
import { MyResponsiveLine } from '@/components/charts/Line';
import { MyResponsivePie } from '@/components/charts/Pie';
import { Typography } from '@mui/material';

export function Dashboard() {
  return (
    <Grid container spacing={3}>
      {/* PIE */}
      <Grid item xs={12} md={6} lg={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 400,
          }}
        >
          <Typography variant="h2">Aun no hay nada por aqui</Typography>
          <MyResponsivePie
            data={[
              {
                id: 'jujuy',
                label: 'Jujuy',
                value: 12,
                color: 'hsl(95, 70%, 50%)',
              },
              {
                id: 'salta',
                label: 'Salta',
                value: 24,
                color: 'hsl(81, 70%, 50%)',
              },
              {
                id: 'tucuman',
                label: 'Tucuman',
                value: 24,
                color: 'hsl(2, 70%, 50%)',
              },
              {
                id: 'cba',
                label: 'CBA',
                value: 12,
                color: 'hsl(128, 70%, 50%)',
              },
              {
                id: 'bsas',
                label: 'BSAS',
                value: 111,
                color: 'hsl(43, 70%, 50%)',
              },
            ]}
          />
        </Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={6} lg={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 400,
          }}
        >
          <Deposits />
        </Paper>
      </Grid>
      {/* BARRAS */}
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 400,
          }}
        >
          <MyResponsiveBar
            data={[
              {
                sucursal: 'Sucirsal 1',
                pedidos: 74,
              },
              {
                sucursal: 'Sucirsal 2',
                pedidos: 41,
              },
              {
                sucursal: 'Sucirsal 3',
                pedidos: 172,
              },
              {
                sucursal: 'Sucirsal 4',
                pedidos: 183,
              },
              {
                sucursal: 'Sucirsal 5',
                pedidos: 87,
              },
              {
                sucursal: 'Sucirsal 6',
                pedidos: 148,
              },
              {
                sucursal: 'Sucirsal 7',
                pedidos: 22,
              },
            ]}
          />
        </Paper>
      </Grid>
      {/* LINEAS */}
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 400,
          }}
        >
          <MyResponsiveLine
            data={[
              {
                id: 'Ganancias',
                color: 'hsl(351, 70%, 50%)',
                data: [
                  {
                    x: 'Enero',
                    y: 0,
                  },
                  {
                    x: 'Febrero',
                    y: 10,
                  },
                  {
                    x: 'Marzo',
                    y: 130,
                  },
                  {
                    x: 'Abril',
                    y: 31,
                  },
                  {
                    x: 'Mayo',
                    y: 213,
                  },
                  {
                    x: 'Junio',
                    y: 258,
                  },
                  {
                    x: 'Julio',
                    y: 178,
                  },
                  {
                    x: 'Agosto',
                    y: 132,
                  },
                  {
                    x: 'Septiembre',
                    y: 201,
                  },
                  {
                    x: 'Obtubre',
                    y: 223,
                  },
                  {
                    x: 'Noviembre',
                    y: 30,
                  },
                  {
                    x: 'Diciembre',
                    y: 268,
                  },
                ],
              },
            ]}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
