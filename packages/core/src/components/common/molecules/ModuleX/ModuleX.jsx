import React from 'react';
import PropTypes from 'prop-types';
import RichText from '../../atoms/RichText';

const ModuleX = props => {
  const {
    className,
    richTextList: [{ text }],
    dataLocator,
    moduleClassName,
  } = props;
  return (
    <RichText
      className={`${className} ${moduleClassName} moduleX`}
      richTextHtml={text}
      dataLocator={dataLocator || `moduleX`}
    />
  );
};

ModuleX.propTypes = {
  className: PropTypes.string.isRequired,
  richTextList: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.string)).isRequired,
  dataLocator: PropTypes.string.isRequired,
  moduleClassName: PropTypes.string,
};

ModuleX.defaultProps = {
  moduleClassName: '',
};
export default ModuleX;
