import React from 'react';
import PropTypes from 'prop-types';
import RichText from '@tcp/core/src/components/common/atoms/RichText/views/RichText';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../Copyright.style';

const Copyright = ({ className, children }) => (
  <React.Fragment>
    <RichText className={className} richTextHtml={children} />
  </React.Fragment>
);

Copyright.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export { Copyright as CopyrightVanilla };
export default withStyles(Copyright, style);
