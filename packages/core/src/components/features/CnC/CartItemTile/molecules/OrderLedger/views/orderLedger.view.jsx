import React from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Button from '../../../../../../common/atoms/Button';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/orderLedger.style';

const OrderLedgerContainer = ({ className }) => {
  const itemsCount = 4;
  const currencySymbol = '$';
  const subTotal = 61;
  const couponsTotal = 5;
  const savingsTotal = 5;
  const shippingTotal = 'FREE';
  const taxesTotal = 0;
  const grandTotal = 55.4;
  const giftCardsTotal = 7.98;
  const orderBalanceTotal = 47.98;
  const totalOrderSavings = 13.58;

  return (
    <React.Fragment>
      <Grid className={className}>
        <Row className="items-total rowMargin">
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontSemilBoldFamily"
              textAlign="left"
              fontWeight="bold"
              fontSize="fs16"
            >
              {`Items(${itemsCount}):`}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontSemilBoldFamily"
              fontWeight="bold"
              fontSize="fs16"
              textAlign="right"
            >
              {`${currencySymbol}${subTotal.toFixed(2)}`}
            </BodyCopy>
          </Col>
        </Row>
        <Row className="coupons-total rowMargin">
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="bold"
              fontSize="fs16"
            >
              {`Coupons:`}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="bold"
              fontSize="fs16"
              textAlign="right"
            >
              {`-${currencySymbol}${couponsTotal.toFixed(2)}`}
            </BodyCopy>
          </Col>
        </Row>
        <Row className="promotions-total rowMargin">
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="bold"
              fontSize="fs16"
            >
              {`Promotions`}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="bold"
              fontSize="fs16"
              textAlign="right"
            >
              {`-${currencySymbol}${savingsTotal.toFixed(2)}`}
            </BodyCopy>
          </Col>
        </Row>
        <Row className="shipping-total rowMargin">
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="bold"
              fontSize="fs16"
            >
              {`Shipping:`}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="bold"
              fontSize="fs16"
              textAlign="right"
            >
              {`${currencySymbol}${shippingTotal}`}
            </BodyCopy>
          </Col>
        </Row>
        <Row className="tax-total rowMargin">
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              tag="span"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="bold"
              fontSize="fs16"
            >
              {`Estimated Tax:`}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="bold"
              fontSize="fs16"
              textAlign="right"
            >
              {`${currencySymbol}${taxesTotal.toFixed(2)}`}
            </BodyCopy>
          </Col>
        </Row>
        <Row className="estimated-total rowMargin">
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="bold"
              fontSize="fs16"
            >
              {`Estimated Total:`}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="bold"
              fontSize="fs16"
              textAlign="right"
            >
              {`${currencySymbol}${grandTotal.toFixed(2)}`}
            </BodyCopy>
          </Col>
        </Row>
        <Row className="giftCard-total rowMargin">
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="bold"
              fontSize="fs16"
            >
              {`Gift Card(s):`}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="bold"
              fontSize="fs16"
              textAlign="right"
            >
              {`-${currencySymbol}${giftCardsTotal.toFixed(2)}`}
            </BodyCopy>
          </Col>
        </Row>
        <Row className="balance-total rowMargin">
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              tag="span"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="black"
              fontSize="fs18"
            >
              {`Balance:`}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              tag="span"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="black"
              fontSize="fs18"
              textAlign="right"
            >
              {`-${currencySymbol}${orderBalanceTotal.toFixed(2)}`}
            </BodyCopy>
          </Col>
        </Row>
        <Row className="total-order-savings rowMargin">
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="bold"
              fontSize="fs16"
            >
              {`Total Savings`}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="bold"
              fontSize="fs16"
              textAlign="right"
            >
              {`-${currencySymbol}${totalOrderSavings.toFixed(2)}`}
            </BodyCopy>
          </Col>
        </Row>
        <Row>
          <Col className="checkoutButton" colSize={{ large: 12, medium: 12, small: 12 }}>
            <Button
              buttonVariation="fixed-width"
              fullWidth
              fill="BLUE"
              data-locator="verifyaddress-continuebtn"
            >
              <BodyCopy
                component="span"
                color="white"
                fontWeight="extrabold"
                fontFamily="secondary"
                fontSize="fs14"
              >
                {'CHECKOUT'}
              </BodyCopy>
            </Button>
          </Col>
        </Row>
      </Grid>
    </React.Fragment>
  );
};

OrderLedgerContainer.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(OrderLedgerContainer, styles);
export { OrderLedgerContainer as OrderLedgerContainerVanilla };
