import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from '../../../../../../common/atoms/ReactToolTip';
import { Image, RichText } from '../../../../../../common/atoms';

const infoIcon = require('../../../../../../../assets/info-icon.png');

/**
 * @function getCvvInfo
 * @description renders the tooltip component
 */

const getCvvInfo = ({ cvvCodeRichText }) => {
  const tooltip = () => <RichText isNativeView source={cvvCodeRichText} />;
  return (
    <ReactTooltip withOverlay={false} popover={tooltip()} height={350} width={350}>
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
