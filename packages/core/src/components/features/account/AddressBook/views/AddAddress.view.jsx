import React from 'react';
import { reduxForm } from 'redux-form';
import { Provider } from 'react-redux';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import { Heading } from '@tcp/core/styles/themes/TCP/typotheme';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Anchor from '../../../../common/atoms/Anchor';
import store from './molecules/store';
import AddAddressForm from './molecules/AddAddressForm';
import styles from '../styles/AddAddress.style';

// @flow
type Props = {
  className: string,
  submitAddAddressForm: any,
  addAddressNotification: any,
  AddAddresslabels: any,
  backToAddressBookClick: any,
};
const AddAddress = ({
  className,
  submitAddAddressForm,
  addAddressNotification,
  AddAddresslabels,
  backToAddressBookClick,
}: Props) => {
  const msgInfo = JSON.parse(`${addAddressNotification}`);
  return (
    <div className={className}>
      <Anchor
        className="addAddress__anchor__back"
        fontSizeVariation="xlarge"
        anchorVariation="secondary"
        handleLinkClick={backToAddressBookClick}
        noLink
      >
        Back
      </Anchor>
      <Heading
        fontFamily="secondaryFontFamily"
        HeadingLarge="six"
        tag="h4"
        className="addAddress__separator"
      >
        Add New Shipping Address
      </Heading>
      <form>
        <Grid>
          <br />
          {msgInfo && (
            <Notification
              status={msgInfo ? 'error' : 'success'}
              colSize={{ large: 12, medium: 8, small: 6 }}
              message={
                msgInfo ? AddAddresslabels.addAddressFail : AddAddresslabels.addAddressSuccessLbl
              }
            />
          )}
          <AddAddressForm
            backToAddressBookClick={backToAddressBookClick}
            onSubmit={submitAddAddressForm}
          />
        </Grid>
      </form>
    </div>
  );
};
export default reduxForm({
  form: 'addressinfo', // a unique identifier for this form
})(withStyles(AddAddress, styles));
