import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import withStyles from '../../../../../../common/hoc/withStyles';
import ProductListingMobileFiltersFormStyle from '../styles/ProductListingMobileFiltersForm.style';
import CustomSelect from '../../CustomSelect/views';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Image from '../../../../../../common/atoms/Image';
import cssClassName from '../../utils/cssClassName';
import AccordionList from '../../../../../../common/molecules/AccordionList';
import FilterModal from '../../FilterModal/views';
import { Row, Col, Button } from '../../../../../../common/atoms';
import { getLocator } from '../../../../../../../utils';
import { FACETS_FIELD_KEY } from '../../../../../../../services/abstractors/productListing/productListing.utils';

// @flow
type Props = {
  initialValues: any,
  className: any,
  filtersLength: any,
  filtersMaps: any,
};

/**
 * @function getColorFilterOptionsMap This handles to render the desktop filter fields of color
 * @summary  This is to set the color filters
 * @param {Array} colorOptionsMap - list of color options
 */
const getColorFilterOptionsMap = colorOptionsMap => {
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
        <BodyCopy
          component="span"
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
      </div>
    ),
  }));
};

/**
 * @function getFilterOptionsMap This handles to render the desktop filter fields of non-color
 * @summary  This is to set the non-color filters
 * @param {Array} optionsMap - list of non-color options
 */
const getFilterOptionsMap = optionsMap => {
  return optionsMap.map(option => ({
    value: option.id,
    title: option.displayName,
    content: <span className="size-title">{option.displayName}</span>,
  }));
};

class ProductListingMobileFiltersForm extends React.PureComponent<Props> {
  constructor(props) {
    super(props);

    this.state = {
      isOpenFilterSection: false,
      show: false,
    };
  }

  /**
   * @function isUnbxdFacetKey
   * @summary This handles to render the desktop filter fields
   * @param {Array} key - list of filter options
   */
  isUnbxdFacetKey = key =>
    key.toLowerCase() !== FACETS_FIELD_KEY.unbxdDisplayName &&
    key.toLowerCase() !== FACETS_FIELD_KEY.sort &&
    key !== FACETS_FIELD_KEY.l1category;

  /**
   * @function hideModal
   * @summary This handles to render the desktop filter fields
   * @param none
   */
  hideModal = () => {
    this.setState({ show: false });
  };

  /**
   * @function showModal
   * @summary This handles to render the desktop filter fields
   * @param none
   */
  showModal = () => {
    this.setState({ show: true });
  };

  /**
   * @function toggleFilterIcon
   * @summary This handles to render the desktop filter fields
   * @param none
   */
  toggleFilterIcon = () => {
    const { isOpenFilterSection } = this.state;
    this.setState({ isOpenFilterSection: !isOpenFilterSection });
  };

  /**
   * @function renderFilterField
   * @summary This handles to render the color filter fields
   * @param {Object} selectedFilters - object of selected filters
   * @param {String} filterName - filter names "categoryPath2_uFilter, age_group_uFilter etc"
   * @param {String} facetName - filter names "category, color etc"
   */
  renderFilterField(selectedFilters, filterName, facetName) {
    const { filtersMaps } = this.props;
    const optionsMap = getFilterOptionsMap(filtersMaps[facetName]);

    const className = 'item-list-collapsible item-list-collapsible-expanded size-detail-chips';

    return (
      <Field
        name={facetName}
        component={CustomSelect}
        optionsMap={optionsMap}
        placeholder={filterName}
        allowMultipleSelections
        className={className}
        expanded
        disableExpandStateChanges
      />
    );
  }

  /**
   * @function renderColorFilterField This handles to render the color filter fields
   * @param {selectedFilters} selectedFilters
   * @param {filterName} filterName - filter names "categoryPath2_uFilter, age_group_uFilter etc"
   * @param {facetName} facetName - filter names "category, color etc"
   */
  renderColorFilterField(selectedFilters, filterName, facetName) {
    const { filtersMaps, labels } = this.props;
    const className = 'color-filter-chip size-detail';
    return (
      <Field
        name={facetName}
        facetName={facetName}
        component={CustomSelect}
        optionsMap={getColorFilterOptionsMap(filtersMaps[facetName])}
        title=""
        placeholder={filterName}
        allowMultipleSelections
        className={className}
        expanded
        disableExpandStateChanges
        ref={this.captureFilterRef}
        withRef
        onBlur={this.handleFilterFieldBlur}
        labels={labels}
      />
    );
  }

