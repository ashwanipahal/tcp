import React, { PureComponent } from 'react'; //eslint-disable-line
import { reduxForm, Field } from 'redux-form';
import {
  Image,
  Button,
  BodyCopy,
  InputCheckBox,
  Anchor,
  Row,
  Col,
} from '@tcp/core/src/components/common/atoms';
import PropTypes from 'prop-types';
import { AutoCompleteComponent } from '@tcp/core/src/components/common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getAddressLocationInfo } from '@tcp/core/src/utils/addressLocation';
import { getLabelValue, isGymboree } from '@tcp/core/src/utils';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import constants from '../../../container/StoreLanding.constants';
import styles from '../styles/StoreSearch.style';

const { INITIAL_STORE_LIMIT } = constants;

export class StoreSearch extends PureComponent {
  state = {
    gymSelected: isGymboree(),
    outletSelected: false,
    storeSelected: false,
  };

  /**
   * @function handleLocationSelection function to fetch the location coordinates.
   * @param {object} selectedLocation - selected location details
   * @param {object} geometry - The geometry details of the selected location
   * @param {object} location - The location details of the selected location
   */
  handleLocationSelection = ({ geometry, location }) => {
    const { loadStoresByCoordinates, submitting, showSubmitError } = this.props;
    if ((!geometry && !location) || submitting) {
      return;
    }
    const { lat, lng } = geometry ? geometry.location : location;
    this.setState({ storeSelected: true });
    showSubmitError(false);
    loadStoresByCoordinates(Promise.resolve({ lat: lat(), lng: lng() }), INITIAL_STORE_LIMIT);
  };

  /**
   * @function onSubmit function to handle the form submit
   * @param {object} formData - form input data
   */
  onSubmit = formData => {
    const { storeSelected } = this.state;
    const { submitting, loadStoresByCoordinates, showSubmitError } = this.props;
    if (!submitting && storeSelected) {
      let res;
      try {
        res = getAddressLocationInfo(formData.storeAddressLocator);
      } catch (err) {
        res = {};
      }
      return loadStoresByCoordinates(res, INITIAL_STORE_LIMIT);
    }
    showSubmitError(true);
    return false;
  };

  /**
   * @function onSelectStore function to handle the toggling og checkbox
   * @param {object} event - event object
   */
  onSelectStore = event => {
    const { target } = event;
    const { selectStoreType } = this.props;

    if (target.name === 'gymboreeStoreOption') {
      this.setState(
        {
          gymSelected: target.checked,
        },
        () => {
          const { outletSelected, gymSelected } = this.state;
          selectStoreType({ outletSelected, gymSelected });
        }
      );
    }

    if (target.name === 'outletOption') {
      this.setState(
        {
          outletSelected: target.checked,
        },
        () => {
          const { outletSelected, gymSelected } = this.state;
          selectStoreType({ outletSelected, gymSelected });
        }
      );
    }
    return true;
  };

  onStoreChange = () => {
    const { storeSelected } = this.state;
    if (storeSelected) this.setState({ storeSelected: false });
  };

