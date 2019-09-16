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
import ProductListingFiltersForm from '../../ProductListing/molecules/ProductListingFiltersForm';

class SearchListingView extends React.PureComponent {
  render() {
    const {
      className,
      filters,
      filtersLength,
      formValues,
      getProducts,
      initialValues,
      labelsFilter,
      onSubmit,
      products,
      productsBlock,
      labels,
      totalProductsCount,
      searchedText,
      ...otherProps
    } = this.props;
    const { SEARCHED_FOR } = config;
    return (
      <div className={className}>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <BodyCopy fontSize="fs14" component="div" fontFamily="secondary" fontWeight="regular">
              {SEARCHED_FOR}
              <span className="searched-label">{`"${searchedText}"`}</span>
            </BodyCopy>
          </Col>
        </Row>
        <Row>
          <Col colSize={{ small: 3, medium: 4, large: 6 }}>
            <ProductListingFiltersForm
              filtersMaps={filters}
              totalProductsCount={totalProductsCount}
              initialValues={initialValues}
              filtersLength={filtersLength}
              labels={labelsFilter}
              onSubmit={onSubmit}
              formValues={formValues}
              getProducts={getProducts}
            />
          </Col>
        </Row>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <LoadedProductsCount totalProductsCount={totalProductsCount} />
          </Col>
        </Row>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <ProductsGrid
              productsBlock={productsBlock}
              products={products}
              labels={labels}
              {...otherProps}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

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
};

export default withStyles(errorBoundary(SearchListingView), SearchListingStyle);
export { SearchListingView as SearchListingViewVanilla };
