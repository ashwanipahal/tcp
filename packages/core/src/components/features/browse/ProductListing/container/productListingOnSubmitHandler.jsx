const submitProductListingFiltersForm = (formData, submit, getProducts, url, isKeepModalOpen) => {
  const data = {
    URI: 'category',
    ignoreCache: true,
    url,
    sortBySelected: true,
    formData,
    scrollToTop: true,
    isKeepModalOpen,
  };
  getProducts(data);
};

export default submitProductListingFiltersForm;
