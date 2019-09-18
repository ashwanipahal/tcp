import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles';
import SearchListingStyle from '../SearchDetail.style';
import config from '../searchDetail.constants';
import ProductsGrid from '../../ProductListing/molecules/ProductsGrid/views';
import { Row, Col } from '../../../../common/atoms';
import LoadedProductsCount from '../../ProductListing/molecules/LoadedProductsCount/views';
import errorBoundary from '../../../../common/hoc/withErrorBoundary';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';

const SearchListingView = ({
  className,
  products,
  productsBlock,
  labels,
  totalProductsCount,
  searchedText,
  slpLabels,
  ...otherProps
}) => {
  const { FILTERS, SORT_BY } = config;
  return (
    <div className={className}>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <BodyCopy fontSize="fs14" component="div" fontFamily="secondary" fontWeight="regular">
            {slpLabels.lbl_searched_for}
            <span className="searched-label">{`"${searchedText}"`}</span>
          </BodyCopy>
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 3, medium: 4, large: 6 }}>
          <div className="filter">{FILTERS}</div>
        </Col>
        <Col colSize={{ small: 3, medium: 4, large: 6 }}>
          <div className="sort-by">{SORT_BY}</div>
        </Col>
      </Row>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <LoadedProductsCount
            totalProductsCount={totalProductsCount}
            showingItemsLabel={slpLabels}
          />
        </Col>
      </Row>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          {productsBlock.length ? (
            <ProductsGrid
              productsBlock={productsBlock}
              products={products}
              labels={labels}
              {...otherProps}
            />
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

SearchListingView.propTypes = {
  className: PropTypes.string,
  productsBlock: PropTypes.arrayOf(PropTypes.shape({})),
  products: PropTypes.arrayOf(PropTypes.shape({})),
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  totalProductsCount: PropTypes.number,
  searchedText: PropTypes.string,
  slpLabels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
};

SearchListingView.defaultProps = {
  className: '',
  products: [],
  productsBlock: [],
  labels: {},
  totalProductsCount: 0,
  searchedText: '',
  slpLabels: {},
};

export default withStyles(errorBoundary(SearchListingView), SearchListingStyle);
export { SearchListingView as SearchListingViewVanilla };
