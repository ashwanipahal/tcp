/* eslint-disable */
import React from 'react';
import ProductListingPageStyle from '../styles/ProductListingPage.style';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';

export const ProductListView = ({ data, className }) => {
  return (
    <ProductListingPageStyle>
      <h1>PLP Page</h1>
      <Row tagName="ul" className={className}>
        {data &&
          data.map(item => (
            <Col
              tagName="li"
              key={item.productid}
              className="product-item"
              colSize={{ small: 2, medium: 3, large: 4 }}
            >
              <p className="product-name">{item.product_name}</p>
              <p className="product-disc-price">{item.min_offer_price}</p>
              <p className="product-original-price">{`Was ${item.min_list_price}`}</p>
            </Col>
          ))}
      </Row>
    </ProductListingPageStyle>
  );
};
