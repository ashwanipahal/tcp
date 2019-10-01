/* eslint-disable */
import React from 'react';
import { Row, Col, BodyCopy } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import FavoritesViewStyle from '../styles/Favorites.style';

const FavoritesView = props => {
  const { className } = props;
  return (
    <Row className={className} fullBleed>
      <Col
        colSize={{ small: 6, medium: 8, large: 12 }}
        ignoreGutter={{ small: true, medium: true, large: true }}
      >
        <BodyCopy fontWeight="extrabold" fontSize="fs16" className="favorite-title">
          MY FAVORITES
        </BodyCopy>
      </Col>
      <Col
        colSize={{ small: 6, medium: 8, large: 6 }}
        offsetLeft={{ small: 0, medium: 0, large: 3 }}
        className="favorite-list"
      >
        <span>Dropdown center</span>
      </Col>
      <Col
        colSize={{ small: 6, medium: 8, large: 2 }}
        offsetLeft={{ small: 0, medium: 0, large: 1 }}
        className="share-list"
        ignoreGutter={{ small: true, medium: true, large: true }}
      >
        <span>Dropdown end</span>
      </Col>
      <Col
        hideCol={{ small: true, medium: true }}
        colSize={{ small: 6, medium: 8, large: 6 }}
        className="display-list"
      >
        <span>Display By:</span>
      </Col>
      <Col
        hideCol={{ small: true, medium: true }}
        colSize={{ small: 6, medium: 8, large: 6 }}
        className="sort-list"
        ignoreGutter={{ small: true, medium: true, large: true }}
      >
        <span>Sort By:</span>
      </Col>
      <Col
        hideCol={{ small: true, medium: true }}
        colSize={{ small: 6, medium: 8, large: 6 }}
        className="brand"
      >
        <span>Brand:</span>
      </Col>
      <Col
        hideCol={{ small: true, medium: true }}
        colSize={{ small: 6, medium: 8, large: 6 }}
        className="fav-items"
        ignoreGutter={{ small: true, medium: true, large: true }}
      >
        <span>4 Items</span>
      </Col>
      <Col
        hideCol={{ small: true, medium: true }}
        colSize={{ small: 6, medium: 8, large: 12 }}
        className="product-list"
        ignoreGutter={{ small: true, medium: true, large: true }}
      >
        <div className="product">Product 1</div>
        <div className="product">Product 2</div>
        <div className="product">Product 3</div>
        <div className="product">Product 4</div>
        <div className="product">Product 5</div>
        <div className="product">Product 6</div>
        <div className="product">Product 7</div>
      </Col>
      <Col
        hideCol={{ small: true, medium: true }}
        colSize={{ small: 6, medium: 8, large: 12 }}
        className="recommendation"
      >
        <div>You may also like</div>
      </Col>
    </Row>
  );
};

export default withStyles(FavoritesView, FavoritesViewStyle);
