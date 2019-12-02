import React from 'react';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import ProductDetailWrapper from '../styles/ProductDetailSkeleton.style.native';

const ProductDetailSkeleton = () => {
  return (
    <ProductDetailWrapper>
      <ViewWithSpacing spacingStyles="margin-bottom-MED">
        <LoaderSkelton width="100%" height="400px" />
      </ViewWithSpacing>
      <ViewWithSpacing spacingStyles="margin-bottom-MED">
        <LoaderSkelton width="100%" height="30px" />
      </ViewWithSpacing>
      <ViewWithSpacing spacingStyles="margin-bottom-MED">
        <LoaderSkelton width="100%" height="40px" />
      </ViewWithSpacing>
      <ViewWithSpacing spacingStyles="margin-bottom-MED">
        <LoaderSkelton width="30%" height="20px" />
      </ViewWithSpacing>
      <ViewWithSpacing spacingStyles="margin-bottom-MED">
        <LoaderSkelton width="100%" height="40px" />
      </ViewWithSpacing>
      <ViewWithSpacing spacingStyles="margin-bottom-MED">
        <LoaderSkelton width="100%" height="40px" />
      </ViewWithSpacing>
      <ViewWithSpacing spacingStyles="margin-bottom-MED">
        <LoaderSkelton width="100%" height="20px" />
      </ViewWithSpacing>
    </ProductDetailWrapper>
  );
};
export default ProductDetailSkeleton;
