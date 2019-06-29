import React from 'react';
import { reduxForm } from 'redux-form';
import { Provider } from 'react-redux';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import { Heading } from '@tcp/core/styles/themes/TCP/typotheme';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import store from './Form/store';
import AddressValidationForm from './Form/FieldLevelValidationForm';
import styles from '../styles/AddAddress.style';

// @flow
type Props = {
  className: string,
};

class AddAddress extends React.Component<Props> {
  render() {
    const { className, submitAddAddressForm, showDefaultShippingUpdatedMsg } = this.props;
    return (
      <div className={className}>
        <Heading
          fontFamily="secondaryFontFamily"
          HeadingLarge="six"
          tag="h4"
          className="addAddress__separator"
        >
          Add New Shipping Address showDefaultShippingUpdatedMsg : {showDefaultShippingUpdatedMsg}
        </Heading>
        <form>
          <Grid>
            <br />
            <Notification
              status="error"
              colSize={{ large: 12, medium: 8, small: 6 }}
              message="error"
            />
            <Provider store={store}>
              <AddressValidationForm onSubmit={submitAddAddressForm} />
            </Provider>
          </Grid>
        </form>
      </div>
    );
  }
}

// const AddAddress = ({ onSubmit, submitAddAddressForm }) => {
//   return (

//   );
// };
export default withStyles(AddAddress, styles);
