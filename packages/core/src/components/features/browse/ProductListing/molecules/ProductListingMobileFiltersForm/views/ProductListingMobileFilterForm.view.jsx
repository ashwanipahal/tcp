/* eslint-disable max-lines */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import DamImage from '../../../../../../common/atoms/DamImage';
import withStyles from '../../../../../../common/hoc/withStyles';
import ProductListingMobileFiltersFormStyle from '../styles/ProductListingMobileFiltersForm.style';
import CustomSelect from '../../CustomSelect/views';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Image from '../../../../../../common/atoms/Image';
import cssClassName from '../../utils/cssClassName';
import AccordionList from '../../../../../../common/molecules/AccordionList';
import { Row, Col, Button } from '../../../../../../common/atoms';
import { getLocator } from '../../../../../../../utils';
import SortSelector from '../../SortSelector';
import getSortOptions from '../../SortSelector/views/Sort.util';
import { FACETS_FIELD_KEY } from '../../../../../../../services/abstractors/productListing/productListing.utils';
import AppliedFiltersList from '../../AppliedFiltersList';

// @flow
type Props = {
  initialValues: any,
  className: any,
  filtersLength: any,
  filtersMaps: any,
};

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
/**
 * @function getColorFilterOptionsMap This handles to render the desktop filter fields of color
 * @summary  This is to set the color filters
 * @param {Array} colorOptionsMap - list of color options
 */
const getColorFilterOptionsMap = colorOptionsMap => {
  return colorOptionsMap.map(color => {
    const swatchUrl = color.swatchImage;
    const swatchImagePath = swatchUrl && swatchUrl.split('_');
    const imgUrl = swatchImagePath
      ? `${swatchImagePath[0]}/${swatchImagePath[0]}_${swatchImagePath[1]}`
      : '';
    const imgData = { alt: color.displayName, url: imgUrl };
    const imgConfig = `w_50,h_50,c_thumb,g_auto:0`;
    const imgDataConfig = [`${imgConfig}`, `${imgConfig}`, `${imgConfig}`];
    const whiteColorClass = color.displayName.toLowerCase() === 'white';
    return {
      value: color.id,
      title: color.displayName,
      content: (
        <div className="color-title">
          <DamImage
            className={`color-chip ${whiteColorClass ? 'white-color-class' : ''}`}
            imgData={imgData}
            isProductImage
            imgConfigs={imgDataConfig}
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
    };
  });
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
    disabled: option.disabled,
    content: <span className="size-title">{option.displayName}</span>,
  }));
};

