import React from 'react';
import { PropTypes } from 'prop-types';
import BodyCopy from '../BodyCopy';

export const StoreTitle = props => {
  const { basicInfo } = props;
  return <BodyCopy>{basicInfo.storeName}</BodyCopy>;
};

StoreTitle.propTypes = {
  basicInfo: PropTypes.shape({
    storeName: PropTypes.string,
  }),
};

StoreTitle.defaultProps = {
  basicInfo: {
    storeName: '',
  },
};

export default {
  StoreTitle,
};
