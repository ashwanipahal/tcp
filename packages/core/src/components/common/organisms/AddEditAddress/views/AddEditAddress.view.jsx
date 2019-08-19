import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import AddressFormComponent from '../../AddressForm/AddressForm';
import AddressVerification from '../../AddressVerification/container/AddressVerification.container';
import styles from '../styles/AddEditAddress.style';

export const AddEditAddress = ({
  className,
  addressResponse,
  isEdit,
  initialValues,
  backToAddressBookClick,
  verifyAddressAction,
  submitAddressFormAction,
  addressFormLabels,
  verifyAddressLabels,
  isMakeDefaultDisabled,
}) => {
  const errorObject = addressResponse && addressResponse.get('errors');

  return (
    <div className={className}>
      <Grid>
        {errorObject && (
          <Notification
            status="error"
            colSize={{ large: 12, medium: 8, small: 6 }}
            message={errorObject.getIn(['0', 'errorKey'])}
          />
        )}
        <AddressVerification
          onSuccess={submitAddressFormAction}
          heading={isEdit ? verifyAddressLabels.editAddress : verifyAddressLabels.addAddressHeading}
          verifyAddressLabels={verifyAddressLabels}
          onError={submitAddressFormAction}
        />
        <AddressFormComponent
          backToAddressBookClick={backToAddressBookClick}
          onSubmit={verifyAddressAction}
          addressFormLabels={addressFormLabels}
          initialValues={initialValues}
          isEdit={isEdit}
          isMakeDefaultDisabled={isMakeDefaultDisabled}
        />
      </Grid>
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
  verifyAddressLabels: {},
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
  addressFormLabels: {},
  verifyAddressLabels: { editAddress: '', addAddressHeading: '' },
};

export default withStyles(AddEditAddress, styles);