  render() {
    const {
      className,
      selectedCountry,
      handleSubmit,
      labels,
      searchIcon,
      markerIcon,
      toggleMap,
      mapView,
      getLocationStores,
    } = this.props;
    const { gymSelected, outletSelected } = this.state;

    const viewMapListLabel = mapView
      ? getLabelValue(labels, 'lbl_storelanding_viewList')
      : getLabelValue(labels, 'lbl_storelanding_viewMap');

    const storeOptionsConfig = [
      {
        name: 'gymboreeStoreOption',
        dataLocator: 'gymboree-store-option',
        storeLabel: getLabelValue(labels, 'lbl_storelanding_gymboreeStores'),
        checked: gymSelected,
      },
      {
        name: 'outletOption',
        dataLocator: 'only-outlet-option',
        storeLabel: getLabelValue(labels, 'lbl_storelanding_outletStores'),
        checked: outletSelected,
      },
    ];

    const linksConfig = [
      {
        asPath: '/stores',
        to: '/stores',
        label: getLabelValue(labels, 'lbl_storelanding_allUSCAStores'),
      },
      {
        asPath: '/content/international-stores',
        to: '/content?contentType=international-stores',
        label: getLabelValue(labels, 'lbl_storelanding_internationalStores'),
      },
    ];

    return (
      <div className={className}>
        <h3 className="storeLocatorHeading">
          {getLabelValue(labels, 'lbl_storelanding_findStoreHeading')}
        </h3>
        <Row fullBleed>
          <Col colSize={{ large: 6.5, medium: 4, small: 6 }}>
            <div className="currentLocationWrapper">
              <Button onClick={getLocationStores}>
                <Image
                  alt="location"
                  className="location-image icon-small"
                  src={markerIcon}
                  data-locator="marker-icon"
                  height="16px"
                />
                <span className="currentLocation">
                  {getLabelValue(labels, 'lbl_storelanding_currentLocation')}
                </span>
              </Button>
            </div>
            <form onSubmit={handleSubmit(this.onSubmit)} noValidate className="searchForm">
              <div className="searchBar">
                <Field
                  id="storeAddressLocator"
                  title={getLabelValue(labels, 'lbl_storelanding_storeSearchPlaceholder')}
                  placeholder={getLabelValue(labels, 'lbl_storelanding_storeSearchPlaceholder')}
                  component={AutoCompleteComponent}
                  name="storeAddressLocator"
                  onPlaceSelected={this.handleLocationSelection}
                  componentRestrictions={Object.assign({}, { country: [selectedCountry] })}
                  dataLocator="storeAddressLocator"
                  className="store-locator-field"
                  enableSuccessCheck={false}
                  onChange={this.onStoreChange}
                />
                <Button type="submit" title="search" className="button-search-store">
                  <Image
                    alt="search"
                    className="search-image icon-small"
                    onClick={this.closeSearchBar}
                    src={searchIcon}
                    data-locator="search-icon"
                    height="25px"
                  />
                </Button>
              </div>
            </form>
          </Col>
          <Col colSize={{ large: 12, medium: 4, small: 6 }}>
            <div className="searchFormBody">
              <ul className="storeOptionList">
                {storeOptionsConfig.map(({ name, dataLocator, storeLabel, checked }) => (
                  <li className="storeOptions" key={name}>
                    <Field
                      name={name}
                      component={InputCheckBox}
                      dataLocator={dataLocator}
                      enableSuccessCheck={false}
                      onChange={this.onSelectStore}
                      checked={checked}
                    >
                      <BodyCopy
                        fontSize={['fs12', 'fs12', 'fs12']}
                        fontFamily="secondary"
                        fontWeight="regular"
                      >
                        {storeLabel}
                      </BodyCopy>
                    </Field>
                  </li>
                ))}
              </ul>
              <ul className="storeLinksList">
                <li key={viewMapListLabel} className="mapLink storeLinks">
                  <Anchor onClick={toggleMap}>{viewMapListLabel}</Anchor>
                </li>
                {linksConfig.map(({ to, asPath, label }) => (
                  <li key={label} className="storeLinks">
                    <Anchor asPath={asPath} className="" to={to}>
                      {label}
                    </Anchor>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

StoreSearch.propTypes = {
  className: PropTypes.string.isRequired,
  selectedCountry: PropTypes.string.isRequired,
  loadStoresByCoordinates: PropTypes.func.isRequired,
  selectStoreType: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  labels: PropTypes.objectOf(PropTypes.string),
  searchIcon: PropTypes.string.isRequired,
  markerIcon: PropTypes.string.isRequired,
  toggleMap: PropTypes.func.isRequired,
  getLocationStores: PropTypes.func.isRequired,
  mapView: PropTypes.bool,
  showSubmitError: PropTypes.func.isRequired,
};

StoreSearch.defaultProps = {
  submitting: false,
  labels: {},
  mapView: false,
};

const validateMethod = createValidateMethod(getStandardConfig(['storeAddressLocator']));

export default reduxForm({
  form: 'StoreSearchForm',
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(StoreSearch, styles));

export { StoreSearch as StoreViewVanilla };
