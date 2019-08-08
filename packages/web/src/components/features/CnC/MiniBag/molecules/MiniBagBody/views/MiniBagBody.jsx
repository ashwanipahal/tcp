import React from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import PayPalButton from '@tcp/core/src/components/common/atoms/PaypalButton';
import Button from '@tcp/core/src/components/common/atoms/Button';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/MiniBagBody.style';
import ProductTileWrapper from '../../../container/ProductTileWrapperContainer.container';
import EmptyMiniBag from '../../EmptyMiniBag/views/EmptyMiniBag';
// @flow

type Props = {
  labels: any,
  className: string,
  userName: any,
  cartItemCount: any,
  subTotal: any,
};
const MiniBagBody = ({ labels, className, userName, cartItemCount, subTotal }: Props) => {
  const data = {
    savedforLaterQty: 1,
  };

  return (
    <div className={className}>
      <BodyCopy component="div" className="viewBagAndProduct">
        <Row className="mainWrapper">
          <Col className="subHeaderText" colSize={{ small: 6, medium: 8, large: 12 }}>
            {userName ? (
              <BodyCopy component="span" fontSize="fs12" textAlign="left">
                <Anchor
                  fontSizeVariation="small"
                  underline
                  anchorVariation="primary"
                  noLink
                  to=""
                  data-locator="addressbook-makedefault"
                >
                  {`${labels.viewBag}(${cartItemCount})`}
                </Anchor>
                {` `}
                <Anchor
                  fontSizeVariation="small"
                  underline
                  anchorVariation="primary"
                  noLink
                  data-locator="addressbook-makedefault"
                >
                  {`${labels.viewSaveForLater}(${data.savedforLaterQty})`}
                </Anchor>
              </BodyCopy>
            ) : (
              <BodyCopy component="span" fontSize="fs12" textAlign="left">
                <Anchor
                  fontSizeVariation="small"
                  underline
                  anchorVariation="primary"
                  noLink
                  to=""
                  data-locator="addressbook-makedefault"
                >
                  {`${labels.viewBag}(${cartItemCount})`}
                </Anchor>
              </BodyCopy>
            )}
          </Col>
        </Row>
        {cartItemCount ? (
          <ProductTileWrapper />
        ) : (
          <EmptyMiniBag labels={labels} userName={userName} />
        )}
      </BodyCopy>
      {cartItemCount ? (
        <div className="miniBagFooter">
          <BodyCopy tag="span" fontSize="fs14" fontWeight="semibold" className="subTotal">
            {`${labels.subTotal}: $${subTotal || 0}`}
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
                {`${labels.checkOut}`}
              </BodyCopy>
            </Button>
          </Row>
        </div>
      ) : (
        <div className="miniBagFooter">
          <BodyCopy tag="span" fontSize="fs14" fontWeight="semibold" className="subTotalEmpty">
            {`${labels.subTotal}: $0.00`}
          </BodyCopy>
        </div>
      )}
    </div>
  );
};
export default withStyles(MiniBagBody, styles);
