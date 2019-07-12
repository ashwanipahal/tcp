import React from 'react';
import PaymentSection from '../organisms/PaymentSection';

// @flow
type Props = {
  labels: Object,
};

const PaymentViewContainer = ({ labels }: Props) => {
  return <PaymentSection labels={labels} />;
};

export default PaymentViewContainer;
