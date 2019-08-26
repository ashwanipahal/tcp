import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '../../../../common/atoms';
import ProductList from '../molecules/ProductList/views';
import GlobalNavigationMenuDesktopL2 from '../molecules/GlobalNavigationMenuDesktopL2/views';
import FixedBreadCrumbs from '../molecules/FixedBreadCrumbs/views';

import ProductListingFiltersForm from '../molecules/ProductListingFiltersForm';

import ReadMore from '../molecules/ReadMore/views';
import SpotlightContainer from '../molecules/Spotlight/container/Spotlight.container';

const ProductListView = ({
  className,
  products,
  currentNavIds,
  navTree,
  breadCrumbs,
  filters,
  longDescription,
  labels,
  labelsFilter,
  categoryId,
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
            <div className="promo-area">Promo area</div>
          </Col>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="filter-area">
              <ProductListingFiltersForm filters={filters} labels={labelsFilter} />
            </div>
          </Col>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <ProductList
              products={products}
              className={`${className} product-list`}
              labels={labels}
              {...otherProps}
            />
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
    </div>
  );
};

ProductListView.propTypes = {
  className: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.shape({})),
  longDescription: PropTypes.string,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  /* eslint-disable */
  currentNavIds: PropTypes.arrayOf(PropTypes.shape({})),
  categoryId: PropTypes.string,
  navTree: PropTypes.shape({}),
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({})),
  filters: PropTypes.shape({}),
  labelsFilter: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
};

ProductListView.defaultProps = {
  className: '',
  products: [],
  longDescription: [],
  currentNavIds: [],
  navTree: {},
  breadCrumbs: [],
  filters: {},
  categoryId: '',
  labels: {},
  labelsFilter: {},
};

export default ProductListView;
