import React from 'react';
import Router from 'next/router'; //eslint-disable-line
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import { Heading } from '@tcp/core/styles/themes/TCP/typotheme';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Anchor from '../../../../common/atoms/Anchor';
import AddAddressFormComponent from './molecules/AddAddressForm';
import AddressVerification from '../../AddressVerification/container/AddressVerification.container';
import labels from '../container/AddressBook.labels';
import styles from '../styles/AddAddress.style';

// @flow

type Props = {
  className: ?string,
  submitAddAddressFormAction: any,
  verifyAddressAction: ({}) => void,
  addAddressResponse: any,
  userEmail: string,
  addressList: List<{}>,
};

export class AddAddress extends React.PureComponent<Props> {
  verifyAddress = payload => {
    const { verifyAddressAction } = this.props;
    verifyAddressAction(this.formatPayload(payload));
  };

  formatPayload = payload => {
    const { addressLine1, addressLine2, zipCode, primary, ...otherPayload } = payload;
    return {
      ...otherPayload,
      ...{
        address1: addressLine1,
        address2: addressLine2,
        zip: zipCode,
        primary: primary ? 'true' : 'false',
      },
    };
  };

  submitAddAddressForm = payloadParam => {
    const { submitAddAddressFormAction, userEmail } = this.props;
    const payload = Object.assign(payloadParam, {
      email: userEmail,
    });
    submitAddAddressFormAction(payload);
  };

  backToAddressBookClick = () => {
    Router.push('/account');
  };

  render() {
    const { className, addAddressResponse, addressList } = this.props;
    const isSuccess = addAddressResponse && addAddressResponse.get('addressId');
    const errorObject = addAddressResponse && addAddressResponse.get('errors');
    if (isSuccess) {
      Router.push('/account');
    }
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
          {errorObject && (
            <Notification
              status="error"
              colSize={{ large: 12, medium: 8, small: 6 }}
              message={errorObject.getIn(['0', 'errorKey'])}
            />
          )}
          <AddressVerification
            onSuccess={this.submitAddAddressForm}
            heading="Add Address"
            labels={labels}
            onError={this.submitAddAddressForm}
          />
          <AddAddressFormComponent
            backToAddressBookClick={this.backToAddressBookClick}
            onSubmit={this.verifyAddress}
            labels={labels}
            initialValues={{
              primary: addressList.size === 0,
              country: 'US',
              addressLine2: '',
            }}
          />
        </Grid>
      </div>
    );
  }
}

export default withStyles(AddAddress, styles);
