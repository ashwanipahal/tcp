import React from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Button from '../../../../../../common/atoms/Button';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import PayPalButton from '../../../../../../common/atoms/PaypalButton';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/CheckoutActions.style';

// @flow
type Props = {
  labels: any,
};
const CheckoutActions = ({ labels }: Props) => {
  return (
    <Grid>
      <Row className="checkout-actions">
        <Col className="checkout-button" colSize={{ large: 12, medium: 12, small: 12 }}>
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
              {labels.checkout}
            </BodyCopy>
          </Button>
        </Col>
        <Col colSize={{ large: 12, medium: 12, small: 12 }}>
          <PayPalButton className="payPal-button" />
        </Col>
      </Row>
    </Grid>
  );
};

export default withStyles(CheckoutActions, styles);
export { CheckoutActions as CheckoutActionsVanilla };
