import React from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import PayPalButton from '@tcp/core/src/components/common/atoms/PaypalButton';
import Button from '@tcp/core/src/components/common/atoms/Button';

import MiniBagFooterStyle from '../styles/MiniBagFooter.style';

const MiniBagFooter = () => {
  const data = {
    subTotal: 34,
  };
  const labels = {
    subTotal: 'Subtotal',
  };
  return (
    <MiniBagFooterStyle>
      <div className="miniBagFooter">
        <BodyCopy tag="span" fontSize="fs14" fontWeight="semibold" className="subTotal">
          {`${labels.subTotal}: $${data.subTotal}`}
        </BodyCopy>
        <Row className="checkout-button">
          <PayPalButton className="payPal-button" />

          <Button className="checkout">
            <BodyCopy
              component="span"
              color="white"
              fontWeight="extrabold"
              fontFamily="secondary"
              fontSize="fs14"
            >
              {`Checkout`}
            </BodyCopy>
          </Button>
        </Row>
      </div>
    </MiniBagFooterStyle>
  );
};

export default MiniBagFooter;
