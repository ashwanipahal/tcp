import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import SpinnerOverlay from '@tcp/core/src/components/common/atoms/SpinnerOverlay';
import AddressFormComponent from '../../AddressForm/AddressForm';
import AddressVerification from '../../AddressVerification/container/AddressVerification.container';
import styles, { customSpinnerStyle } from '../styles/AddEditAddress.style';

export const AddEditAddress = ({
  className,
  isEdit,
  isLoading,
  initialValues,
  backToAddressBookClick,
  verifyAddressAction,
  submitAddressFormAction,
  addressFormLabels,
  isMakeDefaultDisabled,
  formErrorMessage,
  addEditErrorMessage,
  showNotification,
}) => {
  return (
    <div className={`${className} addEditAddress`}>
      <Grid>
        {addEditErrorMessage && showNotification && (
          <Notification
            status="error"
            colSize={{ large: 12, medium: 8, small: 6 }}
            message={addEditErrorMessage}
          />
        )}
        <AddressVerification
          onSuccess={submitAddressFormAction}
          heading={isEdit ? addressFormLabels.editAddress : addressFormLabels.addAddressHeading}
          onError={submitAddressFormAction}
        />
        <AddressFormComponent
          backToAddressBookClick={backToAddressBookClick}
          onSubmit={verifyAddressAction}
          addressFormLabels={addressFormLabels}
          initialValues={initialValues}
          isEdit={isEdit}
          isMakeDefaultDisabled={isMakeDefaultDisabled}
          formErrorMessage={formErrorMessage}
        />
      </Grid>
      <SpinnerOverlay inheritedStyles={customSpinnerStyle} />
    </div>
  );
};

AddEditAddress.propTypes = {
  className: PropTypes.string,
  submitAddressFormAction: PropTypes.func,
  verifyAddressAction: PropTypes.func,
  backToAddressBookClick: PropTypes.func,
  addressResponse: PropTypes.shape({}),
  initialValues: PropTypes.shape({}),
  isEdit: PropTypes.bool,
  isMakeDefaultDisabled: PropTypes.bool,
  addressFormLabels: {},
  formErrorMessage: PropTypes.shape({}),
  addEditErrorMessage: PropTypes.string.isRequired,
  showNotification: PropTypes.bool,
  isLoading: PropTypes.bool,
};

AddEditAddress.defaultProps = {
  className: '',
  submitAddressFormAction: () => {},
  verifyAddressAction: () => {},
  backToAddressBookClick: () => {},
  initialValues: {},
  addressResponse: null,
  isEdit: false,
  isMakeDefaultDisabled: false,
  addressFormLabels: { editAddress: '', addAddressHeading: '' },
  formErrorMessage: {},
  showNotification: false,
  isLoading: false,
};

export default withStyles(AddEditAddress, styles);
