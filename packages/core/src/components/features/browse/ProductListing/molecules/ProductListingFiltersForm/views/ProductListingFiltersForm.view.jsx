import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import withStyles from '../../../../../../common/hoc/withStyles';
import ProductListingFiltersFormStyle from '../ProductListingFiltersForm.style';
import CustomSelect from '../../CustomSelect/views';

import { BodyCopy, Col, Row } from '../../../../../../common/atoms';
import cssClassName from '../../utils/cssClassName';
import ProductListingMobileFiltersForm from '../../ProductListingMobileFiltersForm';
import Image from '../../../../../../common/atoms/Image';
import { getLocator } from '../../../../../../../utils';
import AppliedFiltersList from '../../AppliedFiltersList';
import { FACETS_FIELD_KEY } from '../../../../../../../services/abstractors/productListing/productListing.utils';
import SortSelector from '../../SortSelector';
import { DESCRIPTION_FILTER } from '../../../container/ProductListing.constants';
import getSortOptions from '../../SortSelector/views/Sort.util';
import LoadedProductsCount from '../../LoadedProductsCount/views';

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
function getFilterOptionsMap(optionsMap) {
  return optionsMap.map(option => ({
    value: option.id,
    title: option.displayName,
    disabled: option.disabled,
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
      >
        {option.displayName}
      </BodyCopy>
    ),
  }));
}

function getSortCustomOptionsMap(sortOptionsMap) {
  return sortOptionsMap.map(sortOption => ({
    value: sortOption.id,
    title: (
      <BodyCopy
        component="span"
        className="sort-item-selected"
        fontSize="fs13"
        fontFamily="secondary"
        fontWeight="extrabold"
      >
        {sortOption.displayName}
      </BodyCopy>
    ),
    content: (
      <BodyCopy component="span" className="sort-title" fontSize="fs14" fontFamily="secondary">
        {sortOption.displayName}
      </BodyCopy>
    ),
  }));
}

class ProductListingFiltersForm extends React.Component {
  /**
   * @constructor for this class
   * @param {object} props props to the constructor
   */
  constructor(props) {
    super(props);
    this.filterRef = [];
    this.state = {
      isOpenFilterSection: false,
    };

    this.handleSubmitOnChange = this.handleSubmitOnChange.bind(this);
    this.handleRemoveFilter = this.handleRemoveFilter.bind(this);
    this.handleRemoveAllFilters = this.handleRemoveAllFilters.bind(this);
    this.handleImmediateSubmit = this.handleImmediateSubmit.bind(this);
  }

  /**
   * @function getAppliedFiltersCount This handles to get applied filter count.
   */
  getAppliedFiltersCount() {
    const { initialValues } = this.props;
    let count = 0;

    // returns count for the applied filters.
    // eslint-disable-next-line
    for (let key in initialValues) {
      count += key.toLowerCase() !== FACETS_FIELD_KEY.sort ? initialValues[key].length : 0;
    }
    return count;
  }

  captureFilterRef = ref => {
    if (!ref) return;
    const typeRef = ref.getRenderedComponent();
    typeRef.filterRefType = ref.props.name;
    this.filterRef.push(typeRef);
  };

  /**
   * @function handleSubmitOnChange This handles to submit remove filters call.
   */
  handleSubmitOnChange() {
    const { submitting, onSubmit, getProducts } = this.props;
    if (submitting) return;

    this.filterRef.forEach(filter => {
      if (filter.filterRefType !== DESCRIPTION_FILTER) filter.closeMenu();
    });

    // Observe that since submission can occur by capturing the change events in the CustomSelects of the form
    // we need to wait for the next event loop for the value in the redux-store to reflect the ones in the fields
    setTimeout(() => {
      // DT-31958
      // Need to get form values from props / redux-store and compare to the previous values
      // eslint-disable-next-line react/prop-types
      const { formValues } = this.props;
      return onSubmit(formValues, false, getProducts);
    });
  }

  /**
   * @function handleRemoveFilter remove single filter
   * @param {String} fieldName - field name to be removed
   * @param {number} filterId - id to be removed
   */
  handleRemoveFilter(fieldName, filterId) {
    const { change, initialValues, handleSubmit } = this.props;
    change(fieldName, initialValues[fieldName].filter(entryId => entryId !== filterId));
    handleSubmit(this.handleSubmitOnChange);
  }

