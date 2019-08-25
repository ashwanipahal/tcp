/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import ProductListingFiltersFormStyle from '../ProductListingFiltersForm.style';
import CustomSelect from '../../CustomSelect/views';
import { reduxForm, Field, submit } from 'redux-form';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import cssClassName from '../../utils/cssClassName';
import Image from '../../../../../../common/atoms/Image';
import { getLocator } from '../../../../../../../utils';

class ProductListingFiltersForm extends React.Component {
  constructor(props) {
    super(props);
  }

  renderFilterField(appliedFilterVal, selectedFilters, filterName, facetName) {
    //let { isMobile, filtersMaps } = this.props;
    let isMobile = false;
    //console.log(this.props.filters);
    let filtersMaps = this.props.filters;
    let className = cssClassName(isMobile ? 'size-detail-chips' : 'size-detail');
    let filters = (
      <Field
        name={facetName}
        appliedFilterVal={appliedFilterVal}
        facetName={facetName}
        component={CustomSelect}
        optionsMap={getFilterOptionsMap(filtersMaps[facetName], filterName, isMobile)}
        title={isMobile ? filterName : ''}
        placeholder={filterName}
        allowMultipleSelections
        className={className}
        expanded={isMobile}
        disableExpandStateChanges={isMobile}
        ref={this.captureFilterRef}
        withRef
        onBlur={this.handleFilterFieldBlur}
        labels={this.props.labels}
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
    let filtersMaps = this.props.filters;
    let className = cssClassName(isMobile ? 'color-detail-chips' : 'color-filter-chip size-detail');
    let colorFilters = (
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
        labels={this.props.labels}
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
    const filterKeys = Object.keys(this.props.filters);
    let isShopByColor = false;
    let filtersLength = {};
    let filtersMaps = this.props.filters;
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
    return (
      <form>
        <div className={this.props.className}>
          <div className="filters-only-container">
            <BodyCopy
              component="span"
              role="label"
              textAlign="center"
              tabIndex={-1}
              fontSize="fs14"
              fontFamily="secondary"
              color="gray.900"
              outline="none"
              data-locator={getLocator('plp_filter_label_filterby')}
            >
              {this.props.labels.lbl_filter_by}:
            </BodyCopy>

            {this.props.filters && this.renderDesktopFilters()}
          </div>
        </div>
      </form>
    );
  }
}
function getColorFilterOptionsMap(colorOptionsMap, filterName, isMobile) {
  let result = colorOptionsMap.map(color => ({
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
            role="label"
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
function getFilterOptionsMap(optionsMap, filterName, isMobile) {
  let result = optionsMap.map(option => ({
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
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
};

ProductListingFiltersForm.defaultProps = {
  filters: {},
  labels: {},
};
export default reduxForm({
  form: 'filter-form', // a unique identifier for this form
})(withStyles(ProductListingFiltersForm, ProductListingFiltersFormStyle));
