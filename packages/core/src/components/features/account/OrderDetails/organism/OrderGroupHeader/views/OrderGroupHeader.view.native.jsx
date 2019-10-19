import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { ContentWrapper } from '../../../styles/OrderDetails.style.native';

/**
 * This function component use for Order Group Header
 * can be passed in the component.
 * @param props - props object used pass params to other component
 */

const OrderGroupHeader = props => {
  const { label, message } = props;
  return (
    <ContentWrapper>
      <BodyCopy fontSize="fs14" fontFamily="secondary" text={label} />
      <BodyCopy fontSize="fs14" fontFamily="secondary" fontWeight="semibold" text={message} />
    </ContentWrapper>
  );
};
OrderGroupHeader.propTypes = {
  label: PropTypes.string,
  message: PropTypes.string,
};

OrderGroupHeader.defaultProps = {
  label: '',
  message: '',
};

export default OrderGroupHeader;
