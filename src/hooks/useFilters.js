export const useFilters = (onChange) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    onChange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { handleFilterChange };
};
