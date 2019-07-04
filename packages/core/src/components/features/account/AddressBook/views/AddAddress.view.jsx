import React from 'react';
import Router from 'next/router'; //eslint-disable-line
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import { Heading } from '@tcp/core/styles/themes/TCP/typotheme';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Anchor from '../../../../common/atoms/Anchor';
import AddAddressFormComponent from './molecules/AddAddressForm';
import styles from '../styles/AddAddress.style';

// @flow
type Props = {
  className: string,
  submitAddAddressForm: any,
  addAddressNotification: any,
  AddAddresslabels: any,
};

const backToAddressBookClick = () => {
  Router.push('/account');
}

const AddAddress = ({
  className,
  submitAddAddressForm,
  addAddressNotification,
  AddAddresslabels,
}: Props) => {
  const msgInfo = addAddressNotification;
  return (
    <div className={className}>
      <Anchor
        className="addAddress__anchor__back"
        fontSizeVariation="xlarge"
        anchorVariation="secondary"
        to="/account"
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
      <Grid>
        {msgInfo && (
        <Notification
          status={msgInfo ? 'error' : 'success'}
          colSize={{ large: 12, medium: 8, small: 6 }}
          message={
                msgInfo ? AddAddresslabels.addAddressFail : AddAddresslabels.addAddressSuccessLbl
              }
        />
          )}
        <AddAddressFormComponent
          backToAddressBookClick={backToAddressBookClick}
          onSubmit={submitAddAddressForm}
        />
      </Grid>
    </div>
  );
};
export default withStyles(AddAddress, styles);