class ProductListingMobileFiltersForm extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.filterRef = [];
    this.state = {
      isOpenFilterSection: false,
      show: false,
      isSortOpenModal: false,
    };
    this.customSelect = null;
  }

  componentDidMount() {
    this.customSelect = document.querySelector('.available-filters-sorting-container');
    this.filterSelect = document.querySelector('.filter-row');
    this.filterBySection = document.querySelector('.filtered-by-section');
    window.addEventListener('click', this.closeDropdownIfClickOutside);
  }

  /**
   * @function getAppliedFiltersCount This gets the applied filter count
   */
  getAppliedFiltersCount() {
    const { initialValues } = this.props;
    let count = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const key in initialValues) {
      if (Object.prototype.hasOwnProperty.call(initialValues, key)) {
        count +=
          key !== FACETS_FIELD_KEY.sort && key !== FACETS_FIELD_KEY.aux_color_unbxd
            ? initialValues[key].length
            : 0;
      }
    }
    return count;
  }

  /**
   * @function getSelectedFiltersCount This gets the selected filter count
   */
  getSelectedFiltersCount() {
    const { filtersLength } = this.props;
    return (filtersLength && Object.keys(filtersLength) > 0 && this.sumValues(filtersLength)) || 0;
  }

  closeDropdownIfClickOutside = e => {
    const { isSortOpenModal, show } = this.state;
    if (
      (isSortOpenModal || show) &&
      !this.customSelect.contains(e.target) &&
      !this.filterSelect.contains(e.target) &&
      !this.filterBySection.contains(e.target)
    ) {
      this.setState({
        isSortOpenModal: false,
        show: false,
      });
    }
  };

  sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

  /**
   * @function captureFilterRef This function gets all the filter row ref and push it to an array.
   * @param {Array} ref - list of filter references
   */
  captureFilterRef = ref => {
    if (!ref) return;
    const typeRef = ref && ref.getRenderedComponent();
    typeRef.filterRefType = ref.props.name;
    this.filterRef.push(typeRef);
  };

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
  hideModal = isApplyFilter => {
    const { removeAllFilters } = this.props;

    if (removeAllFilters && !isApplyFilter) {
      removeAllFilters();
    }

    this.setState({ show: false });
    document.body.style.overflow = 'unset';
    document.body.style.position = 'static';
  };

  /**
   * @function showModal
   * @summary This handles to render the desktop filter fields
   * @param none
   */
  showModal = () => {
    const { show } = this.state;
    this.setState({ show: !show, isSortOpenModal: false });
  };

  showSortModal = () => {
    const { isSortOpenModal } = this.state;
    this.setState({ show: false, isSortOpenModal: !isSortOpenModal });
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
  renderFilterField = (selectedFilters, filterName, facetName) => {
    const {
      filtersMaps,
      isFavoriteView,
      onFilterSelection,
      handleSubmitOnChange,
      isLoadingMore,
    } = this.props;
    const optionsMap = getFilterOptionsMap(filtersMaps[facetName]);

    const className = 'item-list-collapsible item-list-collapsible-expanded size-detail-chips';

    return (
      <Field
        name={facetName}
        component={CustomSelect}
        optionsMap={optionsMap}
        placeholder={filterName}
        allowMultipleSelections={!isFavoriteView}
        className={className}
        expanded
        ref={this.captureFilterRef}
        withRef
        forwardRef
        disableExpandStateChanges
        onFilterSelection={onFilterSelection}
        onOptionSelected={handleSubmitOnChange}
        isLoadingMore={isLoadingMore}
      />
    );
  };

  /**
   * @function renderColorFilterField This handles to render the color filter fields
   * @param {selectedFilters} selectedFilters
   * @param {filterName} filterName - filter names "categoryPath2_uFilter, age_group_uFilter etc"
   * @param {facetName} facetName - filter names "category, color etc"
   */
  renderColorFilterField = (selectedFilters, filterName, facetName) => {
    const { filtersMaps, labels, handleSubmitOnChange, isLoadingMore } = this.props;
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
        forwardRef
        onBlur={this.handleFilterFieldBlur}
        labels={labels}
        onOptionSelected={handleSubmitOnChange}
        isLoadingMore={isLoadingMore}
      />
    );
  };

  /**
   * @function renderMobilePlpFilterForm
   * @summary This handles to render the desktop filter fields
   * @param none
   */
  renderMobilePlpFilterForm = () => {
    const { isSortOpenModal } = this.state;
    const {
      handleSubmit,
      handleSubmitOnChange,
      sortLabels,
      isFavoriteView,
      onSortSelection,
      favoriteSortingParams,
    } = this.props;
    const sortOptions = favoriteSortingParams || getSortOptions(sortLabels);

    return (
      <div>
        {!isSortOpenModal && (
          <div className="filters-sorting-container">{this.renderMobileFilters()}</div>
        )}
        {isSortOpenModal && (
          <SortSelector
            expanded
            sortSelectOptions={getSortCustomOptionsMap(sortOptions)}
            hideTitle
            isSortOpenModal
            onChange={
              !isFavoriteView
                ? handleSubmit(formValues => {
                    this.showSortModal(true);
                    handleSubmitOnChange(formValues);
                  })
                : selectedOption => {
                    this.showSortModal(true);
                    onSortSelection(selectedOption);
                  }
            }
          />
        )}
      </div>
    );
  };

  getFilterName = (initialValues, fieldName, filterId) => {
    return initialValues[fieldName].filter(entryId => entryId !== filterId);
  };

  handleRemoveFilter = (fieldName, filterId) => {
    const { onChange, initialValues, handleSubmitOnChange } = this.props;
    const selectedFilterName = this.getFilterName(initialValues, fieldName, filterId);
    onChange(fieldName, selectedFilterName);
    handleSubmitOnChange(true);
  };

  handleRemoveAllFilters = () => {
    const { onChange, initialValues, handleSubmitOnChange } = this.props;
    // eslint-disable-next-line no-restricted-syntax
    for (const key in initialValues) {
      // eslint-disable-next-line no-prototype-builtins
      if (initialValues.hasOwnProperty(key) && key !== 'sort') {
        onChange(key, []);
      }
    }
    handleSubmitOnChange();
  };

  handleRemoveAllFiltersForMobile = event => {
    const facetName = event && event.currentTarget && event.currentTarget.id;
    if (facetName) {
      const { onChange, handleSubmitOnChange } = this.props;
      onChange(facetName, []);
      handleSubmitOnChange(true);
    }
  };

  renderAppliedFiltersList(appliedFilters, facetName, cssKey) {
    const { labels, className } = this.props;
    const filterLength =
      appliedFilters && appliedFilters[facetName] && appliedFilters[facetName].length;
    const filter = [];

    if (filterLength > 0) {
      filter.push(appliedFilters[facetName]);
    }

    const containerClassName = cssClassName('applied-filters-list-container ', cssKey);
    return filterLength > 0 ? (
      <div key={cssKey} className={containerClassName}>
        <AppliedFiltersList
          onRemoveFilter={this.handleRemoveFilter}
          removeAllFilters={this.handleRemoveAllFiltersForMobile}
          appliedFilters={filter}
          className={className}
          labels={labels}
          id={facetName}
        />
      </div>
    ) : null;
  }

  /**
   * @function renderMobileFilters
   * @summary This handles to render the desktop filter fields
   * @param none
   */
  renderMobileFilters = () => {
    const { filtersMaps, filtersLength, className, selectedKeyValue, initialValues } = this.props;
    const filterKeys = Object.keys(filtersMaps);
    const unbxdKeyMapping = filtersMaps.unbxdDisplayName;
    const accordionItems = [];
    const { show } = this.state;
    const appliedFilterComponent = [];
    filterKeys.forEach(key => {
      if (this.isUnbxdFacetKey(key)) {
        const appliedFilter = {
          [key]: initialValues[key]
            ? initialValues[key].map(filterId =>
                filtersMaps[key].find(filterOption => filterId === filterOption.id)
              )
            : [],
        };
        const filterLength = appliedFilter[key] ? appliedFilter[key].length : 0;
        const titleKey = {
          header: {
            title: unbxdKeyMapping[key] || selectedKeyValue,
            filterLength,
          },
        };
        accordionItems.push(titleKey);
        appliedFilterComponent[titleKey.header.title] = this.renderAppliedFiltersList(
          appliedFilter,
          [key],
          'size-filter-applied-filters-list'
        );
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
        className="accordion-class"
      >
        <AccordionList
          accordionItems={accordionItems}
          className={className}
          show={show}
          appliedFilterComponent={appliedFilterComponent}
        >
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
  };

  render() {
    const {
      totalProductsCount,
      initialValues,
      filtersMaps,
      className,
      handleSubmit,
      handleFilterSubmit,
      labels,
      removeAllFilters,
      handleImmediateSubmit,
      sortLabels,
    } = this.props;
    const { isOpenFilterSection, show } = this.state;
    let appliedFiltersCount = this.getAppliedFiltersCount();
    let selectedFiltersCount = this.getSelectedFiltersCount();
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
    const { isSortOpenModal } = this.state;

    const sortClassName = isSortOpenModal ? 'mobile-sort-container' : '';

    const toggleFilter = !show ? 'hide-filter' : 'show-filter';
    const toggleSort = !isSortOpenModal ? 'hide-sort' : 'show-sort';

    return (
      <React.Fragment>
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
              className={show ? `${classNames} close-filter-button` : classNames}
              data-locator="view_gallery_button"
              onClick={this.showModal}
              id="filter-open"
            >
              {appliedFiltersCount > 0
                ? `${labels.lbl_filter} (${appliedFiltersCount})`
                : labels.lbl_filter}
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
              className={
                isSortOpenModal ? 'open-filter-button close-filter-button' : 'open-filter-button'
              }
              data-locator="view_gallery_button"
              onClick={this.showSortModal}
            >
              {labels.lbl_sort}
            </Button>
          </Col>
        </Row>
        <form
          className={`${className} ${toggleSort} ${toggleFilter} available-filters-sorting-container`}
          onSubmit={handleSubmit(formValues => {
            this.hideModal(true);
            handleImmediateSubmit(formValues);
          })}
        >
          <div className={`${className} ${sortClassName} new-filter-and-sort-form-container`}>
            {this.renderMobilePlpFilterForm(appliedFilters)}
          </div>
          {!isSortOpenModal && (
            <div className="modal-spacing">
              <Row centered>
                <Col
                  colSize={{
                    small: 3,
                    medium: 3,
                    large: 3,
                  }}
                  className="close-button"
                >
                  <Button
                    buttonVariation="fixed-width"
                    type="button"
                    className={
                      appliedFiltersCount === 0
                        ? 'gallery-button-left disable-clear-all-button'
                        : 'gallery-button-left'
                    }
                    data-locator="view_gallery_button"
                    onClick={() => this.hideModal()}
                    disabled={appliedFiltersCount === 0}
                  >
                    {labels.lbl_clear}
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
                    className="gallery-button-left"
                    data-locator="plp_filter_apply_button"
                    fill="BLACK"
                    onClick={() => this.showModal()}
                  >
                    {labels.lbl_apply}
                  </Button>
                </Col>
              </Row>
            </div>
          )}
        </form>
        <Row fullBleed className={`${className} filtered-by-section`}>
          <Col colSize={{ small: 0, medium: 8 }}>
            {this.getAppliedFiltersCount() > 0 && (
              <AppliedFiltersList
                onRemoveFilter={this.handleRemoveFilter}
                appliedFilters={appliedFilters}
                removeAllFilters={this.handleRemoveAllFilters}
                className={className}
                labels={labels}
              />
            )}
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
  handleSubmit: PropTypes.func.isRequired,
  handleSubmitOnChange: PropTypes.func,
  removeAllFilters: PropTypes.func,
  sortLabels: PropTypes.arrayOf(PropTypes.shape({})),
  selectedKeyValue: PropTypes.string,
  isFavoriteView: PropTypes.bool,
  onSortSelection: PropTypes.func,
  onFilterSelection: PropTypes.func,
  favoriteSortingParams: PropTypes.shape({}),
  isLoadingMore: PropTypes.bool,
  onChange: PropTypes.func,
};

ProductListingMobileFiltersForm.defaultProps = {
  filtersMaps: {},
  labels: {},
  sortLabels: [],
  handleSubmitOnChange: () => {},
  removeAllFilters: () => {},
  selectedKeyValue: 'All',
  isFavoriteView: false,
  onSortSelection: null,
  onFilterSelection: null,
  favoriteSortingParams: null,
  isLoadingMore: false,
  onChange: () => {},
};
export default withStyles(ProductListingMobileFiltersForm, ProductListingMobileFiltersFormStyle);

export { ProductListingMobileFiltersForm as ProductListingMobileFiltersFormVanilla };
