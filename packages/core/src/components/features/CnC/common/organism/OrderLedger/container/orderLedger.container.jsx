import React from 'react';
import { connect } from 'react-redux';
import OrderLedger from '../views/orderLedger.view';
import { getLedgerSummaryData, getOrderLedgerLabels } from './orderLedger.selector';
import confirmationSelectors from '../../../../Confirmation/container/Confirmation.selectors';

// @flow

type Props = {
  className: string,
  ledgerSummaryData: any,
  labels: any,
  showAccordian: any,
  isConfirmationPage: any,
  orderLedgerAfterView: any,
  confirmationPageLedgerSummaryData: any,
  pageCategory: any,
};

export const OrderLedgerContainer = ({
  className,
  ledgerSummaryData,
  labels,
  showAccordian,
  confirmationPageLedgerSummaryData,
  isConfirmationPage,
  orderLedgerAfterView,
  pageCategory,
}: Props) => (
  <OrderLedger
    className={className}
    ledgerSummaryData={ledgerSummaryData}
    labels={labels}
    showAccordian={showAccordian}
    orderLedgerAfterView={orderLedgerAfterView}
    confirmationPageLedgerSummaryData={confirmationPageLedgerSummaryData}
    isConfirmationPage={isConfirmationPage}
    pageCategory={pageCategory}
  />
);

function mapStateToProps(state) {
  return {
    className: 'order-summary',
    ledgerSummaryData: getLedgerSummaryData(state),
    labels: getOrderLedgerLabels(state),
    confirmationPageLedgerSummaryData: confirmationSelectors.getLedgerSummaryDataConfirmation(
      state
    ),
  };
}

export default connect(mapStateToProps)(OrderLedgerContainer);
