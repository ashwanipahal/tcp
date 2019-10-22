import React from 'react';
import { Row, Col } from '../../../../common/atoms';

const BundleProduct = () => {
  return (
    <div>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>BREADCRUMBS</Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>PROMO AREA 1</Col>
      </Row>
      <Row>
        <Col hideCol={{ medium: true, large: true }} colSize={{ small: 6, medium: 8, large: 12 }}>
          PRODUCT INFO
        </Col>
        <Col colSize={{ small: 6, medium: 4, large: 7 }}>PRODUCT IMAGES</Col>
        <Col colSize={{ small: 6, medium: 4, large: 4 }} offsetRight={{ large: 1 }}>
          <Col hideCol={{ small: true }} colSize={{ small: 6, medium: 8, large: 12 }}>
            PRODUCT INFO
          </Col>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>PRICE SECTION</Col>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>DESCRIPTION</Col>
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>PROMO AREA 2</Col>
      </Row>
      <Row className="placeholder">
        <Col hideCol={{ medium: true, large: true }} colSize={{ small: 6, medium: 8, large: 12 }}>
          DESCRIPTION
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>FILTER BY</Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>PRODUCTS LIST</Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>YOU MAY ALSO LIKE</Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>YOU MAY ALSO LIKE</Col>
      </Row>
    </div>
  );
};

export default BundleProduct;
