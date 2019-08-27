import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { routerPush } from '@tcp/core/src/utils';
import { BrandTabs, CountrySelector, PromotionalArea } from '../..';
import HeaderTopNavStyle from '../HeaderTopNav.style';

const HeaderTopNav = ({
  className,
  brandTabs,
  promoMessageWrapper,
  openOverlay,
  isUserLoggedIn,
  labels,
}) => {
  const onLinkClick = e => {
    e.preventDefault();
    if (!isUserLoggedIn) openOverlay({ state: true });
    else routerPush('/account', '/account');
  };
  return (
    <div className={className}>
      <PromotionalArea mobile data={promoMessageWrapper} />
      <div className="header-topnav__row">
        <div className="header-topnav__brand-tabs">
          <BrandTabs data={brandTabs} />
        </div>
        <div className="header-topnav__promo-area">
          <PromotionalArea mobile={false} data={promoMessageWrapper} />
        </div>
        <div className="header-topnav__track-order">
          <CountrySelector />
          <BodyCopy
            component="div"
            color="gray.900"
            className="track-order"
            fontFamily="secondary"
            fontSize="fs12"
            id="trackOrder"
            onClick={e => onLinkClick(e)}
            data-locator="track_order_header"
          >
            {labels.trackOrder &&
              labels.trackOrder.lbl_header_trackOrderOverlay_trackOrderHeaderLink}
          </BodyCopy>
        </div>
      </div>
    </div>
  );
};

HeaderTopNav.propTypes = {
  className: PropTypes.string.isRequired,
  brandTabs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  promoMessageWrapper: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  openOverlay: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  labels: PropTypes.shape({}),
};

HeaderTopNav.defaultProps = {
  labels: {
    trackOrder: {},
  },
};

export default withStyles(HeaderTopNav, HeaderTopNavStyle);
export { HeaderTopNav as HeaderTopNavVanilla };
