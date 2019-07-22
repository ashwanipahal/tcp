import React from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import { Image } from '@tcp/core/src/components/common/atoms';
import { getIconPath, getLocator } from '@tcp/core/src/utils';
import ProductInformationStyle from '../styles/ProductInformation.style';

// @flow

type Props = {
  data: Object,
};
const ProductInformation = ({ data }: Props) => {
  return (
    <ProductInformationStyle>
      <Row tagName="ul" className="product">
        <Col
          tagName="li"
          key="productDetails"
          className="productImgBrand"
          colSize={{ small: 1.5, medium: 2, large: 3 }}
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
          colSize={{ small: 4.5, medium: 6, large: 9 }}
        >
          <Row tagName="ul" className="product-details">
            <Col
              tagName="li"
              key="product-title"
              className="productImgBrand"
              colSize={{ small: 6, medium: 8, large: 12 }}
            >
              <p className="product-title">{data.productName}</p>
            </Col>
          </Row>
          <Row tagName="ul" className="product-description">
            <Col
              tagName="li"
              key="product-title"
              className="itemList"
              colSize={{ small: 1.5, medium: 3, large: 4 }}
            >
              <span className="itemList">Color:</span>
            </Col>
            <Col
              tagName="li"
              key="product-title"
              className="itemList"
              colSize={{ small: 4.5, medium: 5, large: 8 }}
            >
              <span className="itemDesc">{data.skuInfo.color.family}</span>
            </Col>
          </Row>
          <Row tagName="ul" className="product-description">
            <Col
              tagName="li"
              key="product-title"
              className="itemList"
              colSize={{ small: 1.5, medium: 3, large: 4 }}
            >
              <span className="itemList">Size:</span>
            </Col>
            <Col
              tagName="li"
              key="product-title"
              className="itemList"
              colSize={{ small: 4.5, medium: 5, large: 8 }}
            >
              <span className="itemDesc">{data.skuInfo.size}</span>
              <span className="itemDesc">{data.skuInfo.fit ? data.skuInfo.fit : 'Regular'}</span>
            </Col>
          </Row>
          <Row tagName="ul" className="product-description">
            <Col
              tagName="li"
              key="product-title"
              className="itemList"
              colSize={{ small: 1.5, medium: 3, large: 4 }}
            >
              <span className="itemList">Qty:</span>
            </Col>
            <Col
              tagName="li"
              key="product-title"
              className="itemList"
              colSize={{ small: 4.5, medium: 5, large: 8 }}
            >
              <span className="itemDesc">{data.quantity}</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </ProductInformationStyle>
  );
};

export default ProductInformation;
