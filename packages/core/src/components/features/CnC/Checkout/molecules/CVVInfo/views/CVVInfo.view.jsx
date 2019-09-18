import React from 'react';
import PropTypes from 'prop-types';
import RichText from '../../../../../../common/atoms/RichText';
import ReactTooltip from '../../../../../../common/atoms/ReactToolTip';
import { Image } from '../../../../../../common/atoms';
import { getIconPath } from '../../../../../../../utils';

const getCVVInfoRichText = ({ cvvCodeRichText }) => {
  return (
    <RichText
      richTextHtml={cvvCodeRichText}
      className="cvv-code-info"
      dataLocator="cvv-code-info"
    />
  );
};

const getCvvInfo = ({ cvvCodeRichText }) => {
  return (
    <ReactTooltip
      fontFamily="secondary"
      message={getCVVInfoRichText({ cvvCodeRichText })}
      aligned="right"
    >
      <Image height="15" width="15" src={getIconPath('info-icon')} />
    </ReactTooltip>
  );
};

getCvvInfo.propTypes = {
  cvvCodeRichText: PropTypes.string,
};

getCvvInfo.defaultProps = {
  cvvCodeRichText: PropTypes.string,
};

getCVVInfoRichText.propTypes = {
  cvvCodeRichText: PropTypes.string,
};

getCVVInfoRichText.defaultProps = {
  cvvCodeRichText: PropTypes.string,
};

export default getCvvInfo;
