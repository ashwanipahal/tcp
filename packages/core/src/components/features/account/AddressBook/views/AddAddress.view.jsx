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
  submitAddAddressForm: any,
  showMessageForAddAddressMsg: any,
  AddAddresslabels: any,
};
const AddAddress = ({
  className,
  submitAddAddressForm,
  showMessageForAddAddressMsg,
  AddAddresslabels,
}: Props) => {
  const msgInfo = JSON.parse(`${showMessageForAddAddressMsg}`);
  return (
    <div className={className}>
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
                msgInfo ? AddAddresslabels.addAddressFail : AddAddresslabels.addAddressFailSuccess
              }
            />
          )}
          <Provider store={store}>
            <AddressValidationForm onSubmit={submitAddAddressForm} />
          </Provider>
        </Grid>
      </form>
    </div>
  );
};
// const AddAddress = ({ onSubmit, submitAddAddressForm }) => {
//   return (

//   );
// };
export default reduxForm({
  form: 'addressinfo', // a unique identifier for this form
})(withStyles(AddAddress, styles));
