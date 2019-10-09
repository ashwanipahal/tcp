import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import style from '../styles/StoresInternational.style';

const StoresInternational = ({ className, content, dataLocator, children }) => (
  <div className={className}>
    <RichText dataLocator={dataLocator} richTextHtml={content} />
    {children}
  </div>
);

StoresInternational.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node),
  content: PropTypes.string.isRequired,
  dataLocator: PropTypes.string.isRequired,
};

StoresInternational.defaultProps = {
  children: null,
};

export default withStyles(StoresInternational, style);
