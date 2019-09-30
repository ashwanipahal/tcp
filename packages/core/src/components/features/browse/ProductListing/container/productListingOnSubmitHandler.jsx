const submitProductListingFiltersForm = (formData, submit, getProducts, url) => {
  const data = {
    URI: 'category',
    ignoreCache: true,
    url,
    sortBySelected: true,
    formData,
    scrollToTop: true,
  };
  getProducts(data);
};

export default submitProductListingFiltersForm;
