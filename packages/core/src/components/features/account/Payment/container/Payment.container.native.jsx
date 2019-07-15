import React from 'react';
import PaymentView from '../views/Payment.view.native';
import labels from './Payment.labels';

const PaymentViewContainer = () => {
  return <PaymentView labels={labels} />;
};

export default PaymentViewContainer;
