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
        data-locator="addnewaddress-back"
        asPath="/account/address-book"
      >
        {labels.common.lbl_common_backLink}
      </Anchor>
      <Heading
        fontFamily="primaryFontFamily"
        HeadingLarge="six"
        tag="h4"
        className="addAddress__separator"
      >
        {isEdit
          ? labels.addressBook.ACC_LBL_EDIT_ADDRESS_FORM_HEADING
          : labels.addressBook.ACC_LBL_ADD_ADDRESS_FORM_HEADING}
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
              ? labels.addressBook.ACC_LBL_EDIT_ADDRESS
              : labels.addressBook.ACC_LBL_VERIFY_YOUR_ADDRESS_HEADING_ADD
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
