import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../../../../common/atoms';
import withStyles from '../../../../../../common/hoc/withStyles';
import ProductListStyle from '../../ProductList.style';

const ProductList = ({ className, products }) => {
  return (
    <div className={className}>
      {products.map(item => {
        return (
          <div className="product-tile">
            <p>
              Name:
              {item.productInfo.name}
            </p>
            <p>
              listPrice:
              {item.productInfo.listPrice}
            </p>
            <p>
              offerPrice:
              {item.productInfo.offerPrice}
            </p>
            <p>
              ratings:
              {item.productInfo.ratings}
            </p>
            <p>
              reviewsCount:
              {item.productInfo.reviewsCount}
            </p>
            <Button
              onClick={() => {}}
              buttonVariation="fixed-width"
              fill="BLUE"
              className="add-to-bag-btn"
            >
              Add to bag
            </Button>
          </div>
        );
      })}
    </div>
  );
};

ProductList.propTypes = {
  className: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.shape({})),
};

ProductList.defaultProps = {
  className: '',
  products: [],
};

export default withStyles(ProductList, ProductListStyle);
