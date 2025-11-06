export const getExpirationDate = () => {
  const currentDate = new Date();
  const expirationDate = new Date(
    currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
  );
  return expirationDate;
};
