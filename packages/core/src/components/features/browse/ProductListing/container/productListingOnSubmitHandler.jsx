const submitProductListingFiltersForm = (formData, submit, getProducts) => {
  const data = {
    URI: 'category',
    ignoreCache: true,
    url: undefined,
    sortBySelected: true,
    formData,
  };
  getProducts(data);
};

export default submitProductListingFiltersForm;
