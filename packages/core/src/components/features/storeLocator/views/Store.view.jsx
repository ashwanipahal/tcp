import React, { PureComponent } from 'react'; //eslint-disable-line
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { AutoCompleteComponent } from '@tcp/core/src/components/common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
import withStyles from '../../../common/hoc/withStyles';
import { INITIAL_STORE_LIMIT } from '../Store.constants';
import styles from '../styles/Store.style';


export class Store extends PureComponent {

  handlePlaceSelected = (place) => {
    const { loadStoresByLatLng, submitting } = this.props;
    if (!place.geometry && !place.location || submitting) {
      return;
    }
    const {lat, lng} = place.geometry ? place.geometry.location : place.location;
    console.log('--->', place)
    // loadStoresByLatLng(Promise.resolve({ lat: lat(), lng: lng() }), INITIAL_STORE_LIMIT);
  }

  render() {
    const { className, selectedCountry } = this.props;
    return (
      <form className={className} onSubmit={() => {}} noValidate>
        <Field
          id="storeLocator"
          placeholder="type"
          component={AutoCompleteComponent}
          name="storeLocator"
          onPlaceSelected={this.handlePlaceSelected}
          componentRestrictions={Object.assign({}, { country: [selectedCountry] })}
          dataLocator="storeLocator"
          className="store-locator-field"
          enableSuccessCheck={false}
        />
      </form>
    );
  }
};

Store.propTypes = {
  className: PropTypes.string.isRequired,
  selectedCountry: PropTypes.string.isRequired,
  loadStoresByLatLng: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

Store.defaultProps = {
  submitting: false,
}

export default reduxForm({
  form: 'Store',
  enableReinitialize: true,
})(withStyles(Store, styles));

export { Store as StoreViewVanilla };