  /**
   * @function handleRemoveAllFilters remove all filters
   * @param void
   */
  handleRemoveAllFilters() {
    const { change, initialValues } = this.props;
    // eslint-disable-next-line no-restricted-syntax
    for (const key in initialValues) {
      if (key !== 'sort') {
        change(key, []);
      }
    }
    this.handleSubmitOnChange();
    return true;
  }

  /**
   * @function handleImmediateSubmit submit filter call
   * @param {Object} formValues - form value for filter to be applied
   */
  handleImmediateSubmit(formValues) {
    const { submitting, onSubmit, getProducts } = this.props;
    if (submitting) return;

    this.filterRef.forEach(filter => {
      if (filter.filterRefType !== DESCRIPTION_FILTER) filter.closeMenu();
    });

    // eslint-disable-next-line consistent-return
    return onSubmit(formValues, false, getProducts);
  }

  /**
   * @function renderFilterField
   * @summary This handles to render the color filter fields
   * @param {Object} appliedFilterVal - object of selected filters
   * @param {Object} selectedFilters - object of selected filters
   * @param {String} filterName - filter names "categoryPath2_uFilter, age_group_uFilter etc"
   * @param {String} facetName - filter names "category, color etc"
   */

  renderFilterField(appliedFilterVal, selectedFilters, filterName, facetName) {
    const { filtersMaps, labels, isFavoriteView, onFilterSelection } = this.props;
    return (
      <Field
        name={facetName}
        appliedFilterVal={appliedFilterVal}
        facetName={facetName}
        component={CustomSelect}
        optionsMap={getFilterOptionsMap(filtersMaps[facetName])}
        title=""
        placeholder={filterName}
        allowMultipleSelections={!isFavoriteView}
        className="size-detail-chips"
        expanded={false}
        disableExpandStateChanges={false}
        ref={this.captureFilterRef}
        withRef
        forwardRef
        labels={labels}
        onFilterSelection={onFilterSelection}
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
        forwardRef
        labels={labels}
      />
    );
  }

  /**
   * @function renderDesktop renders the filter view for desktop
   * @param {Object} appliedFilters - filters if already applied
   */
  renderFilters(appliedFilters) {
    const {
      filtersMaps,
      totalProductsCount,
      handleSubmit,
      colorSeqMap,
      labels,
      className,
      initialValues,
      onSubmit,
      sortLabels,
      slpLabels,
      isFilterBy,
      favoriteSortingParams,
      onSortSelection,
      defaultPlaceholder,
      isFavoriteView,
    } = this.props;
    const filterKeys = Object.keys(filtersMaps);

    const sortOptions = favoriteSortingParams || getSortOptions(sortLabels);

    return (
      <div className="filter-and-sort-form-container">
        {/* {totalProductsCount > 0 && <ProductListingCount currentSearchTerm={currentSearchTerm} isMobile={false} totalProductsCount={totalProductsCount} isShowAllEnabled={false} />} NOTE: FPO isShowAllEnabled */}
        <form className="render-desktop-view" onSubmit={handleSubmit(this.handleImmediateSubmit)}>
          {totalProductsCount > 0 && (
            <div className={`${className} desktop-dropdown`}>
              <div className="filters-only-container">
                {isFilterBy && (
                  <BodyCopy
                    component="span"
                    role="option"
                    textAlign="center"
                    tabIndex={0}
                    fontSize="fs14"
                    fontFamily="secondary"
                    color="gray.900"
                    outline="none"
                    data-locator={getLocator('plp_filter_label_filterby')}
                  >
                    {`${labels.lbl_filter_by}`}
                  </BodyCopy>
                )}

                {filtersMaps && this.renderDesktopFilters(filterKeys, appliedFilters)}
              </div>
              <div className="sort-selector-wrapper">
                <SortSelector
                  isMobile={false}
                  defaultPlaceholder={defaultPlaceholder}
                  sortSelectOptions={getSortCustomOptionsMap(sortOptions)}
                  onChange={
                    isFavoriteView
                      ? handleSubmit(this.handleSubmitOnChange)
                      : selectedOption => onSortSelection(selectedOption)
                  }
                />
              </div>
            </div>
          )}
          <Row fullBleed className="filtered-by-section">
            <Col colSize={{ small: 0, medium: 0, large: 10 }}>
              {this.getAppliedFiltersCount() > 0 && (
                <AppliedFiltersList
                  auxColorMap={colorSeqMap}
                  onRemoveFilter={this.handleRemoveFilter}
                  appliedFilters={appliedFilters}
                  removeAllFilters={this.handleRemoveAllFilters}
                  className={className}
                  labels={labels}
                  totalProductsCount={totalProductsCount}
                />
              )}
            </Col>
            <Col colSize={{ small: 6, medium: 8, large: 2 }}>
              <LoadedProductsCount
                totalProductsCount={totalProductsCount}
                showingItemsLabel={slpLabels}
              />
            </Col>
          </Row>
        </form>
        <div className="render-mobile-view">
          <ProductListingMobileFiltersForm
            totalProductsCount={totalProductsCount}
            initialValues={initialValues}
            filtersMaps={filtersMaps}
            className={className}
            labels={labels}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            handleImmediateSubmit={this.handleImmediateSubmit}
            removeAllFilters={this.handleRemoveAllFilters}
            handleSubmitOnChange={this.handleSubmitOnChange}
            sortLabels={sortLabels}
            isFavoriteView={isFavoriteView}
            favoriteSortingParams={favoriteSortingParams}
            onSortSelection={onSortSelection}
          />
        </div>
        {/* {submitting && <Spinner className="loading-more-product">Updating...</Spinner>} */}
      </div>
    );
  }

