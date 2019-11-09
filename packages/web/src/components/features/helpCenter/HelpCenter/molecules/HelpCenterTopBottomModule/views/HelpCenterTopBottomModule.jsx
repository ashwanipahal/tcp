import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import style from '../styles/HelpCenterTopBottomModule.style';

const HelpCenterTopBottomModule = props => {
  const { composites, className } = props;
  return Object.keys(composites).map(key => {
    const { richText } = composites[key][0];
    if (richText) {
      const { text } = richText;
      return <RichText richTextHtml={text} className={className} />;
    }
    return null;
  });
};

HelpCenterTopBottomModule.propTypes = {
  className: PropTypes.string.isRequired,
  composites: PropTypes.shape({}),
};

HelpCenterTopBottomModule.defaultProps = {
  composites: {},
};

export default withStyles(HelpCenterTopBottomModule, style);
export { HelpCenterTopBottomModule as HelpCenterTopBottomModuleVanilla };
