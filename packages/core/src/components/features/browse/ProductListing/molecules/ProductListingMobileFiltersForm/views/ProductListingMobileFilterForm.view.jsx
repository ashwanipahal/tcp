import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import withStyles from '../../../../../../common/hoc/withStyles';
import ProductListingMobileFiltersFormStyle from '../styles/ProductListingMobileFiltersForm.style';
import CustomSelect from '../../CustomSelect/views';
// import BodyCopy from '../../../../../../../../../core/src/components/common/atoms/BodyCopy';
import cssClassName from '../../utils/cssClassName';
import AccordionList from '../../../../../../common/molecules/AccordionList';
import FilterModal from '../../FilterModal/views';
import { Row, Col, Button } from '../../../../../../common/atoms';

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

class ProductListingMobileFiltersForm extends React.PureComponent<Props> {
  constructor(props) {
    super(props);

    this.state = {
      isOpenFilterSection: false,
      show: false,
    };
  }

  getAppliedFiltersCount() {
    const { initialValues } = this.props;
    let count = 0;
    // eslint-disable-next-line
    for (let key in initialValues) {
      if (Object.prototype.hasOwnProperty.call(initialValues, key)) {
        count +=
          key !== FACETS_FIELD_KEY.sort && key !== FACETS_FIELD_KEY.aux_color_unbxd
            ? initialValues[key].length
            : 0;
      }
    }
    return count;
  }

  // eslint-disable-next-line
  getFilterOptionsMap(optionsMap) {
    return optionsMap.map(option => ({
      value: option.id,
      title: option.displayName,
      content: <span className="size-title">{option.displayName}</span>,
    }));
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  isUnbxdFacetKey = key =>
    key.toLowerCase() !== FACETS_FIELD_KEY.unbxdDisplayName &&
    key.toLowerCase() !== FACETS_FIELD_KEY.sort &&
    key !== FACETS_FIELD_KEY.l1category;

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

  renderMobilePlpFilterForm() {
    return (
      <div>
        <div className="filters-sorting-container">{this.renderMobileFilters()}</div>
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
            if (this.isUnbxdFacetKey(key)) {
              const length = (filtersLength && filtersLength[`${key} Filters`]) || 0;
              return (
                filtersMaps[key].length > 0 &&
                this.renderFilterField(length, unbxdKeyMapping[key], key)
              );
            }
            return false;
          })}
        </AccordionList>
      </Col>
    );
  }

  render() {
    const { initialValues, filtersMaps, className } = this.props;
    const { isOpenFilterSection, show } = this.state;
    // const appliedFiltersCount = this.getAppliedFiltersCount();
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
        <FilterModal show={show} handleClose={this.hideModal}>
          <div className={`${className} new-filter-and-sort-form-container`}>
            <Row centered className="filter-row">
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
                  onClick={this.toggleFilterIcon}
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
                >
                  SORT
                </Button>
              </Col>
            </Row>

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
};

ProductListingMobileFiltersForm.defaultProps = {
  filters: {},
};
export default reduxForm({
  form: 'filter-form', // a unique identifier for this form
})(withStyles(ProductListingMobileFiltersForm, ProductListingMobileFiltersFormStyle));
