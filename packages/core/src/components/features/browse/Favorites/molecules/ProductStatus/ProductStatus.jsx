import React from 'react';
import { PropTypes } from 'prop-types';
import { AVAILABILITY, STATUS } from '../../container/Favorites.constants';

const ProductStatus = ({ status }) => {
  let notification;

  switch (status) {
    case STATUS.PURCHASED:
      notification = 'Purchased';
      break;
    case STATUS.SUGGESTED:
      notification = 'Suggested';
      break;
    case AVAILABILITY.SOLDOUT:
      notification = 'Sold out';
      break;
    case AVAILABILITY.OK:
      return null;
    default:
      return null;
  }
  return <span className="notification-item">{notification}</span>;
};

ProductStatus.propTypes = {
  status: PropTypes.shape({}),
};

ProductStatus.defaultProps = {
  status: {},
};

export default ProductStatus;
