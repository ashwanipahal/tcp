import React from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import { Image } from '@tcp/core/src/components/common/atoms';
import { getIconPath, getLocator } from '@tcp/core/src/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import ProductInformationStyle from '../styles/ProductInformation.style';

// @flow

type Props = {
  data: Object,
  labels: any,
};
const ProductInformation = ({ data, labels }: Props) => {
  return (
    <ProductInformationStyle>
      <Row tagName="ul" className="product">
        <Col
          tagName="li"
          key="productDetails"
          className="productImgBrand"
          colSize={{ small: 2, medium: 2, large: 3 }}
        >
          <Image
            alt="Product"
            className="product-image"
            src="https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/3000996_FM.jpg"
          />
          <Image
            alt="Brand"
            className="brand-image"
            src={getIconPath('header__brand-tab--tcp')}
            data-locator={getLocator('header__brand-tab--tcp')}
          />
        </Col>
        <Col
          tagName="li"
          key="productDetails"
          className="productInfo"
          colSize={{ small: 4, medium: 6, large: 9 }}
        >
          <Row tagName="ul" className="product-details">
            <Col
              tagName="li"
              key="product-title"
              className="productImgBrand"
              colSize={{ small: 6, medium: 8, large: 12 }}
            >
              <BodyCopy
                tag="span"
                fontSize="fs14"
                fontWeight={['semibold']}
                textAlign="left"
                className="product-title"
              >
                {data.productName}
              </BodyCopy>
            </Col>
          </Row>
          <Row tagName="ul" className="product-description">
            <Col
              tagName="li"
              key="product-title"
              className="itemList"
              colSize={{ small: 2, medium: 3, large: 4 }}
            >
              <BodyCopy tag="span" fontSize="fs13" fontWeight={['semibold']} textAlign="left">
                {labels.colorLabel}
                {':'}
              </BodyCopy>
            </Col>
            <Col
              tagName="li"
              key="product-title"
              className="itemList"
              colSize={{ small: 4, medium: 5, large: 8 }}
            >
              <BodyCopy tag="span" fontSize="fs13" textAlign="left" className="itemDesc">
                {data.skuInfo.color.family}
              </BodyCopy>
            </Col>
          </Row>
          <Row tagName="ul" className="product-description">
            <Col
              tagName="li"
              key="product-title"
              className="itemList"
              colSize={{ small: 2, medium: 3, large: 4 }}
            >
              <BodyCopy tag="span" fontSize="fs13" fontWeight={['semibold']} textAlign="left">
                {labels.sizeLabel}
                {':'}
              </BodyCopy>
            </Col>
            <Col tagName="li" key="product-title" colSize={{ small: 4, medium: 5, large: 8 }}>
              <BodyCopy tag="span" fontSize="fs13" textAlign="left" className="itemDesc">
                {data.skuInfo.size}
                {data.skuInfo.fit ? data.skuInfo.fit : 'Regular'}
              </BodyCopy>
            </Col>
          </Row>
          <Row tagName="ul" className="product-description">
            <Col
              tagName="li"
              key="product-title"
              className="itemList"
              colSize={{ small: 2, medium: 3, large: 4 }}
            >
              <BodyCopy tag="span" fontSize="fs13" fontWeight={['semibold']} textAlign="left">
                {labels.qtyLabel}
                {':'}
              </BodyCopy>
            </Col>
            <Col
              tagName="li"
              key="product-title"
              className="itemList"
              colSize={{ small: 4, medium: 5, large: 8 }}
            >
              <BodyCopy tag="span" fontSize="fs13" textAlign="left" className="itemDesc">
                {data.quantity}
              </BodyCopy>
            </Col>
          </Row>
        </Col>
      </Row>
    </ProductInformationStyle>
  );
};

export default ProductInformation;
