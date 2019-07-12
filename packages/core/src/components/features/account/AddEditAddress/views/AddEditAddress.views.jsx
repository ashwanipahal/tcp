import React from 'react';
import Router from 'next/router'; //eslint-disable-line
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import { Heading } from '@tcp/core/styles/themes/TCP/typotheme';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Anchor from '../../../../common/atoms/Anchor';
import AddressFormComponent from '../../common/organism/AddressForm/AddressForm';
import AddressVerification from '../../AddressVerification/container/AddressVerification.container';
import labels from '../../AddressBook/container/AddressBook.labels';
import styles from '../styles/AddEditAddress.style';

// @flow

type Props = {
  className: ?string,
  submitAddressFormAction: any,
  verifyAddressAction: ({}) => void,
  addressResponse: any,
  userEmail: string,
  initialValues?: object,
};

export class AddEditAddress extends React.PureComponent<Props> {
  submitAddAddressForm = payloadParam => {
    const { submitAddressFormAction, userEmail } = this.props;
    const payload = Object.assign(payloadParam, {
      email: userEmail,
    });
    submitAddressFormAction(payload);
  };

  backToAddressBookClick = () => {
    Router.push('/account');
  };

  render() {
    const { className, addressResponse, initialValues } = this.props;
    const isSuccess = addressResponse && addressResponse.get('addressId');
    const errorObject = addressResponse && addressResponse.get('errors');
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
          <AddressFormComponent
            backToAddressBookClick={this.backToAddressBookClick}
            onSubmit={this.verifyAddress}
            labels={labels}
            initialValues={initialValues}
          />
        </Grid>
      </div>
    );
  }
}

AddEditAddress.defaultProps = {
  initialValues: {},
};

export default withStyles(AddEditAddress, styles);
