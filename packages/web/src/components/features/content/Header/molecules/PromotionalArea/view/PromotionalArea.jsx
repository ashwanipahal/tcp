import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import { Anchor, RichText } from '@tcp/core/src/components/common/atoms';
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
      {/* eslint-disable-next-line */}
      <div className={wrapperClass} tabIndex="0">
        <Carousel options={carouselConfig} carouselConfig={{ type: 'dark', arrow: 'small' }}>
          {data &&
            data.map(promotion => {
              const {
                richText: { text, __typename },
                link: { url, target },
              } = promotion;
              const htmlTemplate = `<span>${text}</span>`;
              return (
                <Anchor to={url} target={target}>
                  <RichText
                    className="header-topnav__promo-area-content"
                    key={__typename}
                    richTextHtml={htmlTemplate}
                    dataLocator={getLocator('global_promoareaimg')}
                  />
                </Anchor>
              );
            })}
        </Carousel>
      </div>
    </div>
  );
};

PromotionalArea.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  mobile: PropTypes.bool,
};

PromotionalArea.defaultProps = {
  mobile: PropTypes.bool,
};

export default withStyles(PromotionalArea, style);
export { PromotionalArea as PromotionalAreaVanilla };
