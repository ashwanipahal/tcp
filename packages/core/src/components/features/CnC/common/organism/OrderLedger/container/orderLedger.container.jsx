import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BagPageSelector from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.selectors';
import OrderLedger from '../views/orderLedger.view';
import { getLedgerSummaryData, getOrderLedgerLabels } from './orderLedger.selector';
import confirmationSelectors from '../../../../Confirmation/container/Confirmation.selectors';

const OrderLedgerContainer = props => {
  const {
    className,
    ledgerSummaryData,
    labels,
    showAccordian,
    confirmationPageLedgerSummaryData,
    isConfirmationPage,
    orderLedgerAfterView,
    pageCategory,
    navigation,
    bagLoadingSection,
    bagLoadingPageLevel,
  } = props;
  const bagLoading = bagLoadingSection || bagLoadingPageLevel;
  return (
    <OrderLedger
      className={className}
      ledgerSummaryData={ledgerSummaryData}
      labels={labels}
      showAccordian={showAccordian}
      orderLedgerAfterView={orderLedgerAfterView}
      confirmationPageLedgerSummaryData={confirmationPageLedgerSummaryData}
      isConfirmationPage={isConfirmationPage}
      pageCategory={pageCategory}
      navigation={navigation}
      bagLoading={bagLoading}
    />
  );
};

OrderLedgerContainer.propTypes = {
  className: PropTypes.string.isRequired,
  ledgerSummaryData: PropTypes.string.isRequired,
  labels: PropTypes.string.isRequired,
  showAccordian: PropTypes.string.isRequired,
  isConfirmationPage: PropTypes.string.isRequired,
  orderLedgerAfterView: PropTypes.string.isRequired,
  confirmationPageLedgerSummaryData: PropTypes.string.isRequired,
  pageCategory: PropTypes.string.isRequired,
  navigation: PropTypes.string.isRequired,
  bagLoadingSection: PropTypes.bool.isRequired,
  bagLoadingPageLevel: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    className: 'order-summary',
    ledgerSummaryData: getLedgerSummaryData(state),
    labels: getOrderLedgerLabels(state),
    bagLoadingSection: BagPageSelector.isBagLoading(state),
    confirmationPageLedgerSummaryData: confirmationSelectors.getLedgerSummaryDataConfirmation(
      state
    ),
  };
}

export default connect(mapStateToProps)(OrderLedgerContainer);
export const OrderLedgerContainerVanilla = OrderLedgerContainer;
