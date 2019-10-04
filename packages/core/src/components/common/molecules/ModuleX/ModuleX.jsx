import React from 'react';
import PropTypes from 'prop-types';
import RichText from '../../atoms/RichText';

const ModuleX = props => {
  const {
    className,
    richTextList: [{ text }],
    dataLocator,
  } = props;

  return (
    <RichText
      className={`${className} moduleX`}
      richTextHtml={text}
      dataLocator={dataLocator || `moduleX`}
    />
  );
};

ModuleX.propTypes = {
  className: PropTypes.string.isRequired,
  richTextList: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.string)).isRequired,
  dataLocator: PropTypes.string.isRequired,
};
export default ModuleX;
