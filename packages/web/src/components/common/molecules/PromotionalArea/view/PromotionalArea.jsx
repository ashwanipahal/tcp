import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import config from '@tcp/web/config';
import style from '../PromotionalArea.style';

const renderPromotions = promotions => {
  return promotions.map(item => {
    return <div dangerouslySetInnerHTML={{ __html: item.text }} />;
  });
};

const getMobilePomoArea = promotions => {
  return (
    <div className="header-topnav__promo-area--mobile">
      <Carousel options={config.CAROUSEL_OPTIONS}>{renderPromotions(promotions)}</Carousel>
    </div>
  );
};

const getDesktopPromoArea = promotions => {
  return <div className="header-topnav__promo-area--tablet">{renderPromotions(promotions)}</div>;
};

const PromotionalArea = ({ className, data, mobile }) => (
  <div className={className}>{mobile ? getMobilePomoArea(data) : getDesktopPromoArea(data)}</div>
);

PromotionalArea.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default withStyles(PromotionalArea, style);
export { PromotionalArea as PromotionalAreaVanilla };
