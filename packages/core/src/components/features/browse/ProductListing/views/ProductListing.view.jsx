import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext, ThemeProvider } from 'styled-components';

import { Row, Col } from '../../../../common/atoms';

import ModuleA from '../../../../common/molecules/ModuleA';
import ModuleD from '../../../../common/molecules/ModuleD';
import ModuleG from '../../../../common/molecules/ModuleG';
import ModuleQ from '../../../../common/molecules/ModuleQ';
import ModuleO from '../../../../common/molecules/ModuleO';
import ModuleP from '../../../../common/molecules/ModuleP';
import moduleAMock from '../../../../../services/abstractors/common/moduleA/mock';
import moduleDMock from '../../../../../services/abstractors/common/moduleD/mock';
import moduleGMock from '../../../../../services/abstractors/common/moduleG/mock';
import moduleQMock from '../../../../../services/abstractors/common/moduleQ/mock';
// import moduleOMock from '../../../../../services/abstractors/common/moduleO/mock';

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
  ...otherProps
}) => {
  const themeContext = useContext(ThemeContext);

  const largeBreakpoint = 1440;
  const promoModulesTheme = {
    ...themeContext,
    breakpoints: {
      ...themeContext.breakpoints,
      large: `${largeBreakpoint}px`,
      values: { ...themeContext.breakpoints.values, lg: largeBreakpoint },
    },
    mediaQuery: {
      ...themeContext.mediaQuery,
      large: `(min-width: ${largeBreakpoint}px)`,
    },
  };
  console.info(moduleDMock, '----');

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
              <ThemeProvider theme={() => promoModulesTheme}>
                <>
                  <ModuleA {...moduleAMock.moduleA.composites} ctaType="stackedCTAButtons" />
                  <ModuleD {...moduleDMock.composites} />
                  <ModuleG {...moduleGMock.moduleG.composites} />
                  <ModuleQ {...moduleQMock.moduleQ.composites} />
                </>
              </ThemeProvider>
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
            <SpotlightContainer categoryId={categoryId} />
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
};

export default withStyles(ProductListView, ProductListingStyle);
