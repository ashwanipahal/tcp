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
import SortSelector from '../../SortSelector';
import config from '../../SortSelector/SortSelector.config';

// @flow
type Props = {
  initialValues: any,
  className: any,
  filtersLength: any,
  filtersMaps: any,
};

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

class ProductListingMobileFiltersForm extends React.PureComponent<Props> {
  constructor(props) {
    super(props);

    this.state = {
      isOpenFilterSection: false,
      show: false,
      isSortOpenModal: false,
    };
  }

  // eslint-disable-next-line
  getFilterOptionsMap(optionsMap) {
    return optionsMap.map(option => ({
      value: option.id,
      title: option.displayName,
      content: <span className="size-title">{option.displayName}</span>,
    }));
  }

  /* eslint-disable */
  getColorFilterOptionsMap(colorOptionsMap) {
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
        </div>
      ),
    }));
  }

  isUnbxdFacetKey = key =>
    key.toLowerCase() !== FACETS_FIELD_KEY.unbxdDisplayName &&
    key.toLowerCase() !== FACETS_FIELD_KEY.sort &&
    key !== FACETS_FIELD_KEY.l1category;

  hideModal = () => {
    this.setState({ show: false });
  };

  showModal = () => {
    this.setState({ show: true, isSortOpenModal: false });
  };

  showSortModal = () => {
    this.setState({ show: true, isSortOpenModal: true });
  };

  toggleFilterIcon = () => {
    const { isOpenFilterSection } = this.state;
    this.setState({ isOpenFilterSection: !isOpenFilterSection });
  };

  renderFilterField(selectedFilters, filterName, facetName) {
    const { filtersMaps } = this.props;
    const optionsMap = this.getFilterOptionsMap(filtersMaps[facetName]);

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

  renderColorFilterField(selectedFilters, filterName, facetName) {
    const { filtersMaps, labels } = this.props;
    const className = 'color-filter-chip size-detail';
    return (
      <Field
        name={facetName}
        facetName={facetName}
        component={CustomSelect}
        optionsMap={this.getColorFilterOptionsMap(filtersMaps[facetName], filterName)}
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

  renderMobilePlpFilterForm() {
    const { isSortOpenModal } = this.state;
    return (
      <div>
        {!isSortOpenModal && (
          <div className="filters-sorting-container">{this.renderMobileFilters()}</div>
        )}
        {isSortOpenModal && (
          <SortSelector
            expanded={true}
            sortSelectOptions={getSortCustomOptionsMap(config)}
            hideTitle={true}
          />
        )}
      </div>
    );
  }

  renderMobileFilters() {
    const { filtersMaps, filtersLength, className } = this.props;
    const filterKeys = Object.keys(filtersMaps);
    const unbxdKeyMapping = filtersMaps.unbxdDisplayName;
    const accordionItems = [];

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
        <AccordionList accordionItems={accordionItems} className={className}>
          {filterKeys.map(key => {
            if (key.toLowerCase() === FACETS_FIELD_KEY.color) {
              const length = (filtersLength && filtersLength[`${key} Filters`]) || 0;
              return (
                filtersMaps[key].length > 0 &&
                this.renderColorFilterField(length, unbxdKeyMapping[key], key)
              );
            } else if (this.isUnbxdFacetKey(key)) {
              const length = (filtersLength && filtersLength[`${key} Filters`]) || 0;
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
    const { initialValues, filtersMaps, className } = this.props;
    const { isOpenFilterSection, show } = this.state;
    // const selectedFiltersCount = this.getSelectedFiltersCount();
    const appliedFilters = [];

    const classNames = cssClassName(
      'open-filter-button ',
      isOpenFilterSection && 'open-filter-button-expanded'
    );

    // eslint-disable-next-line
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
        <FilterModal show={show} handleClose={this.hideModal} classNames={classNames}>
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
              FILTER
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
              onClick={this.showSortModal}
            >
              SORT
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

ProductListingMobileFiltersForm.propTypes = {
  filters: PropTypes.shape({}),
  labels: PropTypes.shape({}),
};

ProductListingMobileFiltersForm.defaultProps = {
  filters: {},
  labels: {},
};
export default reduxForm({
  form: 'filter-form', // a unique identifier for this form
})(withStyles(ProductListingMobileFiltersForm, ProductListingMobileFiltersFormStyle));

export { ProductListingMobileFiltersForm as ProductListingMobileFiltersFormVanilla };
