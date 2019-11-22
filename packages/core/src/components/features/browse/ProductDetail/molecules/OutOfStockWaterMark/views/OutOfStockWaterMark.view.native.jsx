import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import WaterMarkContainer from '../styles/OutOfStockWaterMark.style';

const OutOfStockWaterMark = ({ label, fontSize }) => {
  return (
    <WaterMarkContainer>
      <BodyCopy
        fontFamily="secondary"
        fontSize={fontSize}
        fontWeight="extrabold"
        color="gray[900]"
        text={label}
      />
    </WaterMarkContainer>
  );
};

OutOfStockWaterMark.propTypes = {
  label: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
};

OutOfStockWaterMark.defaultProps = {
  fontSize: 'fs16',
};

export default withStyles(OutOfStockWaterMark);
