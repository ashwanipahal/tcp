import React from 'react';
import PropTypes from 'prop-types';

import Recommendations from '@tcp/web/src/components/common/molecules/Recommendations';

import { Row, Col } from '../../../../common/atoms';

import ModuleA from '../../../../common/molecules/ModuleA';
import ModuleD from '../../../../common/molecules/ModuleD';
import ModuleG from '../../../../common/molecules/ModuleG';
import ModuleQ from '../../../../common/molecules/ModuleQ';
import moduleAMock from '../../../../../services/abstractors/common/moduleA/mock';
import moduleDMock from '../../../../../services/abstractors/common/moduleD/mock';
import moduleGMock from '../../../../../services/abstractors/common/moduleG/mock';
import moduleQMock from '../../../../../services/abstractors/common/moduleQ/mock';

// import ProductList from '../molecules/ProductList/views';
import ProductsGrid from '../molecules/ProductsGrid/views';
import GlobalNavigationMenuDesktopL2 from '../molecules/GlobalNavigationMenuDesktopL2/views';
import withStyles from '../../../../common/hoc/withStyles';
import QuickViewModal from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.container';

import ProductListingStyle from '../ProductListing.style';

import FixedBreadCrumbs from '../molecules/FixedBreadCrumbs/views';

import ProductListingFiltersForm from '../molecules/ProductListingFiltersForm';
import ReadMore from '../molecules/ReadMore/views';
import SpotlightContainer from '../molecules/Spotlight/container/Spotlight.container';
import LoadedProductsCount from '../molecules/LoadedProductsCount/views';
import AddedToBagContainer from '../../../CnC/AddedToBag';

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
  sortLabels,
  slpLabels,
  onPickUpOpenClick,
  isFilterBy,
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
              <ModuleA {...moduleAMock.moduleA.composites} ctaType="linkList" fullBleed />
              <ModuleD {...moduleDMock.composites} fullBleed />
              <ModuleG {...moduleGMock.moduleG.composites} />
              <ModuleQ {...moduleQMock.moduleQ.composites} />
              <Recommendations variations="moduleO,moduleP" />
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
                sortLabels={sortLabels}
                slpLabels={slpLabels}
                isFilterBy={isFilterBy}
              />
            </div>
          </Col>
          <Col colSize={{ small: 6, medium: 8, large: 12 }} className="show-count-section">
            <LoadedProductsCount
              totalProductsCount={totalProductsCount}
              showingItemsLabel={slpLabels}
            />
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
            {categoryId ? <SpotlightContainer categoryId={categoryId} /> : null}
          </Col>
        </Col>
      </Row>
      <QuickViewModal onPickUpOpenClick={onPickUpOpenClick} />
      <AddedToBagContainer />
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
  onPickUpOpenClick: PropTypes.func.isRequired,
  sortLabels: PropTypes.arrayOf(PropTypes.shape({})),
  slpLabels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  isFilterBy: PropTypes.bool.isRequired,
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
  sortLabels: [],
  slpLabels: {},
  isFilterBy: true,
};

export default withStyles(ProductListView, ProductListingStyle);
