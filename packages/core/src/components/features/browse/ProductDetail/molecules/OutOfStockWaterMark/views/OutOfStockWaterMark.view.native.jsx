import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import WaterMarkContainer from '../styles/OutOfStockWaterMark.style';

const OutOfStockWaterMark = ({ label, fontSizes }) => {
  return (
    <WaterMarkContainer>
      <BodyCopy
        fontFamily="secondary"
        fontSize={fontSizes}
        fontWeight="extrabold"
        color="gray[900]"
        text={label}
      />
    </WaterMarkContainer>
  );
};

OutOfStockWaterMark.propTypes = {
  label: PropTypes.string.isRequired,
  fontSizes: PropTypes.shape([]),
};

OutOfStockWaterMark.defaultProps = {
  fontSizes: ['fs16', 'fs16', 'fs24'],
};

export default withStyles(OutOfStockWaterMark);
