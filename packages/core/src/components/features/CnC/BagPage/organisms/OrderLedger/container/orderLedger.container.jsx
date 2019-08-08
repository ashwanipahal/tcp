import React from 'react';
import { connect } from 'react-redux';
import OrderLedger from '../views/orderLedger.view';
import { getLedgerSummaryData, getOrderLedgerLabels } from './orderLedger.selector';

// @flow

type Props = {
  className: string,
  ledgerSummaryData: any,
  labels: any,
};

export const OrderLedgerContainer = ({ className, ledgerSummaryData, labels }: Props) => (
  <OrderLedger className={className} ledgerSummaryData={ledgerSummaryData} labels={labels} />
);

function mapStateToProps(state) {
  return {
    className: 'order-summary',
    ledgerSummaryData: getLedgerSummaryData(state),
    labels: getOrderLedgerLabels(state),
  };
}

export default connect(mapStateToProps)(OrderLedgerContainer);
