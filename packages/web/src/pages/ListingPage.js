/* eslint-disable react/jsx-filename-extension */
import React, { forwardRef } from 'react';
import withHotfix from '@tcp/core/src/components/common/hoc/withHotfix';
import ListingPage from '../components/features/browse/ListingPage';

const ProductListingPage = forwardRef((props, ref) => (
  // Extra div wrapper used here to avoid deep ref forwarding props on class components within :(
  <div ref={ref}>
    <ListingPage {...props} ref={ref} />
  </div>
));

// Display name needed for hotfix capability
ProductListingPage.displayName = 'ProductListingPage';

const ProductListingPageWithHotfix = withHotfix(ProductListingPage);

export default ProductListingPageWithHotfix;
