import React from 'react';
import { PropTypes } from 'prop-types';
import Router from 'next/router'; //eslint-disable-line
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy, Anchor, Image } from '@tcp/core/src/components/common/atoms';
import style from '../CheckoutHeader.style';
import { BrandTabs } from '../../Header/molecules';
import CheckoutProgressIndicator from '../../CheckoutProgressIndicator';
import { getIconPath } from '../../../../../../../core/src/utils';

const CheckoutHeader = ({ className, brandTabs, labels }) => {
  return (
    <header className={className}>
      <div className="header-topnav__row">
        <button
          onClick={() => {
            Router.push('/us/bag');
          }}
          className="exitFromCheckout"
        >
          <Image src={getIconPath('carrot-large-left')} className="collapsible-icon" />
        </button>

        <div className="header-topnav__brand-tabs">
          <BrandTabs data={brandTabs} />
        </div>
        <div className="header-topnav__promo-area">
          <BodyCopy component="span" fontSize="fs32">
            {labels.checkoutHeaderLabel}
          </BodyCopy>
        </div>

        <div className="header-topnav__track-order">
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
        </div>
      </div>
      <div className="header-stepindicator">
        <CheckoutProgressIndicator />
      </div>
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