  /**
   * @function renderDesktopFilters
   * @summary This handles to render the desktop filter fields
   * @param none
   */
  renderDesktopFilters(filterKeys, appliedFilters) {
    const { filtersMaps, filtersLength, isFavoriteView } = this.props;
    const unbxdKeyMapping = filtersMaps.unbxdDisplayName;
    const appliedFilterAvailable = this.getAppliedFiltersCount();
    let filterList = {};
    return filterKeys.map(key => {
      if (
        key.toLowerCase() !== FACETS_FIELD_KEY.unbxdDisplayName &&
        key.toLowerCase() !== FACETS_FIELD_KEY.l1category
      ) {
        if (key.toLowerCase() === FACETS_FIELD_KEY.color) {
          filterList =
            filtersMaps[key].length > 0 &&
            this.renderColorFilterField(
              appliedFilterAvailable && appliedFilters[key],
              filtersLength[`${key}Filters`],
              unbxdKeyMapping[key],
              key
            );
        } else {
          filterList =
            filtersMaps[key].length > 0 &&
            this.renderFilterField(
              appliedFilterAvailable && appliedFilters[key],
              !isFavoriteView ? filtersLength[`${key}Filters`] : 'Display',
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
    const { initialValues, filtersMaps } = this.props;

    const appliedFilters = [];

    // eslint-disable-next-line
    for (let key in initialValues) {
      const selectedFacet = filtersMaps[key]
        ? initialValues[key].map(filterId =>
            filtersMaps[key].find(filter => filterId === filter.id)
          )
        : [];
      appliedFilters.push(selectedFacet);
    }

    return <Fragment>{this.renderFilters(appliedFilters)}</Fragment>;
  }
}

ProductListingFiltersForm.propTypes = {
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  className: PropTypes.string,
  filtersMaps: PropTypes.shape({}),
  totalProductsCount: PropTypes.string,
  initialValues: PropTypes.shape({}),
  filtersLength: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number])),
  handleSubmit: PropTypes.func.isRequired,
  colorSeqMap: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  submitting: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  change: PropTypes.func,
  sortLabels: PropTypes.arrayOf(PropTypes.shape({})),
  slpLabels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  isFilterBy: PropTypes.bool,
  isFavoriteView: PropTypes.bool,
  onFilterSelection: PropTypes.func,
  favoriteSortingParams: PropTypes.shape({}),
  onSortSelection: PropTypes.func,
  defaultPlaceholder: PropTypes.string,
};

ProductListingFiltersForm.defaultProps = {
  filtersMaps: {},
  labels: {},
  className: '',
  totalProductsCount: '0',
  initialValues: {},
  filtersLength: {},
  colorSeqMap: {},
  submitting: false,
  change: () => null,
  sortLabels: [],
  slpLabels: {},
  isFilterBy: true,
  isFavoriteView: false,
  onFilterSelection: () => null,
  defaultPlaceholder: '',
  onSortSelection: () => null,
  favoriteSortingParams: null,
};
export default reduxForm({
  form: 'filter-form', // a unique identifier for this form
  enableReinitialize: true,
})(withStyles(ProductListingFiltersForm, ProductListingFiltersFormStyle));

export { ProductListingFiltersForm as ProductListingFiltersFormVanilla };
