import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import withStyles from '../../../../../../common/hoc/withStyles';
import ProductListingFiltersFormStyle from '../ProductListingFiltersForm.style';
import CustomSelect from '../../CustomSelect/views';

import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import cssClassName from '../../utils/cssClassName';
import ProductListingMobileFiltersForm from '../../ProductListingMobileFiltersForm';
import Image from '../../../../../../common/atoms/Image';
import { getLocator } from '../../../../../../../utils';
import { FACETS_FIELD_KEY } from '../../../../../../../services/abstractors/productListing/productListing.utils';

/**
 * @function getColorFilterOptionsMap This handles to render the desktop filter fields of color
 * @summary  This is to set the color filters
 * @param {Array} colorOptionsMap - list of color options
 * @param {String} filterName - filter names "color_group_uFilter etc"
 * @param {Boolean} isMobile - check for mobile view
 */
function getColorFilterOptionsMap(colorOptionsMap, filterName, isMobile) {
  return colorOptionsMap.map(color => ({
    value: color.id,
    title: color.displayName,
    content: (
      <div className="color-title">
        <Image
          className="color-chip"
          src={color.imagePath}
          height={color.displayName.toLowerCase() === 'white' ? '18px' : '19px'}
          width={color.displayName.toLowerCase() === 'white' ? '18px' : '19px'}
          alt={color.displayName}
          data-colorname={color.displayName.toLowerCase()}
        />

        {!isMobile && (
          <BodyCopy
            component="span"
            role="option"
            textAlign="center"
            tabIndex={-1}
            fontSize="fs14"
            fontFamily="secondary"
            color="gray.900"
            className="color-name"
            outline="none"
            data-locator={`${getLocator(`plp_filter_color_option_`)}${color.displayName}`}
          >
            {color.displayName}
          </BodyCopy>
        )}
      </div>
    ),
  }));
}

/**
 * @function getFilterOptionsMap This handles to render the desktop filter fields of non-color
 * @summary  This is to set the non-color filters
 * @param {Array} colorOptionsMap - list of non-color options
 * @param {String} filterName - filter names "categoryPath2_uFilter, age_group_uFilter etc"
 * @param {Boolean} isMobile - check for mobile view
 */
function getFilterOptionsMap(optionsMap, filterName) {
  return optionsMap.map(option => ({
    value: option.id,
    title: option.displayName,
    content: (
      <BodyCopy
        component="span"
        role="button"
        textAlign="center"
        tabIndex={-1}
        fontSize="fs14"
        fontFamily="secondary"
        color="gray.900"
        className="size-title"
        outline="none"
        data-locator={`${getLocator(
          `plp_filter_${filterName
            .toLowerCase()
            .split(' ')
            .join('_')}_option_`
        )}${option.displayName}`}
      >
        {option.displayName}
      </BodyCopy>
    ),
  }));
}

class ProductListingFiltersForm extends React.Component {
  // TODO Fix this - would be used while add apply button functionality
  // constructor(props) {
  //   super(props);
  // }

  /**
   * @function renderFilterField
   * @summary This handles to render the color filter fields
   * @param {Object} appliedFilterVal - object of selected filters
   * @param {Object} selectedFilters - object of selected filters
   * @param {String} filterName - filter names "categoryPath2_uFilter, age_group_uFilter etc"
   * @param {String} facetName - filter names "category, color etc"
   */
  renderFilterField(appliedFilterVal, selectedFilters, filterName, facetName) {
    // TODO fix this
    // let { isMobile, filtersMaps } = this.props;

    const isMobile = false;
    const { filtersMaps, labels } = this.props;

    const className = cssClassName(isMobile ? 'size-detail-chips' : 'size-detail');
    return (
      <Field
        name={facetName}
        appliedFilterVal={appliedFilterVal}
        facetName={facetName}
        component={CustomSelect}
        optionsMap={getFilterOptionsMap(filtersMaps[facetName], filterName)}
        title={isMobile ? filterName : ''}
        placeholder={filterName}
        allowMultipleSelections
        className={className}
        expanded={isMobile}
        disableExpandStateChanges={isMobile}
        ref={this.captureFilterRef}
        withRef
        onBlur={this.handleFilterFieldBlur}
        labels={labels}
      />
    );
  }