  /**
   * @function renderMobilePlpFilterForm
   * @summary This handles to render the desktop filter fields
   * @param none
   */
  renderMobilePlpFilterForm() {
    return <div className="filters-sorting-container">{this.renderMobileFilters()}</div>;
  }

  /**
   * @function renderMobileFilters
   * @summary This handles to render the desktop filter fields
   * @param none
   */
  renderMobileFilters() {
    const { filtersMaps, filtersLength, className } = this.props;
    const filterKeys = Object.keys(filtersMaps);
    const unbxdKeyMapping = filtersMaps.unbxdDisplayName;
    const accordionItems = [];
    const { show } = this.state;

    filterKeys.map(key => {
      if (this.isUnbxdFacetKey(key)) {
        const titleKey = {
          header: {
            title: unbxdKeyMapping[key],
          },
        };
        accordionItems.push(titleKey);
      }
      return false;
    });

    return (
      <Col
        colSize={{
          large: 12,
          medium: 8,
          small: 6,
        }}
        ignoreGutter={{ small: true, medium: true }}
      >
        <AccordionList accordionItems={accordionItems} className={className} show={show}>
          {/* eslint-disable */}
          {filterKeys.map(key => {
            if (key.toLowerCase() === FACETS_FIELD_KEY.color) {
              const length = (filtersLength && filtersLength[`${key}Filters`]) || 0;
              return (
                filtersMaps[key].length > 0 &&
                this.renderColorFilterField(length, unbxdKeyMapping[key], key)
              );
            } else if (this.isUnbxdFacetKey(key)) {
              const length = (filtersLength && filtersLength[`${key}Filters`]) || 0;
              return (
                filtersMaps[key].length > 0 &&
                this.renderFilterField(length, unbxdKeyMapping[key], key)
              );
            }
          })}
        </AccordionList>
      </Col>
    );
  }

  render() {
    const { initialValues, filtersMaps, className, labels } = this.props;
    const { isOpenFilterSection, show } = this.state;
    // const selectedFiltersCount = this.getSelectedFiltersCount();
    const appliedFilters = [];

    const classNames = cssClassName(
      'open-filter-button ',
      isOpenFilterSection && 'open-filter-button-expanded'
    );

    for (let key in initialValues) {
      if (Object.prototype.hasOwnProperty.call(initialValues, key)) {
        const selectedFacet = filtersMaps[key]
          ? initialValues[key].map(filterId =>
              filtersMaps[key].find(filter => filterId === filter.id)
            )
          : [];
        appliedFilters.push(selectedFacet);
      }
    }

    return (
      <React.Fragment>
        <FilterModal
          show={show}
          handleClose={this.hideModal}
          classNames={classNames}
          labels={labels}
        >
          <div className={`${className} new-filter-and-sort-form-container`}>
            <form className="available-filters-sorting-container">
              {this.renderMobilePlpFilterForm()}
            </form>
          </div>
        </FilterModal>
        <Row centered className={`filter-row ${className}`}>
          <Col
            colSize={{
              small: 3,
              medium: 3,
              large: 3,
            }}
          >
            <Button
              buttonVariation="fixed-width"
              type="button"
              className={classNames}
              data-locator="view_gallery_button"
              onClick={this.showModal}
            >
              {labels.lbl_filter}
            </Button>
          </Col>
          <Col
            colSize={{
              small: 3,
              medium: 3,
              large: 3,
            }}
          >
            <Button
              buttonVariation="fixed-width"
              type="button"
              className="open-filter-button"
              data-locator="view_gallery_button"
            >
              {labels.lbl_sort}
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

ProductListingMobileFiltersForm.propTypes = {
  filtersMaps: PropTypes.shape({
    age_group_uFilter: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  labels: PropTypes.shape({
    lbl_sort: PropTypes.string,
  }),
};

ProductListingMobileFiltersForm.defaultProps = {
  filtersMaps: {},
  labels: {},
};
export default reduxForm({
  form: 'filter-form', // a unique identifier for this form
})(withStyles(ProductListingMobileFiltersForm, ProductListingMobileFiltersFormStyle));

export { ProductListingMobileFiltersForm as ProductListingMobileFiltersFormVanilla };
