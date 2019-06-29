import React from 'react';
import { reduxForm } from 'redux-form';
import { Provider } from 'react-redux';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import store from './Form/store';
import AddressValidationForm from './Form/FieldLevelValidationForm';

const onSubmitForm = mydata => {
  // submitInfo({
  //       id: '63987687',
  //     format: 'json',
  //     act: 'Check',
  //     cols: 'Plus4,DeliveryIndicator',
  //     a1: street,
  //     city: city,
  //     state: state,
  //     postal: zip,
  //     ctry: country,
  // })
};
export class AddAddress extends React.Component<Props> {
  render() {
    const {
      submitAddAddressForm,
      showDefaultShippingUpdatedMsg,
    } = this.props;
    return (
      <div>
       showDefaultShippingUpdatedMsg :  {showDefaultShippingUpdatedMsg}
      <form>
        <Grid>
          <br />
          <Provider store={store}>
            <AddressValidationForm showDefaultShippingUpdatedMsg={showDefaultShippingUpdatedMsg} onSubmit={submitAddAddressForm} />
          </Provider>
        </Grid>
      </form>
      </div>
    )
  }
}

// const AddAddress = ({ onSubmit, submitAddAddressForm }) => {
//   return (

//   );
// };

export default reduxForm({
  form: 'addressinfo', // a unique identifier for this form
})(AddAddress);
