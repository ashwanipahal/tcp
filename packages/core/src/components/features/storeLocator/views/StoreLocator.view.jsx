/* istanbul ignore file */
import React, { PureComponent } from 'react'; //eslint-disable-line
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { AutoCompleteComponent } from '@tcp/core/src/components/common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
import withStyles from '../../../common/hoc/withStyles';
import ErrorMessage from '../../../common/hoc/ErrorMessage';
import { INITIAL_STORE_LIMIT } from '../StoreLocator.constants';
import { getAddressLocationInfo } from '../../../../utils/addressLocation';
import styles from '../styles/Store.style';

export class Store extends PureComponent {
  state = {
    errorNotFound: null,
  };

  componentDidMount() {
    if (navigator.geolocation) {
      const { loadStoresByLatLng } = this.props;
      navigator.geolocation.getCurrentPosition(pos => {
        loadStoresByLatLng(
          Promise.resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          INITIAL_STORE_LIMIT
        );
      });
    }
  }

  handlePlaceSelected = place => {
    const { loadStoresByLatLng, submitting } = this.props;
    if ((!place.geometry && !place.location) || submitting) {
      return;
    }
    const { lat, lng } = place.geometry ? place.geometry.location : place.location;
    loadStoresByLatLng(Promise.resolve({ lat: lat(), lng: lng() }), INITIAL_STORE_LIMIT);
  };

  onSubmit = formData => {
    const { submitting, loadStoresByLatLng } = this.props;
    if (!submitting) {
      this.setState({ errorNotFound: null });
      return loadStoresByLatLng(
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
            onPlaceSelected={this.handlePlaceSelected}
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

Store.propTypes = {
  className: PropTypes.string.isRequired,
  selectedCountry: PropTypes.string.isRequired,
  loadStoresByLatLng: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  error: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

Store.defaultProps = {
  submitting: false,
};

export default reduxForm({
  form: 'Store',
  enableReinitialize: true,
})(withStyles(Store, styles));

export { Store as StoreViewVanilla };
