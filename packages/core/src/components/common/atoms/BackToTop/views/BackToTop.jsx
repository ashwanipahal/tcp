import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import config from '@tcp//core/src/config/site.config';
import { isClient } from '../../../../../utils';
import style from '../styles/BackToTop.style';

const BackToTop = ({ className }) => {
  const [showButton, setShowButton] = useState(false);

  const addBackToTopBtn = () => {
    if (
      document.body.scrollTop > config.SCROLL_TOP_POS ||
      document.documentElement.scrollTop > config.SCROLL_TOP_POS
    ) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const fireScrollEvent = () => {
    let resizeId = '';
    window.addEventListener('scroll', () => {
      clearTimeout(resizeId);
      resizeId = setTimeout(addBackToTopBtn, 500);
    });
  };

  useEffect(() => {
    if (isClient() && (!showButton || document.body.scrollTop === 0)) {
      fireScrollEvent();
    }
  });

  const scrollToTop = () => {
    if (isClient()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      className={`${className} scrollToTopBtn scrollToTopBtn--${showButton ? 'show' : 'hide'}`}
      onClick={() => scrollToTop()}
    >
      <span className="scrollToTop__arrowBtn" />
    </button>
  );
};

BackToTop.propTypes = {
  className: PropTypes.string,
};

BackToTop.defaultProps = {
  className: '',
};

export default withStyles(BackToTop, style);
