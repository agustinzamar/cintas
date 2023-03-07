import { Box, Typography } from '@mui/material';
import Bubble from '@/assets/img/bubble.png';

export const PageNotFound = () => (
  <Box
    sx={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <img
      src={Bubble}
      alt="asset_bubble"
      style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '30vmin',
      }}
    />
    <img
      src={Bubble}
      alt="asset_bubble"
      style={{
        position: 'absolute',
        top: '0',
        right: '0',
        transform: 'rotate(180deg)',
        width: '30vmin',
      }}
    />
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        sx={{
          color: '#0C249C',
          fontWeight: '600',
          fontSize: 'clamp(120px, 15vmax, 280px)',
          lineHeight: '1',
        }}
      >
        404
      </Typography>
      <Typography
        sx={{
          color: '#0C249C',
          fontWeight: '600',
          fontSize: 'clamp(20px, 2vmax, 44px)',
        }}
      >
        Oooops! algo salio mal
      </Typography>
    </Box>
  </Box>
);
