import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import endpoints from '../../../../../../../service/endpoint';
import {
  ProductName,
  ProductDesc,
  OuterContainer,
  ImgWrapper,
  ImageStyle,
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
        <ImageStyle source={{ uri: endpoints.global.baseURI + data.skuInfo.imageUrl }} />
        {!data.isGiftCard &&
          (data.isGiftCard === 'TCP' ? (
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
            <BodyCopy
              fontSize="fs12"
              text={!data.skuInfo.fit || data.skuInfo.fit === 'Regular' ? ' ' : data.skuInfo.fit}
            />
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
