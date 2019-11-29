import React from 'react';
import PropTypes from 'prop-types';
import { DamImage } from '@tcp/core/src/components/common/atoms';
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
} from '../styles/ProductInformation.style.native';
import { getLocator } from '../../../../../../../utils';

const gymboreeImage = require('../../../../../../../assets/gymboree-logo.png');
const tcpImage = require('../../../../../../../assets/tcp-logo.png');

const ProductInformation = ({ data, labels, quantity }) => {
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
                text={`${labels.price}: `}
              />
            </ProductSubDetailLabel>

            <BodyCopy fontSize="fs12" fontWeight={['semibold']} text={data.itemPrice} />
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

            <BodyCopy
              fontSize="fs12"
              fontWeight={['semibold']}
              text={data.itemPoints}
              color="orange.800"
            />
          </ProductDesc>
        </ProductSubDetails>
      </ProductDescription>
    </OuterContainer>
  );
};

ProductInformation.propTypes = {
  data: PropTypes.shape,
  labels: PropTypes.shape,
  quantity: PropTypes.string,
};
ProductInformation.defaultProps = {
  data: {},
  labels: {},
  quantity: '',
};
export default withStyles(ProductInformation);
export { ProductInformation as ProductInformationVanilla };
