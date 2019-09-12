import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PayPalButton from '../../../../../../common/atoms/PaypalButton';

export class PayPalButtonContainer extends React.PureComponent<Props> {
  render() {
    return <PayPalButton />;
  }
}

PayPalButtonContainer.propTypes = {};

export const mapStateToProps = state => ({
  isFetching: state,
});

export default connect(
  mapStateToProps,
  null
)(PayPalButtonContainer);
