import PrintIcon from '@mui/icons-material/Print';
import { BaseIconButton } from '@/components/common/IconButtons/BaseIconButton';

export const PrintButton = ({ onClick, tooltipText, ...rest }) => {
  return (
    <BaseIconButton
      icon={PrintIcon}
      onClick={onClick}
      tooltipText={tooltipText}
      {...rest}
    />
  );
};
