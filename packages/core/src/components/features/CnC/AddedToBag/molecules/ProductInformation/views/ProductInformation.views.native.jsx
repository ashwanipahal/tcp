/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import endpoints from '../../../../../../../service/endpoint';
import {
  ProductName,
  ProductDesc,
  OuterContainer,
  ImageWrapper,
  ProductDescription,
} from '../styles/ProductInformation.style.native';

const ProductInformation = ({ data, labels }) => {
  return (
    <OuterContainer>
      <ImageWrapper>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: endpoints.global.baseURI + data.skuInfo.imageUrl }}
        />
        {!data.isGiftCard && (
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: `${endpoints.global.baseURI}/static/images/${data.brand}` }}
          />
        )}
      </ImageWrapper>
      <ProductDescription>
        <ProductName>
          <BodyCopy fontSize="fs12" fontWeight={['semibold']} text={data.productName} />
        </ProductName>
        <ProductDesc>
          <BodyCopy
            fontSize="fs12"
            fontWeight={['semibold']}
            textAlign="center"
            text={data.isGiftCard === true ? `${labels.giftDesign}: ` : `${labels.colorLabel}: `}
          />
          <BodyCopy fontSize="fs12" text={data.skuInfo.color.name} />
        </ProductDesc>
        <ProductDesc>
          <BodyCopy
            fontSize="fs12"
            fontWeight={['semibold']}
            textAlign="center"
            text={data.isGiftCard === true ? `${labels.giftValue}: ` : `${labels.sizeLabel}: `}
          />
          <BodyCopy fontSize="fs12" text={`${data.skuInfo.size} `} />
          <BodyCopy
            fontSize="fs12"
            text={!data.skuInfo.fit || data.skuInfo.fit === 'Regular' ? ' ' : data.skuInfo.fit}
          />
        </ProductDesc>
        <ProductDesc>
          <BodyCopy
            fontSize="fs12"
            fontWeight={['semibold']}
            textAlign="center"
            text={`${labels.qtyLabel}: `}
          />
          <BodyCopy fontSize="fs12" text={data.quantity} />
        </ProductDesc>
      </ProductDescription>
    </OuterContainer>
  );
};

ProductInformation.propTypes = {
  data: PropTypes.shape,
  labels: PropTypes.shape,
};
ProductInformation.defaultProps = {
  data: {},
  labels: {},
};
export default withStyles(ProductInformation);
export { ProductInformation as ProductInformationVanilla };
