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
import { Grid } from '@tcp/core/src/components/common/molecules';
import PropTypes from 'prop-types';
import { AutoCompleteComponent } from '@tcp/core/src/components/common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import ErrorMessage from '@tcp/core/src/components/common/hoc/ErrorMessage';
import { getAddressLocationInfo } from '@tcp/core/src/utils/addressLocation';
import constants from '../../../container/StoreLanding.constants';
import styles from '../styles/StoreSearch.style';

const { INITIAL_STORE_LIMIT } = constants;

export class StoreSearch extends PureComponent {
  state = {
    errorNotFound: null,
    gymSelected: false,
    outletSelected: false,
  };

  componentDidMount() {
    if (navigator.geolocation) {
      const { loadStoresByCoordinates } = this.props;
      navigator.geolocation.getCurrentPosition(pos => {
        loadStoresByCoordinates(
          Promise.resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          INITIAL_STORE_LIMIT
        );
      });
    }
  }

  /**
   * @function handleLocationSelection function to fetch the location coordinates.
   * @param {object} selectedLocation - selected location details
   * @param {object} geometry - The geometry details of the selected location
   * @param {object} location - The location details of the selected location
   */
  handleLocationSelection = ({ geometry, location }) => {
    const { loadStoresByCoordinates, submitting } = this.props;
    if ((!geometry && !location) || submitting) {
      return;
    }
    const { lat, lng } = geometry ? geometry.location : location;
    loadStoresByCoordinates(Promise.resolve({ lat: lat(), lng: lng() }), INITIAL_STORE_LIMIT);
  };

  /**
   * @function onSubmit function to handle the form submit
   * @param {object} formData - form input data
   */
  onSubmit = formData => {
    const { submitting, loadStoresByCoordinates } = this.props;
    if (!submitting) {
      this.setState({ errorNotFound: null });
      return loadStoresByCoordinates(
        getAddressLocationInfo(formData.storeAddressLocator).catch(() =>
          this.setState({ errorNotFound: true })
        ),
        INITIAL_STORE_LIMIT
      );
    }
    return false;
  };

  onSelectStore = event => {
    const { target } = event;
    const { selectStoreType } = this.props;

    if (target.name === 'gymboreeStoreOption') {
      this.setState({
        gymSelected: target.checked,
      }, () => {
        const { outletSelected, gymSelected } = this.state;
        selectStoreType({ outletSelected, gymSelected });
      });
    }

    if (target.name === 'outletOption') {
      this.setState({
        outletSelected: target.checked,
      }, () => {
        const { outletSelected, gymSelected } = this.state;
        selectStoreType({ outletSelected, gymSelected });
      });
    }

  };

  render() {
    const {
      className,
      selectedCountry,
      error,
      handleSubmit,
      labels,
      searchIcon,
      markerIcon,
      toggleMap,
      mapView
    } = this.props;
    const { errorNotFound, gymSelected, outletSelected } = this.state;
    const {
      errorLabel = 'there is an error in the input',
      storeSearchPlaceholder = 'ZIP or city, state',
      findStoreHeading = 'Find a Store',
      gymboreeStores = 'Gymboree',
      outletStores = 'Only Outlet Stores',
      currentLocation = 'Use my current location',
      viewMap = 'View Map',
      viewList = 'View List',
      allUSCAStores = 'All US & Canada Stores',
      internationalStores = 'International Stores',
    } = labels;
    const errorMessage = errorNotFound ? errorLabel : error;

    const viewMapListLabel = mapView ? viewList : viewMap;

    const storeOptionsConfig = [
      {
        name: 'gymboreeStoreOption',
        dataLocator: 'gymboree-store-option',
        storeLabel: gymboreeStores,
        checked: gymSelected,
      },
      {
        name: 'outletOption',
        dataLocator: 'only-outlet-option',
        storeLabel: outletStores,
        checked: outletSelected,
      },
    ];

    const linksConfig = [
      {
        asPath: '',
        to: '',
        label: allUSCAStores,
        classValue: '',
      },
      {
        asPath: '',
        to: '',
        label: internationalStores,
        classValue: '',
      },
    ];

    return (
      <div className={className}>
        <h3 className="storeLocatorHeading">{findStoreHeading}</h3>
        <Row fullBleed>
          <Col colSize={{ large: 6.5, medium: 4, small: 6 }}>
            <div className="currentLocationWrapper">
              <Anchor asPath="/" className="" to="/">
                <Image
                  alt="location"
                  className="location-image icon-small"
                  src={markerIcon}
                  data-locator="marker-icon"
                  height="16px"
                />
                <span className="currentLocation">{currentLocation}</span>
              </Anchor>
            </div>
            <form onSubmit={handleSubmit(this.onSubmit)} noValidate className="searchForm">
              <div className="searchBar">
                <Field
                  id="storeAddressLocator"
                  title={storeSearchPlaceholder}
                  placeholder={storeSearchPlaceholder}
                  component={AutoCompleteComponent}
                  name="storeAddressLocator"
                  onPlaceSelected={this.handleLocationSelection}
                  componentRestrictions={Object.assign({}, { country: [selectedCountry] })}
                  dataLocator="storeAddressLocator"
                  className="store-locator-field"
                  enableSuccessCheck={false}
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
              {errorMessage && (
                <ErrorMessage
                  isShowingMessage={errorMessage}
                  errorId="storeSearch_geoLocation"
                  error={errorMessage}
                  withoutErrorDataAttribute
                />
              )}
            </form>
          </Col>
          <Col colSize={{ large: 12, medium: 4, small: 6 }}>
            <div className="searchFormBody">
              <ul className="storeOptionList">
                {storeOptionsConfig.map(({ name, dataLocator, storeLabel, checked }) => (
                  <li className="storeOptions">
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
                  <Anchor onClick={toggleMap}>
                    {viewMapListLabel}
                  </Anchor>
                </li>
                {linksConfig.map(({ to, asPath, label, classValue }) => (
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
  submitting: PropTypes.bool,
  error: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  labels: PropTypes.objectOf(PropTypes.string),
  searchIcon: PropTypes.string.isRequired,
  markerIcon: PropTypes.string.isRequired,
};

StoreSearch.defaultProps = {
  submitting: false,
  labels: {},
};

export default reduxForm({
  form: 'StoreSearch',
  enableReinitialize: true,
})(withStyles(StoreSearch, styles));

export { StoreSearch as StoreViewVanilla };
