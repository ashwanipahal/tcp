import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles';
import SearchListingStyle from '../SearchDetail.style';
import ProductsGrid from '../../ProductListing/molecules/ProductsGrid/views';
import { Row, Col } from '../../../../common/atoms';
import LoadedProductsCount from '../../ProductListing/molecules/LoadedProductsCount/views';
import errorBoundary from '../../../../common/hoc/withErrorBoundary';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import ProductListingFiltersForm from '../../ProductListing/molecules/ProductListingFiltersForm';

const SearchListingView = ({
  className,
  products,
  productsBlock,
  labels,
  totalProductsCount,
  searchedText,
  slpLabels,
  sortLabels,
  filters,
  filtersLength,
  formValues,
  getProducts,
  initialValues,
  labelsFilter,
  onSubmit,
  ...otherProps
}) => {
  return (
    <div className={className}>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          {searchedText && (
            <BodyCopy
              className={`${className} searched-text-wrapper`}
              component="div"
              fontFamily="secondary"
              fontSize="fs14"
              fontWeight="regular"
            >
              {slpLabels.lbl_searched_for}
              <BodyCopy
                className="searched-label"
                fontSize={['fs16', 'fs16', 'fs14']}
                fontWeight="extrabold"
              >
                {`"${searchedText}"`}
              </BodyCopy>
            </BodyCopy>
          )}
        </Col>
      </Row>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <ProductListingFiltersForm
            filtersMaps={filters}
            totalProductsCount={totalProductsCount}
            initialValues={initialValues}
            filtersLength={filtersLength}
            labels={labelsFilter}
            onSubmit={onSubmit}
            formValues={formValues}
            sortLabels={sortLabels}
            getProducts={getProducts}
            slpLabels={slpLabels}
          />
        </Col>
      </Row>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <LoadedProductsCount
            className="show-items-count-section"
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
  filters: PropTypes.shape({}),
  filtersLength: PropTypes.shape({}),
  formValues: PropTypes.shape({
    sort: PropTypes.string.isRequired,
  }).isRequired,
  getProducts: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({}),
  labelsFilter: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  onSubmit: PropTypes.func.isRequired,
  productsBlock: PropTypes.arrayOf(PropTypes.shape({})),
  products: PropTypes.arrayOf(PropTypes.shape({})),
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  totalProductsCount: PropTypes.number,
  searchedText: PropTypes.string,
  slpLabels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  sortLabels: PropTypes.arrayOf(PropTypes.shape({})),
};

SearchListingView.defaultProps = {
  className: '',
  filters: {},
  filtersLength: {},
  initialValues: {},
  labelsFilter: {},
  products: [],
  productsBlock: [],
  labels: {},
  totalProductsCount: 0,
  searchedText: '',
  slpLabels: {},
  sortLabels: {},
};

export default withStyles(errorBoundary(SearchListingView), SearchListingStyle);
export { SearchListingView as SearchListingViewVanilla };
