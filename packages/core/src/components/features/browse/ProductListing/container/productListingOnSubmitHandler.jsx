const submitProductListingFiltersForm = (formData, submit, getProducts, url) => {
  const data = {
    URI: 'category',
    ignoreCache: true,
    url,
    sortBySelected: true,
    formData,
  };
  getProducts(data);
};

export default submitProductListingFiltersForm;
