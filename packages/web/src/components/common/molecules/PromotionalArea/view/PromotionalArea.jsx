import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import CarouselConfig from '@tcp/web/src/config/carousel';
import { getLocator } from '@tcp/core/src/utils';
import style from '../PromotionalArea.style';

const PromotionalArea = ({ className, data, mobile }) => {
  const carouselConfig = mobile
    ? CarouselConfig.CAROUSEL_OPTIONS
    : CarouselConfig.CAROUSEL_FADE_OPTIONS;
  const wrapperClass = mobile
    ? 'header-topnav__promo-area--mobile'
    : 'header-topnav__promo-area--tablet';

  return (
    <div className={className}>
      <div className={wrapperClass}>
        <Carousel options={carouselConfig} carouselConfig={{ type: 'dark', arrow: 'small' }}>
          {data.map(promotion => {
            return (
              <RichText
                key={promotion.id}
                richTextHtml={promotion.text}
                dataLocator={getLocator('global_promoareaimg')}
              />
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

PromotionalArea.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
  ).isRequired,
  mobile: PropTypes.bool,
};

PromotionalArea.defaultProps = {
  mobile: PropTypes.bool,
};

export default withStyles(PromotionalArea, style);
export { PromotionalArea as PromotionalAreaVanilla };
