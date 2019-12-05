import React from 'react';
import PropTypes from 'prop-types';
import { DamImage } from '@tcp/core/src/components/common/atoms';
import PriceCurrency from '@tcp/core/src/components/common/molecules/PriceCurrency';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  ProductName,
  ProductDesc,
  OuterContainer,
  ImgWrapper,
  ProductDescription,
  ImageBrandStyle,
  ImageGymBrandStyle,
  ProductSubDetails,
  ProductSubDetailLabel,
  LoaderWrapper,
} from '../styles/ProductInformation.style.native';
import { getLocator } from '../../../../../../../utils';

const gymboreeImage = require('../../../../../../../assets/gymboree-logo.png');
const tcpImage = require('../../../../../../../assets/tcp-logo.png');

const ProductInformation = ({ data, labels, quantity, isDoubleAddedToBag, bagLoading }) => {
  return (
    <OuterContainer>
      <ImgWrapper>
        {/* <ImageStyle source={{ uri: endpoints.global.baseURI + data.skuInfo.imageUrl }} /> */}
        <DamImage isProductImage width={100} height={100} url={data.skuInfo.imageUrl} />
        {!data.isGiftCard &&
          (data.brand === 'tcp' ? (
            <ImageBrandStyle data-locator={getLocator('cart_item_brand_logo')} source={tcpImage} />
          ) : (
            <ImageGymBrandStyle
              data-locator={getLocator('cart_item_brand_logo')}
              source={gymboreeImage}
            />
          ))}
      </ImgWrapper>
      <ProductDescription>
        <ProductName>
          <BodyCopy fontSize="fs12" fontWeight={['semibold']} text={data.productName} />
        </ProductName>
        <ProductSubDetails>
          <ProductDesc>
            <ProductSubDetailLabel>
              <BodyCopy
                fontSize="fs12"
                fontWeight={['semibold']}
                textAlign="left"
                text={
                  data.isGiftCard === true ? `${labels.giftDesign}: ` : `${labels.colorLabel}: `
                }
              />
            </ProductSubDetailLabel>

            <BodyCopy fontSize="fs12" text={data.skuInfo.color.name} />
          </ProductDesc>
          <ProductDesc>
            <ProductSubDetailLabel>
              <BodyCopy
                fontSize="fs12"
                fontWeight={['semibold']}
                textAlign="left"
                text={data.isGiftCard === true ? `${labels.giftValue}: ` : `${labels.sizeLabel}: `}
              />
            </ProductSubDetailLabel>

            <BodyCopy fontSize="fs12" text={`${data.skuInfo.size} `} />
            <BodyCopy fontSize="fs12" text={!data.skuInfo.fit ? ' ' : data.skuInfo.fit} />
          </ProductDesc>
          <ProductDesc>
            <ProductSubDetailLabel>
              <BodyCopy
                fontSize="fs12"
                fontWeight={['semibold']}
                textAlign="left"
                text={`${labels.qtyLabel}: `}
              />
            </ProductSubDetailLabel>

            <BodyCopy fontSize="fs12" text={quantity || data.quantity} />
          </ProductDesc>
          {isDoubleAddedToBag && (
            <>
              <ProductDesc>
                <ProductSubDetailLabel>
                  <BodyCopy
                    fontSize="fs12"
                    fontWeight={['semibold']}
                    textAlign="left"
                    text={`${labels.price}: `}
                  />
                </ProductSubDetailLabel>
                {!bagLoading ? (
                  <BodyCopy
                    fontSize="fs12"
                    fontWeight={['semibold']}
                    text={<PriceCurrency price={Number(data.listPrice)} />}
                  />
                ) : (
                  <LoaderWrapper>
                    <LoaderSkelton height={12} />
                  </LoaderWrapper>
                )}
              </ProductDesc>
              <ProductDesc>
                <ProductSubDetailLabel>
                  <BodyCopy
                    fontSize="fs12"
                    fontWeight={['semibold']}
                    textAlign="left"
                    text={`${labels.points}: `}
                  />
                </ProductSubDetailLabel>
                {!bagLoading ? (
                  <BodyCopy
                    fontSize="fs12"
                    fontWeight={['semibold']}
                    text={data.itemPoints}
                    color="orange.800"
                  />
                ) : (
                  <LoaderWrapper>
                    <LoaderSkelton height={12} />
                  </LoaderWrapper>
                )}
              </ProductDesc>
            </>
          )}
        </ProductSubDetails>
      </ProductDescription>
    </OuterContainer>
  );
};

ProductInformation.propTypes = {
  data: PropTypes.shape,
  labels: PropTypes.shape,
  quantity: PropTypes.string,
  isDoubleAddedToBag: PropTypes.bool,
  bagLoading: PropTypes.bool.isRequired,
};
ProductInformation.defaultProps = {
  data: {},
  labels: {},
  quantity: '',
  isDoubleAddedToBag: false,
};
export default withStyles(ProductInformation);
export { ProductInformation as ProductInformationVanilla };
