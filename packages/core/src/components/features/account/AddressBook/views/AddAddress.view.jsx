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
  className: ?string,
  submitAddAddressFormAction: any,
  addAddressResponse: any,
  userEmail: string,
};

export class AddAddress extends React.PureComponent<Props> {
  submitAddAddressForm = payload => {
    const { submitAddAddressFormAction, userEmail } = this.props;
    const formattedPayload = { ...payload, ...{ email: userEmail } };
    submitAddAddressFormAction(formattedPayload);
  };

  backToAddressBookClick = () => {
    Router.push('/account');
  };

  render() {
    const { className, addAddressResponse } = this.props;
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
          <AddAddressFormComponent
            backToAddressBookClick={this.backToAddressBookClick}
            onSubmit={this.submitAddAddressForm}
          />
        </Grid>
      </div>
    );
  }
}

export default withStyles(AddAddress, styles);
