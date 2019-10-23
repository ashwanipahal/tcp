import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy, Anchor, Image, Row, Col } from '@tcp/core/src/components/common/atoms';
import checkoutUtil from '@tcp/core/src/components/features/CnC/Checkout/util/utility';
import { CHECKOUT_ROUTES } from '@tcp/core/src/components/features/CnC/Checkout/Checkout.constants';
import style from '../CheckoutHeader.style';
import { BrandTabs } from '../../Header/molecules';
import CheckoutProgressIndicator from '../../CheckoutProgressIndicator';
import { getIconPath } from '../../../../../../../core/src/utils';

/**
 * This component will render the CheckoutHeader for checkout journey
 * @param { string } className
 * @param { Object } brandTabs Tabs
 * @param { Object } labels Labels
 * @param { Boolean } isInternationalShipping shipping internationally or not
 * @param {Boolean} isExpressCheckoutPage express checkout or not
 */
const CheckoutHeader = ({
  className,
  brandTabs,
  labels,
  isInternationalShipping,
  itemsCount,
  isExpressCheckoutPage,
}) => {
  return (
    <header className={className}>
      {itemsCount > 0 && (
        <>
          <Row className="header-topnav__row">
            <button
              onClick={() => {
                checkoutUtil.routeToPage(CHECKOUT_ROUTES.bagPage);
              }}
              className="exitFromCheckout"
            >
              <Image src={getIconPath('carrot-large-left')} className="collapsible-icon" />
            </button>

            <Col
              className="header-topnav__brand-tabs"
              colSize={{
                small: 4,
                medium: 4,
                large: 4,
              }}
            >
              <BrandTabs data={brandTabs} />
            </Col>
            <Col
              className="header-topnav__promo-area"
              colSize={{
                small: 1,
                medium: 3,
                large: 4,
              }}
            >
              <BodyCopy component="span" fontSize="fs32">
                {isExpressCheckoutPage ? labels.expressCheckoutLbl : labels.checkoutHeaderLabel}
              </BodyCopy>
            </Col>

            <Col
              className="header-topnav__track-order"
              colSize={{
                small: 1,
                medium: 1,
                large: 4,
              }}
            >
              <BodyCopy component="span" fontSize="fs16" fontFamily="secondary">
                <Anchor
                  fontSizeVariation="medium"
                  underline
                  anchorVariation="primary"
                  to="/bag"
                  dataLocator="checkout-header-returnToBag"
                >
                  {labels.returnBagLabel}
                </Anchor>
              </BodyCopy>
            </Col>
          </Row>
          <Row className="checkout-mobile-header" centered>
            <Col
              colSize={{
                small: 6,
                medium: 8,
                large: 12,
              }}
            >
              <BodyCopy component="span" fontSize="fs16" fontWeight="semibold">
                {isExpressCheckoutPage ? labels.expressCheckoutLbl : labels.checkoutHeaderLabel}
              </BodyCopy>
            </Col>
          </Row>
          <Row className="header-stepindicator" centered>
            <Col
              colSize={{
                small: 6,
                medium: 8,
                large: 12,
              }}
            >
              {!isInternationalShipping && <CheckoutProgressIndicator />}
            </Col>
          </Row>
        </>
      )}
    </header>
  );
};

CheckoutHeader.propTypes = {
  className: PropTypes.string.isRequired,
  brandTabs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  labels: PropTypes.shape({}).isRequired,
  isInternationalShipping: PropTypes.bool.isRequired,
  itemsCount: PropTypes.number.isRequired,
  isExpressCheckoutPage: PropTypes.bool,
};

CheckoutHeader.defaultProps = {
  isExpressCheckoutPage: false,
};

export default withStyles(CheckoutHeader, style);
export { CheckoutHeader as CheckoutHeaderVanilla };
