import React from 'react';
import PropTypes from 'prop-types';
import BrandTabs from '@tcp/web/src/components/common/molecules/BrandTabs';
import PromotionalArea from '@tcp/web/src/components/common/molecules/PromotionalArea';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import HeaderTopNavStyle from '../HeaderTopNav.style';

const HeaderTopNav = ({ className, dataTopNav }) => (
  <div className={className}>
    <PromotionalArea mobile data={dataTopNav.promo_message_wrapper} />
    <div className="header-topnav__row">
      <div className="header-topnav__brand-tabs">
        <BrandTabs data={dataTopNav.brand_tabs} />
      </div>
      <div className="header-topnav__promo-area">
        <PromotionalArea data={dataTopNav.promo_message_wrapper} />
      </div>
      <div className="header-topnav__track-order">Track order</div>
    </div>
  </div>
);

HeaderTopNav.propTypes = {
  className: PropTypes.string.isRequired,
  dataTopNav: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    .isRequired,
};

export default withStyles(HeaderTopNav, HeaderTopNavStyle);
export { HeaderTopNav as HeaderTopNavVanilla };
