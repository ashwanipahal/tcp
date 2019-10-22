import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../atoms/BodyCopy';
import {
  CheckoutSectionTitleWrapper,
  CheckoutSectionTitle,
} from '../styles/CheckoutSectionTitleDisplay.view.style.native';

class CheckoutSectionTitleDisplay extends React.PureComponent {
  render() {
    const { title } = this.props;
    return (
      <CheckoutSectionTitleWrapper>
        <CheckoutSectionTitle>
          <BodyCopy
            fontFamily="primary"
            fontSize="fs16"
            fontWeight="extrabold"
            data-locator="pickup-title"
            color="gray.900"
            text={title}
          />
        </CheckoutSectionTitle>
      </CheckoutSectionTitleWrapper>
    );
  }
}

CheckoutSectionTitleDisplay.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CheckoutSectionTitleDisplay;
