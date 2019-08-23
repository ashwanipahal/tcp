/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import ProductListingFiltersFormStyle from '../ProductListingFiltersForm.style';
import CustomSelect from '../../CustomSelect/views';
import { reduxForm, Field, submit } from 'redux-form';
import BodyCopy from '../../../../../../../../../core/src/components/common/atoms/BodyCopy';
import cssClassName from '../../utils/cssClassName';
import ProductListingMobileFiltersForm from '../../ProductListingMobileFiltersForm';

class ProductListingFiltersForm extends React.Component {
  constructor(props) {
    super(props);
  }

  renderFilterField(appliedFilterVal, selectedFilters, filterName, facetName) {
    //let { isMobile, filtersMaps } = this.props;
    let isMobile = false;
    //console.log(this.props.filters);
    let filtersMaps = this.props.filtersMaps;
    let className = cssClassName(isMobile ? 'size-detail-chips' : 'size-detail');
    let filters = (
      <Field
        name={facetName}
        appliedFilterVal={appliedFilterVal}
        facetName={facetName}
        component={CustomSelect}
        optionsMap={getFilterOptionsMap(filtersMaps[facetName], isMobile)}
        title={isMobile ? filterName : ''}
        placeholder={filterName}
        allowMultipleSelections
        className={className}
        expanded={isMobile}
        disableExpandStateChanges={isMobile}
        ref={this.captureFilterRef}
        withRef
        onBlur={this.handleFilterFieldBlur}
      />
    );

    return !isMobile ? (
      filters
    ) : (
      <div className="filter-size-and-color-container">
        {filters}
        {!!selectedFilters && (
          <button
            type="button"
            className="clear-all-size-plp-filters"
            id={facetName}
            onClick={this.handleRemoveFilters}
          >
            X Clear
          </button>
        )}
      </div>
    );
  }

  renderColorFilterField(appliedFilterVal, selectedFilters, filterName, facetName) {
    //let { isMobile, filtersMaps } = this.props;
    let isMobile = false;
    //console.log(this.props.filters);
    let filtersMaps = this.props.filtersMaps;
    let className = cssClassName(isMobile ? 'color-detail-chips' : 'color-filter-chip size-detail');
    let colorFilters = (
      <Field
        name={facetName}
        appliedFilterVal={appliedFilterVal}
        facetName={facetName}
        component={CustomSelect}
        optionsMap={getColorFilterOptionsMap(filtersMaps[facetName], isMobile)}
        title={isMobile ? filterName : ''}
        placeholder={filterName}
        allowMultipleSelections
        className={className}
        expanded={isMobile}
        disableExpandStateChanges={isMobile}
        ref={this.captureFilterRef}
        withRef
        onBlur={this.handleFilterFieldBlur}
      />
    );

    return !isMobile ? (
      colorFilters
    ) : (
      <div className="filter-size-and-color-container">
        {colorFilters}
        {!!selectedFilters && (
          <button
            type="button"
            className="clear-all-color-plp-filters"
            id={facetName}
            onClick={this.handleRemoveFilters}
          >
            X Clear
          </button>
        )}
      </div>
    );
  }
  renderDesktopFilters() {
    const FACETS_FIELD_KEY = {
      color: 'tcpcolor_ufilter',
      size: 'v_tcpsize_ufilter',
      age: 'age_group_ufilter',
      price: 'unbxd_price_range_ufilter',
      sort: 'sort',
      unbxdDisplayName: 'unbxddisplayname',
      aux_color: 'auxdescription_ufilter',
      aux_color_unbxd: 'auxdescription_uFilter',
      l1category: 'l1category',
    };
    //let { filtersMaps, filtersLength, isShopByColor } = this.props;
    const filterKeys = Object.keys(this.props.filtersMaps);
    let isShopByColor = false;
    let filtersLength = {};
    let filtersMaps = this.props.filtersMaps;
    const unbxdKeyMapping = filtersMaps.unbxdDisplayName;
    const appliedFilterAvailable = 0;
    return filterKeys.map(key => {
      if (
        key.toLowerCase() !== FACETS_FIELD_KEY.unbxdDisplayName &&
        key.toLowerCase() !== FACETS_FIELD_KEY.l1category
      ) {
        if (!isShopByColor && key.toLowerCase() === FACETS_FIELD_KEY.color) {
          // If color facet then render differently compared to others
          return (
            filtersMaps[key].length > 0 &&
            this.renderColorFilterField(
              appliedFilterAvailable && appliedFilters[key],
              filtersLength[key + 'Filters'],
              unbxdKeyMapping[key],
              key
            )
          );
        } else if (
          !(
            key.toLowerCase() === FACETS_FIELD_KEY.color ||
            key.toLowerCase() === FACETS_FIELD_KEY.aux_color
          )
        ) {
          return (
            filtersMaps[key].length > 0 &&
            this.renderFilterField(
              appliedFilterAvailable && appliedFilters[key],
              filtersLength[key + 'Filters'],
              unbxdKeyMapping[key],
              key
            )
          );
        }
      }
      return false;
    });
  }

  render() {
    const { totalProductsCount, initialValues, filtersMaps } = this.props;
    return (
      <React.Fragment>
        <form className="render-desktop-view">
          <div className={this.props.className}>
            <div className="filters-only-container">
              {<span className="filter-title">Filter By:</span>}

              {this.props.filtersMaps && this.renderDesktopFilters()}
            </div>
          </div>
        </form>
        <ProductListingMobileFiltersForm
          totalProductsCount={totalProductsCount}
          initialValues={initialValues}
          filtersMaps={filtersMaps}
          className="render-mobile-view"
        />
      </React.Fragment>
    );
  }
}
function getColorFilterOptionsMap(colorOptionsMap, isMobile) {
  let result = colorOptionsMap.map(color => ({
    value: color.id,
    title: color.displayName,
    content: (
      <div className="color-title">
        <img
          className="color-chip"
          data-colorname={color.displayName.toLowerCase()}
          alt={color.displayName}
          src={color.imagePath}
        />
        {!isMobile && <span className="color-name">{color.displayName}</span>}
      </div>
    ),
  }));
  return result;
}

function getFilterOptionsMap(optionsMap, isMobile) {
  let result = optionsMap.map(option => ({
    value: option.id,
    title: option.displayName,
    content: (
      <BodyCopy
        component="span"
        role="label"
        textAlign="center"
        tabIndex={-1}
        fontSize="fs14"
        fontFamily="secondary"
        color="gray.900"
        className="size-title"
        outline="none"
      >
        {option.displayName}
      </BodyCopy>
    ),
  }));
  return result;
  // !isMobile
  //   ? result.concat([
  //       {
  //         value: 'APPLY',
  //         title: 'Apply',
  //         content: (
  //           <button type="submit" className="apply-filter-button">
  //             Apply
  //           </button>
  //         ),
  //         disabled: true,
  //       },
  //     ])
  //   : result;
}
ProductListingFiltersForm.propTypes = {
  filters: PropTypes.shape({}),
};

ProductListingFiltersForm.defaultProps = {
  filters: {},
};
export default reduxForm({
  form: 'filter-form', // a unique identifier for this form
})(withStyles(ProductListingFiltersForm, ProductListingFiltersFormStyle));
