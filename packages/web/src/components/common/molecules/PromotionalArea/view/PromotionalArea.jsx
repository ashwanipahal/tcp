import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import config from '@tcp/web/config';
import style from '../PromotionalArea.style';

const PromotionalArea = ({ className, data, mobile }) => {
  const carouselConfig = mobile ? config.CAROUSEL_OPTIONS : config.CAROUSEL_FADE_OPTIONS;
  const wrapperClass = mobile
    ? 'header-topnav__promo-area--mobile'
    : 'header-topnav__promo-area--tablet';

  return (
    <div className={className}>
      <div className={wrapperClass}>
        <Carousel options={carouselConfig}>
          {data.map(promotion => {
            return <RichText richTextHtml={promotion.text} dataLocator="global_promoareaimg" />;
          })}
        </Carousel>
      </div>
    </div>
  );
};

PromotionalArea.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default withStyles(PromotionalArea, style);
export { PromotionalArea as PromotionalAreaVanilla };
