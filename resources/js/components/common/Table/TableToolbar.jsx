import Title from '@/components/common/Title';

export const TableToolbar = props => {
  const { title, buttons, children } = props;

  return (
    <div>
      <Title>{title}</Title>
      <div className="children">{children}</div>
      <div className="buttons-section">{buttons}</div>
    </div>
  );
};
