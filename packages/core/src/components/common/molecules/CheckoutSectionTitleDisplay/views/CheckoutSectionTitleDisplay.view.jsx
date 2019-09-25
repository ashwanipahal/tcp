import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';
import styles from '../styles/CheckoutSectionTitleDisplay.view.style';

class CheckoutSectionTitleDisplay extends React.PureComponent {
  render() {
    const { title, className } = this.props;
    return (
      <div className={className}>
        <div className="checkoutSectionTitle">
          <BodyCopy
            fontFamily="primary"
            fontSize="fs16"
            fontWeight="extrabold"
            data-locator="pickup-title"
          >
            {title}
          </BodyCopy>
        </div>
      </div>
    );
  }
}

CheckoutSectionTitleDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default withStyles(CheckoutSectionTitleDisplay, styles);
export { CheckoutSectionTitleDisplay as CheckoutSectionTitleDisplayVanilla };
