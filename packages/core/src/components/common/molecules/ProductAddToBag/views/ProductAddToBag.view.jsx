import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

class ProductAddToBag extends React.PureComponent<Props> {
  render() {
    return null;
  }
}
export default connect()(
  reduxForm({
    form: 'ProductAddToBag',
    enableReinitialize: true,
  })(ProductAddToBag)
);
