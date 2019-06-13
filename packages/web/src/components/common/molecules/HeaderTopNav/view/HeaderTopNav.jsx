import React from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import BrandTabs from '@tcp/web/src/components/common/molecules/BrandTabs';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import HeaderTopNavStyle from '../HeaderTopNav.style';

const HeaderTopNav = ({ className, dataTopNav }) => (
  <Row fullBleed className={className}>
    <Col
      className="header-topnav__brand-tabs"
      colSize={{
        large: 3,
        medium: 3,
        small: 4,
      }}
    >
      <BrandTabs data={dataTopNav.brand_tabs} />
    </Col>
    <Col
      className="header-topnav__promo-area"
      colSize={{
        large: 6,
        medium: 2,
        small: 0,
      }}
    >
      Promo Area
    </Col>
    <Col
      className="header-topnav__track-order"
      colSize={{
        large: 3,
        medium: 2,
        small: 2,
      }}
    >
      Track order
    </Col>
  </Row>
);

HeaderTopNav.propTypes = {
  className: PropTypes.string.isRequired,
  dataTopNav: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    .isRequired,
};

export default withStyles(HeaderTopNav, HeaderTopNavStyle);
export { HeaderTopNav as HeaderTopNavVanilla };
