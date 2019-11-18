import React from 'react';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import {
  ParentWrapper,
  WrapperElement,
  LeftSection,
  ImageWrapper,
  LogoWrapper,
  BadgeWrapper,
  ProductUpc,
  RightSection,
  ProductPrice,
  ProductPoints,
  SaveForLater,
  BorderWrapper,
  RadioWrapper,
  RadioLoaderWrapper,
} from './CartItemTileSkelton.style.native';

const CartItemTileSkeleton = () => {
  return (
    <ParentWrapper>
      <WrapperElement>
        <LeftSection>
          <ImageWrapper>
            <LoaderSkelton />
          </ImageWrapper>
          <LogoWrapper>
            <LoaderSkelton />
          </LogoWrapper>
        </LeftSection>
        <RightSection>
          <BadgeWrapper>
            <LoaderSkelton />
          </BadgeWrapper>
          <ProductUpc>
            <LoaderSkelton />
          </ProductUpc>
          <ProductPrice>
            <LoaderSkelton />
          </ProductPrice>
          <ProductPoints>
            <LoaderSkelton />
          </ProductPoints>
          <SaveForLater>
            <LoaderSkelton />
          </SaveForLater>
        </RightSection>
      </WrapperElement>
      <RadioWrapper>
        <BorderWrapper />
        <RadioLoaderWrapper>
          <LoaderSkelton />
        </RadioLoaderWrapper>
        <BorderWrapper />
        <RadioLoaderWrapper>
          <LoaderSkelton />
        </RadioLoaderWrapper>
        <BorderWrapper />
        <RadioLoaderWrapper>
          <LoaderSkelton />
        </RadioLoaderWrapper>
        <BorderWrapper />
      </RadioWrapper>
    </ParentWrapper>
  );
};

export default CartItemTileSkeleton;
export { CartItemTileSkeleton as CartItemTileSkeletonVanilla };
