export const parseBackendErrors = (error, defaultError) => {
  return (
    error.response.data.message ||
    defaultError ||
    'Lo sentimos, ha ocurrido un error.'
  );
};
