import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import config from '@tcp//core/src/config/site.config';
import { isClient } from '../../../../../utils';
import style from '../styles/BackToTop.style';

class BackToTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', throttle(this.addBackToTopBtn.bind(this), 100));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', throttle(this.addBackToTopBtn.bind(this), 100));
  }

  addBackToTopBtn = () => {
    const { showButton } = this.state;
    if (document.documentElement.scrollTop > config.SCROLL_TOP_POS && !showButton) {
      this.setState({ showButton: true });
    } else if (showButton && document.documentElement.scrollTop < config.SCROLL_TOP_POS) {
      this.setState({ showButton: false });
    }
  };

  scrollToTop = () => {
    if (isClient()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  render() {
    const { showButton } = this.state;
    const { className } = this.props;
    return (
      <button
        className={`${className} scrollToTopBtn scrollToTopBtn--${showButton ? 'show' : 'hide'}`}
        onClick={this.scrollToTop}
      >
        <span className="scrollToTop__arrowBtn" />
      </button>
    );
  }
}

BackToTop.propTypes = {
  className: PropTypes.string,
};

BackToTop.defaultProps = {
  className: '',
};

export default withStyles(BackToTop, style);
export { BackToTop as BackToTopVanilla };