  /**
   * @function renderColorFilterField This handles to render the color filter fields
   * @param {appliedFilterVal} appliedFilterVal
   * @param {selectedFilters} selectedFilters
   * @param {filterName} filterName - filter names "categoryPath2_uFilter, age_group_uFilter etc"
   * @param {facetName} facetName - filter names "category, color etc"
   */
  renderColorFilterField(appliedFilterVal, selectedFilters, filterName, facetName) {
    const isMobile = false;
    const { filtersMaps, labels } = this.props;

    const className = cssClassName(
      isMobile ? 'color-detail-chips' : 'color-filter-chip size-detail'
    );
    return (
      <Field
        name={facetName}
        appliedFilterVal={appliedFilterVal}
        facetName={facetName}
        component={CustomSelect}
        optionsMap={getColorFilterOptionsMap(filtersMaps[facetName], filterName, isMobile)}
        title={isMobile ? filterName : ''}
        placeholder={filterName}
        allowMultipleSelections
        className={className}
        expanded={isMobile}
        disableExpandStateChanges={isMobile}
        ref={this.captureFilterRef}
        withRef
        onBlur={this.handleFilterFieldBlur}
        labels={labels}
      />
    );
  }

  /**
   * @function renderColorFilterField
   * @summary This handles to render the desktop filter fields
   * @param none
   */
  renderDesktopFilters() {
    const { filtersMaps } = this.props;

    const filterKeys = Object.keys(filtersMaps);
    const isShopByColor = false;
    const filtersLength = {};
    const unbxdKeyMapping = filtersMaps.unbxdDisplayName;
    const appliedFilterAvailable = 0;
    let filterList = {};
    return filterKeys.map(key => {
      if (
        key.toLowerCase() !== FACETS_FIELD_KEY.unbxdDisplayName &&
        key.toLowerCase() !== FACETS_FIELD_KEY.l1category
      ) {
        if (!isShopByColor && key.toLowerCase() === FACETS_FIELD_KEY.color) {
          filterList =
            filtersMaps[key].length > 0 &&
            this.renderColorFilterField(
              appliedFilterAvailable,
              filtersLength[`${key}Filters`],
              unbxdKeyMapping[key],
              key
            );
        } else {
          filterList =
            filtersMaps[key].length > 0 &&
            this.renderFilterField(
              appliedFilterAvailable,
              filtersLength[`${key}Filters`],
              unbxdKeyMapping[key],
              key
            );
        }
        return filterList;
      }

      return false;
    });
  }

  render() {
    const { className, labels, totalProductsCount, initialValues, filtersMaps } = this.props;
    return (
      <React.Fragment>
        <form className="render-desktop-view">
          <div className={`${className} desktop-dropdown`}>
            <div className="filters-only-container">
              <BodyCopy
                component="span"
                role="option"
                textAlign="center"
                tabIndex={-1}
                fontSize="fs14"
                fontFamily="secondary"
                color="gray.900"
                outline="none"
                data-locator={getLocator('plp_filter_label_filterby')}
              >
                {`${labels.lbl_filter_by}:`}
              </BodyCopy>

              {filtersMaps && this.renderDesktopFilters()}
            </div>
          </div>
        </form>
        <ProductListingMobileFiltersForm
          totalProductsCount={totalProductsCount}
          initialValues={initialValues}
          filtersMaps={filtersMaps}
          className="render-mobile-view"
          labels={labels}
        />
      </React.Fragment>
    );
  }
}

ProductListingFiltersForm.propTypes = {
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  className: PropTypes.string,
  filtersMaps: PropTypes.shape({}),
  totalProductsCount: PropTypes.string,
  initialValues: PropTypes.shape({}),
};

ProductListingFiltersForm.defaultProps = {
  filtersMaps: {},
  labels: {},
  className: '',
  totalProductsCount: '0',
  initialValues: {},
};
export default reduxForm({
  form: 'filter-form', // a unique identifier for this form
})(withStyles(ProductListingFiltersForm, ProductListingFiltersFormStyle));

export { ProductListingFiltersForm as ProductListingFiltersFormVanilla };
