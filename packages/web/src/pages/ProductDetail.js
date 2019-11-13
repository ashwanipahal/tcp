/* eslint-disable react/jsx-filename-extension */
import React, { forwardRef } from 'react';
import withHotfix from '@tcp/core/src/components/common/hoc/withHotfix';
import ProductDetail from '../components/features/browse/ProductDetail';

const ProductDetailPage = forwardRef((props, ref) => (
  // Extra div wrapper used here to avoid deep ref forwarding props on class components within :(
  <div ref={ref}>
    <ProductDetail {...props} ref={ref} />
  </div>
));

// Display name needed for hotfix capability
ProductDetailPage.displayName = 'ProductDetailPage';

const ProductDetailPageWithHotfix = withHotfix(ProductDetailPage);

export default ProductDetailPageWithHotfix;
