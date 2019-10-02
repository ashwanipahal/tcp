import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from '../../../../../../common/atoms/ReactToolTip';
import { Image } from '../../../../../../common/atoms';

const infoIcon = require('../../../../../../../assets/info-icon.png');

/**
 * @function getCvvInfo
 * @description renders the tooltip component
 */

const getCvvInfo = ({ cvvCodeRichText }) => {
  return (
    <ReactTooltip withOverlay={false} popover={cvvCodeRichText}>
      <Image source={infoIcon} height={15} width={15} />
    </ReactTooltip>
  );
};

getCvvInfo.propTypes = {
  cvvCodeRichText: PropTypes.string,
};

getCvvInfo.defaultProps = {
  cvvCodeRichText: PropTypes.string,
};

export default getCvvInfo;
