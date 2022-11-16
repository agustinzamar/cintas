import Paper from '@mui/material/Paper';
import { Loader } from '@/components/common/Loader';

export const Box = ({
  children,
  style,
  component,
  onSubmit,
  isLoading,
  ...rest
}) => {
  return (
    <Paper
      style={{ position: 'relative', ...style }}
      component={component}
      onSubmit={onSubmit}
      {...rest}
    >
      {isLoading && <Loader />}
      {children}
    </Paper>
  );
};
