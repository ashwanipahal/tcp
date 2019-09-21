import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import styles from '../styles/ShippingMethodDisplay.style';

class ShippingMethodDisplay extends React.PureComponent {
  render() {
    const { className, displayName, labels } = this.props;

    return (
      <div className={className}>
        <div className="shipping-method-container">
          <BodyCopy
            fontSize="fs16"
            dataLocator=""
            fontFamily="secondary"
            color="gray.900"
            fontWeight="extrabold"
            className="heading"
          >
            {labels.methodTitle}
          </BodyCopy>
          <BodyCopy
            fontSize="fs16"
            dataLocator=""
            fontFamily="secondary"
            color="gray.900"
            fontWeight="regular"
          >
            {displayName}
          </BodyCopy>
        </div>
      </div>
    );
  }
}

ShippingMethodDisplay.propTypes = {
  className: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  labels: PropTypes.shape({}),
};

ShippingMethodDisplay.defaultProps = {
  labels: {
    methodTitle: 'Shipping Method',
  },
};

export default withStyles(ShippingMethodDisplay, styles);
