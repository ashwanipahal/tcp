import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '../../../../common/atoms';
// import ProductList from '../molecules/ProductList/views';
import ProductsGrid from '../molecules/ProductsGrid/views';
import GlobalNavigationMenuDesktopL2 from '../molecules/GlobalNavigationMenuDesktopL2/views';
import withStyles from '../../../../common/hoc/withStyles';
import PickupStoreModal from '../../../../common/organisms/PickupStoreModal';

import ProductListingStyle from '../ProductListing.style';

import FixedBreadCrumbs from '../molecules/FixedBreadCrumbs/views';

import ProductListingFiltersForm from '../molecules/ProductListingFiltersForm';
import ReadMore from '../molecules/ReadMore/views';
import SpotlightContainer from '../molecules/Spotlight/container/Spotlight.container';

const ProductListView = ({
  className,
  productsBlock,
  currentNavIds,
  navTree,
  breadCrumbs,
  filters,
  totalProductsCount,
  initialValues,
  filtersLength,
  longDescription,
  labels,
  labelsFilter,
  categoryId,
  formValues,
  getProducts,
  onSubmit,
  ...otherProps
}) => {
  return (
    <div className={className}>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="bread-crumb">
            <FixedBreadCrumbs crumbs={breadCrumbs} separationChar=">" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 2 }}>
          <div className="sidebar">
            <GlobalNavigationMenuDesktopL2
              navigationTree={navTree}
              activeCategoryIds={currentNavIds}
            />
          </div>
        </Col>
        <Col colSize={{ small: 6, medium: 8, large: 10 }}>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="promo-area">
              <img src="/static/images/dummy-banner.bmp" alt="dummy-banner" />
            </div>
          </Col>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="filter-section">
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
            </div>
          </Col>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="count-section">
              {totalProductsCount > 0 && (
                <span className="items-count-content">
                  Showing
                  <span className="items-count-content-number">
                    {totalProductsCount > 0 ? totalProductsCount : 0}
                  </span>
                  {totalProductsCount > 1 ? 'Items' : 'Item'}
                </span>
              )}
            </div>
          </Col>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <ProductsGrid productsBlock={productsBlock} labels={labels} {...otherProps} />
          </Col>

          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <ReadMore
              description={longDescription}
              labels={labels}
              className={`${className} seo-text`}
            />
          </Col>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <SpotlightContainer categoryId={categoryId} />
          </Col>
        </Col>
      </Row>
      <PickupStoreModal />
    </div>
  );
};

ProductListView.propTypes = {
  className: PropTypes.string,
  productsBlock: PropTypes.arrayOf(PropTypes.shape({})),
  longDescription: PropTypes.string,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  /* eslint-disable */
  currentNavIds: PropTypes.arrayOf(PropTypes.shape({})),
  categoryId: PropTypes.string,
  navTree: PropTypes.shape({}),
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({})),
  filters: PropTypes.shape({}),
  totalProductsCount: PropTypes.string,
  initialValues: PropTypes.shape({}),
  filtersLength: PropTypes.shape({}),
  labelsFilter: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  getProducts: PropTypes.func,
  onSubmit: PropTypes.func,
  formValues: PropTypes.shape({}).isRequired,
};

ProductListView.defaultProps = {
  className: '',
  productsBlock: [],
  longDescription: [],
  currentNavIds: [],
  navTree: {},
  breadCrumbs: [],
  filters: {},
  totalProductsCount: '',
  initialValues: {},
  filtersLength: {},
  categoryId: '',
  labels: {},
  labelsFilter: {},
};

export default withStyles(ProductListView, ProductListingStyle);
