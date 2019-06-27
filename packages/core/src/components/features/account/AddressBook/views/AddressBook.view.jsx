import React from 'react';
import { reduxForm } from 'redux-form';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import AddAddress from '../container/AddAddress.container';

const AddressBook = () => {
  return (
    <form>
      <Grid>
        <br />
        <AddAddress />
      </Grid>
    </form>
  );
};

export default reduxForm({
  form: 'addressinfo', // a unique identifier for this form
})(AddressBook);
