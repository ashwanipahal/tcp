import React from 'react';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import {
  WrapperElement,
  ImageWrapper,
  SingleLine,
  RightSection,
} from './CartItemTileSkelton.style.native';

const CartItemTileSkeleton = () => {
  return (
    <WrapperElement>
      <ImageWrapper>
        <LoaderSkelton />
      </ImageWrapper>
      <RightSection>
        <SingleLine>
          <LoaderSkelton />
        </SingleLine>
        <SingleLine>
          <LoaderSkelton />
        </SingleLine>
        <SingleLine>
          <LoaderSkelton />
        </SingleLine>
      </RightSection>
    </WrapperElement>
  );
};

export default CartItemTileSkeleton;
export { CartItemTileSkeleton as CartItemTileSkeletonVanilla };
