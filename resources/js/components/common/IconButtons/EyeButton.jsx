import { BaseIconButton } from '@/components/common/IconButtons/BaseIconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const EyeButton = ({ onClick, tooltipText, ...rest }) => {
  return (
    <BaseIconButton
      icon={VisibilityIcon}
      onClick={onClick}
      tooltipText={tooltipText}
      {...rest}
    />
  );
};
