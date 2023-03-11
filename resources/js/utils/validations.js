export const parseBackendErrors = (error, defaultError) => {
  const backendError = error.response.data.errors
    ? Object.values(error.response.data.errors)[0][0]
    : null;

  return backendError || defaultError || 'Lo sentimos, ha ocurrido un error.';
};
