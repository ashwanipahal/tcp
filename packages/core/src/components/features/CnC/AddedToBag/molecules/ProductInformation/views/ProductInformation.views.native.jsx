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
} from '../styles/ProductInformation.style.native';

const ProductInformation = ({ data, labels }) => {
  return (
    <OuterContainer>
      <ImgWrapper>
        <ImageStyle source={{ uri: endpoints.global.baseURI + data.skuInfo.imageUrl }} />
        {!data.isGiftCard && (
          <ImageStyle source={{ uri: `${endpoints.global.baseURI}/static/images/${data.brand}` }} />
        )}
      </ImgWrapper>
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
