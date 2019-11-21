import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { ContentWrapper } from '../../../styles/OrderDetails.style.native';

/**
 * This function component use for Order Group Notification
 * can be passed in the component.
 * @param props - props object used pass params to other component
 */

const OrderGroupNotification = props => {
  const { message } = props;
  return (
    <ContentWrapper>
      <BodyCopy fontSize="fs14" fontFamily="secondary" text={message} />
    </ContentWrapper>
  );
};
OrderGroupNotification.propTypes = {
  message: PropTypes.string,
};

OrderGroupNotification.defaultProps = {
  message: '',
};

export default OrderGroupNotification;
