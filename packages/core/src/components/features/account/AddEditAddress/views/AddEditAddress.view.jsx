import React from 'react';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import { Heading } from '@tcp/core/styles/themes/TCP/typotheme';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Anchor from '../../../../common/atoms/Anchor';
import AddressFormComponent from '../../common/organism/AddressForm/AddressForm';
import AddressVerification from '../../AddressVerification/container/AddressVerification.container';
import styles from '../styles/AddEditAddress.style';

// @flow

type Props = {
  className: ?string,
  submitAddressFormAction: any,
  verifyAddressAction: ({}) => void,
  backToAddressBookClick: () => void,
  addressResponse: any,
  initialValues?: object,
  isEdit?: boolean,
  isMakeDefaultDisabled?: boolean,
  labels: {},
};

export const AddEditAddress = ({
  className,
  addressResponse,
  isEdit,
  initialValues,
  backToAddressBookClick,
  verifyAddressAction,
  submitAddressFormAction,
  labels,
  isMakeDefaultDisabled,
}: Props) => {
  const errorObject = addressResponse && addressResponse.get('errors');

  return (
    <div className={className}>
      <Anchor
        className="addAddress__anchor__back"
        fontSizeVariation="xlarge"
        anchorVariation="secondary"
        to="/account?id=address-book"
        dataLocator="addnewaddress-back"
        asPath="/account/address-book"
      >
        Back
      </Anchor>
      <Heading
        fontFamily="primaryFontFamily"
        HeadingLarge="six"
        tag="h4"
        className="addAddress__separator"
      >
        {isEdit
          ? labels.acc_lbl_edit_address_form_heading
          : labels.acc_lbl_add_address_form_heading}
      </Heading>
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
          heading={
            isEdit
              ? labels.acc_lbl_verify_your_address_heading_edit
              : labels.acc_lbl_verify_your_address_heading_add
          }
          labels={labels}
          onError={submitAddressFormAction}
        />
        <AddressFormComponent
          backToAddressBookClick={backToAddressBookClick}
          onSubmit={verifyAddressAction}
          labels={labels}
          initialValues={initialValues}
          isEdit={isEdit}
          isMakeDefaultDisabled={isMakeDefaultDisabled}
        />
      </Grid>
    </div>
  );
};

AddEditAddress.defaultProps = {
  initialValues: {},
  isEdit: false,
  isMakeDefaultDisabled: false,
};

export default withStyles(AddEditAddress, styles);
