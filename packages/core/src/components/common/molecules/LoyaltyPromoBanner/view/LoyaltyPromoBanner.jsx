import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Anchor, RichText, Row, Col } from '../../../atoms';
import { readCookie, setCookie } from '../../../../../utils/cookie.util';
import withStyles from '../../../hoc/withStyles';

import style from '../LoyaltyPromoBanner.style';

/**
 * Check if required UUID cookie available else return default.
 */
const getUUID = uuidCookieString => {
  const UUID = readCookie(uuidCookieString);
  return UUID ? UUID.split(',')[0] : '-1002';
};

/* istanbul ignore next */
const LoyaltyPromoBanner = props => {
  const {
    className,
    richTextList: [{ richText, link }],
    dataLocator,
  } = props;
  const cookieName = `mprAboveHead_${getUUID('WC_USERACTIVITY_')}`;
  const [bannerClosed, setBannerClosed] = useState(true);

  useEffect(() => {
    if (!readCookie(cookieName)) {
      setBannerClosed(false);
    }
  }, [bannerClosed]);

  const closeButtonHandler = () => {
    const currentDate = new Date();
    setCookie({
      key: cookieName,
      value: currentDate.toGMTString(),
      daysAlive: 10,
    });
    setBannerClosed(true);
  };

  return bannerClosed ? null : (
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
            <RichText richTextHtml={richText.text} />
          </Anchor>
          <button className="loyalty-promo-close-btn" onClick={closeButtonHandler}>
            <svg className="loyalty-promo-close-btn-icon" viewBox="0 0 25 25">
              <path
                fill="#a0a0a0"
                fillRule="nonzero"
                d="M14.107 12.5l10.56-10.56A1.136 1.136 0 1 0 23.06.333L12.5 10.893 1.94.333A1.136 1.136 0 1 0 .333 1.94l10.56 10.56L.333 23.06a1.136 1.136 0 1 0 1.607 1.607l10.56-10.56 10.56 10.56c.222.222.513.333.804.333a1.136 1.136 0 0 0 .803-1.94L14.107 12.5z"
              />
            </svg>
          </button>
        </Col>
      </Row>
    </div>
  );
};

LoyaltyPromoBanner.propTypes = {
  className: PropTypes.string.isRequired,
  richTextList: PropTypes.arrayOf(PropTypes.object),
  dataLocator: PropTypes.string,
};

LoyaltyPromoBanner.defaultProps = {
  richTextList: [
    {
      richText: { text: '' },
      link: {},
    },
  ],
  dataLocator: '',
};

export default withStyles(LoyaltyPromoBanner, style);
export { LoyaltyPromoBanner as LoyaltyPromoBannerVanilla };
