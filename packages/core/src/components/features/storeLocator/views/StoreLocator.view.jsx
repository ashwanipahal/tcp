/* istanbul ignore file */
import React, { PureComponent } from 'react'; //eslint-disable-line
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { AutoCompleteComponent } from '@tcp/core/src/components/common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
import withStyles from '../../../common/hoc/withStyles';
import ErrorMessage from '../../../common/hoc/ErrorMessage';
import { INITIAL_STORE_LIMIT } from '../StoreLocator.constants';
import { getAddressLocationInfo } from '../../../../utils/addressLocation';
import styles from '../styles/StoreLocator.style';

export class StoreLocatorView extends PureComponent {
  state = {
    errorNotFound: null,
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

  render() {
    const { className, selectedCountry, error, handleSubmit } = this.props;
    const { errorNotFound } = this.state;
    const errorMessage = errorNotFound ? 'Please enter a valid address and try again.' : error;

    return (
      <div className={className}>
        <form onSubmit={handleSubmit(this.onSubmit)} noValidate>
          <Field
            id="storeAddressLocator"
            placeholder="type"
            component={AutoCompleteComponent}
            name="storeAddressLocator"
            onPlaceSelected={this.handleLocationSelection}
            componentRestrictions={Object.assign({}, { country: [selectedCountry] })}
            dataLocator="storeAddressLocator"
            className="store-locator-field"
            enableSuccessCheck={false}
          />
          <button type="submit" title="search" className="button-search-store">
            {' '}
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            Search{' '}
          </button>
        </form>
        <ErrorMessage
          isShowingMessage={errorMessage}
          errorId={Math.random()}
          error={errorMessage}
          withoutErrorDataAttribute
        />
      </div>
    );
  }
}

StoreLocatorView.propTypes = {
  className: PropTypes.string.isRequired,
  selectedCountry: PropTypes.string.isRequired,
  loadStoresByCoordinates: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  error: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

StoreLocatorView.defaultProps = {
  submitting: false,
};

export default reduxForm({
  form: 'StoreLocatorView',
  enableReinitialize: true,
})(withStyles(StoreLocatorView, styles));

export { StoreLocatorView as StoreViewVanilla };
