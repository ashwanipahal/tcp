import React from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import { withRouter } from 'next/router';
import { initCheckout } from './Checkout.action';

// @flow

type Props = {
  initCheckout: void,
};

export class CheckoutContainer extends React.Component<Props> {
  componentDidMount() {
    const { initCheckout, router } = this.props;
    initCheckout(router.query.section);
  }

  render() {
    return <div>This is Checkout</div>;
  }
}

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    initCheckout: section => {
      dispatch(initCheckout(section));
    },
  };
};

const mapStateToProps = state => {
  return {};
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CheckoutContainer)
);
