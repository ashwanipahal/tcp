import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';

import { BrandTabs, PromotionalArea } from '../..';
import HeaderTopNavStyle from '../HeaderTopNav.style';

const HeaderTopNav = ({ className, dataTopNav }) => {
  const { composites } = dataTopNav;
  return (
    <div className={className}>
      <PromotionalArea mobile data={composites.promo_message_wrapper} />
      <div className="header-topnav__row">
        <div className="header-topnav__brand-tabs">
          <BrandTabs data={composites.brand_tabs} />
        </div>
        <div className="header-topnav__promo-area">
          <PromotionalArea mobile={false} data={composites.promo_message_wrapper} />
        </div>
        <div className="header-topnav__track-order">Track order</div>
      </div>
    </div>
  );
};

HeaderTopNav.propTypes = {
  className: PropTypes.string.isRequired,
  dataTopNav: PropTypes.shape({
    brand_tabs: PropTypes.arrayOf(
      PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]))
    ),
  }).isRequired,
};

export default withStyles(HeaderTopNav, HeaderTopNavStyle);
export { HeaderTopNav as HeaderTopNavVanilla };
