import React from 'react';
import PropTypes from 'prop-types';
import Col from '@tcp/core/src/components/common/atoms/Col';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/orderLedger.style';
import CollapsibleContainer from '../../../../../../common/molecules/CollapsibleContainer';
import OrderLedgerUtils from './orderLedger.util';

const getHeader = (labels, ledgerSummaryData) => {
  const { currencySymbol, orderBalanceTotal } = ledgerSummaryData;
  return (
    <div className="elem-mb-SM order-ledger-header">
      <BodyCopy fontFamily="secondary" fontSize="fs16" fontWeight="semibold" component="span">
        {`${labels.orderLedgerTitle} (${currencySymbol}${orderBalanceTotal &&
          orderBalanceTotal.toFixed(2)})`}
      </BodyCopy>
    </div>
  );
};

const OrderLedger = ({
  className,
  ledgerSummaryData,
  labels,
  showAccordian,
  confirmationPageLedgerSummaryData,
  isConfirmationPage,
  orderLedgerAfterView,
  pageCategory,
}) => {
  let summaryData = ledgerSummaryData;
  if (isConfirmationPage) {
    summaryData = confirmationPageLedgerSummaryData;
  }
  const header = getHeader(labels, summaryData);
  const body = OrderLedgerUtils.getBody(className, summaryData, labels, pageCategory);
  return (
    <div className={`${className} elem-mb-MED`}>
      <Col
        colSize={{
          large: 12,
          medium: 8,
          small: 6,
        }}
        ignoreGutter={{ small: true }}
      >
        <CollapsibleContainer
          className={`${showAccordian ? 'orderLedgerAccordian' : ''}`}
          header={header}
          body={body}
          iconLocator="arrowicon"
          defaultOpen={false}
          isDefaultView={!showAccordian}
        />
      </Col>
      {orderLedgerAfterView}
    </div>
  );
};

OrderLedger.propTypes = {
  className: PropTypes.string.isRequired,
  ledgerSummaryData: PropTypes.shape({
    itemsCount: PropTypes.number.isRequired,
    grandTotal: PropTypes.number,
    savingsTotal: PropTypes.number,
    subTotal: PropTypes.number,
    taxesTotal: PropTypes.number,
    couponsTotal: PropTypes.number,
    shippingTotal: PropTypes.number,
    giftCardsTotal: PropTypes.number,
    currencySymbol: PropTypes.string.isRequired,
    orderBalanceTotal: PropTypes.number,
    totalOrderSavings: PropTypes.number,
  }),
  labels: PropTypes.shape({}),
  pageCategory: PropTypes.string,
  orderLedgerAfterView: PropTypes.shape({}).isRequired,
  showAccordian: PropTypes.bool.isRequired,
  isConfirmationPage: PropTypes.bool,
  confirmationPageLedgerSummaryData: PropTypes.shape({
    itemsCount: PropTypes.number.isRequired,
    grandTotal: PropTypes.number,
    savingsTotal: PropTypes.number,
    subTotal: PropTypes.number,
    taxesTotal: PropTypes.number,
    couponsTotal: PropTypes.number,
    shippingTotal: PropTypes.number,
    giftCardsTotal: PropTypes.number,
    currencySymbol: PropTypes.string.isRequired,
    orderBalanceTotal: PropTypes.number,
  }),
};

OrderLedger.defaultProps = {
  ledgerSummaryData: {},
  labels: {},
  confirmationPageLedgerSummaryData: {},
  isConfirmationPage: false,
  pageCategory: '',
};
export default withStyles(OrderLedger, styles);
export { OrderLedger as OrderLedgerVanilla };
