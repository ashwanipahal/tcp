import React from 'react';
import { PropTypes } from 'prop-types';
import Router from 'next/router'; //eslint-disable-line
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy, Anchor, Image, Row, Col } from '@tcp/core/src/components/common/atoms';
import style from '../CheckoutHeader.style';
import { BrandTabs } from '../../Header/molecules';
import CheckoutProgressIndicator from '../../CheckoutProgressIndicator';
import { getIconPath } from '../../../../../../../core/src/utils';

const CheckoutHeader = ({ className, brandTabs, labels }) => {
  return (
    <header className={className}>
      <Row className="header-topnav__row">
        <button
          onClick={() => {
            Router.push('/us/bag');
          }}
          className="exitFromCheckout"
        >
          <Image src={getIconPath('carrot-large-left')} className="collapsible-icon" />
        </button>

        <Col
          className="header-topnav__brand-tabs"
          colSize={{
            small: 4,
            medium: 2,
            large: 3,
          }}
        >
          <BrandTabs data={brandTabs} />
        </Col>
        <Col
          className="header-topnav__promo-area"
          colSize={{
            small: 1,
            medium: 4,
            large: 6,
          }}
        >
          <BodyCopy component="span" fontSize="fs32">
            {labels.checkoutHeaderLabel}
          </BodyCopy>
        </Col>

        <Col
          className="header-topnav__track-order"
          colSize={{
            small: 1,
            medium: 2,
            large: 3,
          }}
        >
          <BodyCopy component="span" fontSize="fs16" fontFamily="secondary">
            <Anchor
              fontSizeVariation="medium"
              underline
              anchorVariation="primary"
              to="/bag"
              data-locator="checkout-header-returnToBag"
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
          <BodyCopy component="span" fontSize="fs16">
            {labels.checkoutHeaderLabel}
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
          <CheckoutProgressIndicator />
        </Col>
      </Row>
    </header>
  );
};

CheckoutHeader.propTypes = {
  className: PropTypes.string.isRequired,
  brandTabs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  labels: PropTypes.shape({}).isRequired,
};

CheckoutHeader.defaultProps = {};

export default withStyles(CheckoutHeader, style);
