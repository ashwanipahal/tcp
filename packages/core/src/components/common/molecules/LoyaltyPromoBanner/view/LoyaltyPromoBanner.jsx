import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Anchor, RichText, Row, Col } from '../../../atoms';
import { readCookie, setCookie } from '../../../../../utils/cookie.util';
import withStyles from '../../../hoc/withStyles';

import style from '../LoyaltyPromoBanner.style';

export const useLoyaltyBannerCloseStatus = () => {
  const [bannerClosed, setBannerClosed] = useState(true);

  useEffect(() => {
    const getUUID = uuidCookieString => {
      const UUID = readCookie(uuidCookieString);
      return UUID ? UUID.split(',')[0] : '-1002';
    };
    const cookieName = `mprAboveHead_${getUUID('WC_USERACTIVITY_')}`;
    const closeBtn = document.getElementById('loyaltyBannerCloseBtn');
    const closeButtonHandler = e => {
      e.stopPropagation();
      const currentDate = new Date();
      setCookie({
        key: cookieName,
        value: currentDate.toGMTString(),
        daysAlive: 10,
      });
      setBannerClosed(true);
    };

    if (!readCookie(cookieName)) {
      if (closeBtn) {
        closeBtn.addEventListener('click', closeButtonHandler);
      }
      setBannerClosed(false);
    }

    return () => {
      if (closeBtn) {
        closeBtn.removeEventListener('click', closeButtonHandler);
      }
    };
  }, [bannerClosed]);

  return bannerClosed;
};

/* istanbul ignore next */
const LoyaltyPromoBanner = props => {
  const {
    className,
    richTextList: [{ text, link }],
    dataLocator,
  } = props;

  return !useLoyaltyBannerCloseStatus() ? (
    <div className={`${className} content-wrapper`}>
      <Row>
        <Col
          colSize={{
            small: 6,
            medium: 8,
            large: 12,
          }}
        >
          <Anchor
            to={link.url}
            asPath={link.url}
            target={link.target}
            title={link.title}
            dataLocator={dataLocator || `loyalty-promo-banner`}
          >
            <RichText richTextHtml={text} />
          </Anchor>
        </Col>
      </Row>
    </div>
  ) : null;
};

LoyaltyPromoBanner.propTypes = {
  className: PropTypes.string.isRequired,
  richTextList: PropTypes.arrayOf(PropTypes.object),
  dataLocator: PropTypes.string,
};

LoyaltyPromoBanner.defaultProps = {
  richTextList: [
    {
      text: `
  <style>

.loyalty-banner-wrapper {
  height: 23px;
  display: flex;
  justify-content: space-between;
}

.loyalty-banner-wrapper__item {
  display: flex;
  align-items: center;
}

.loyalty-banner-wrapper__divider {
  width: 1px;
  height: 100%;
  background-color: #d8d8d8;
  margin: 0 8px;
}

.loyalty-banner-wrapper__text-content {
  font-family: Arial;
  font-size: 12px;
  text-align: center;
  color: #d8d8d8;
}

.content-3X {
  width: auto;
  font-size: 22px;
  font-weight: bold;
  padding: 0 8px;
}

.the-my-place-rewards {
  width: 240px;
  font-size: 10px;
  line-height: 1.04;
  text-align: left;
}

.loyalty-banner-wrapper__img {
  height: 100%;
  margin-right: 4px;
}
.loyalty-banner-wrapper__img img {
  height: 100%;
}

.loyalty-banner-wrapper__close-btn {
  padding: 0 8px;
  margin-left: 10px;
  cursor: pointer;
  border:0;
  background: transparent;
}

.loyalty-banner-close-btn-icon {
  width: 8px;
  height: 8px;
}

@media (max-width: 767px) {
  .hide-on-mobile {
    display: none;
  }
}

@media (min-width: 768px) {
  .loyalty-banner-wrapper__divider {
    margin: 0 14px;
  }
  .the-my-place-rewards {
    width: 310px;
    font-size: 13px;
  }
  .loyalty-banner-wrapper__img {
    height: 23px;
    margin-right: 4px;
  }
}

@media (min-width: 1200px) {
  .loyalty-banner-wrapper {
    height: 45px;
  }
  .loyalty-banner-wrapper__divider {
    margin: 0 22px;
  }
  .loyalty-banner-wrapper__item {
    height: 45px;
  }
  .loyalty-banner-wrapper__text-content {
    font-size: 22px;
  }

  .content-3X {
    font-size: 58px;
  }

  .the-my-place-rewards {
    width: 590px;
    font-size: 22px;
  }
  .loyalty-banner-wrapper__img {
    height: 44px;
    margin-right: 8px;
  }
  .loyalty-banner-close-btn-icon {
    width: 16px;
    height: 16px;
  }
}
  </style>


<div class="loyalty-banner-wrapper">
  <div class="loyalty-banner-wrapper__item hide-on-mobile">
    <div class="loyalty-banner-wrapper__text-content">
      BONUS POINTS EVENT
    </div>
  </div>

  <div class="loyalty-banner-wrapper__divider hide-on-mobile"></div>

  <div class="loyalty-banner-wrapper__item hide-on-mobile">
    <div class="loyalty-banner-wrapper__text-content">
      MARCH 7-APRIL 21, 2019
    </div>
  </div>
  <div class="loyalty-banner-wrapper__divider hide-on-mobile"></div>
  <div class="loyalty-banner-wrapper__item">
    <div class="loyalty-banner-wrapper__img">
          <img src="https://test5.childrensplace.com/image/upload//v1571658182/tcp-loyality.png" alt="Rewards">
    </div>
    <div class="loyalty-banner-wrapper__text-content content-3X">
        3X
  </div>
  <div class="loyalty-banner-wrapper__text-content the-my-place-rewards">
  THE MY PLACE REWARDS POINTS
ON ALL EASTER DRESS UP & MATCHING FAMILY STYLES
</div>

  </div>

  <button id="loyaltyBannerCloseBtn" class="loyalty-banner-wrapper__item loyalty-banner-wrapper__close-btn">
    <svg class="loyalty-banner-close-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
    <path fill="#a0a0a0" fill-rule="nonzero" d="M14.107 12.5l10.56-10.56A1.136 1.136 0 1 0 23.06.333L12.5 10.893 1.94.333A1.136 1.136 0 1 0 .333 1.94l10.56 10.56L.333 23.06a1.136 1.136 0 1 0 1.607 1.607l10.56-10.56 10.56 10.56c.222.222.513.333.804.333a1.136 1.136 0 0 0 .803-1.94L14.107 12.5z"/>
</svg>
  </button>
</div>`,
      link: {
        url: '/banner/url',
        text: '',
        title: '',
        external: 0,
        target: '',
        action: '<action_value>',
      },
    },
  ],
  dataLocator: '',
};

export default withStyles(LoyaltyPromoBanner, style);
export { LoyaltyPromoBanner as LoyaltyPromoBannerVanilla };
