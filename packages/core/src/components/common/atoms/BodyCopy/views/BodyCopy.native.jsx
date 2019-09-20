import React from 'react';
import PropTypes from 'prop-types';
import { setTestId, getLocator } from '@tcp/core/src/utils';
import BodyCopyText from '../BodyCopy.style.native';
import withStyles from '../../../hoc/withStyles.native';

const BodyCopy = props => {
  const { text, dataLocator, accessibilityText, numberOfLines, ...otherProps } = props;
  const textValue = accessibilityText.concat(text);
  return (
    <BodyCopyText
      {...numberOfLines && { numberOfLines }}
      {...setTestId(getLocator(dataLocator))}
      accessibilityRole="text"
      accessibilityLabel={textValue}
      {...otherProps}
    >
      {text}
    </BodyCopyText>
  );
};

BodyCopy.propTypes = {
  text: PropTypes.string.isRequired,
  dataLocator: PropTypes.string,
  accessibilityText: PropTypes.string,
  margin: PropTypes.string,
  textDecoration: PropTypes.string,
  numberOfLines: PropTypes.number,
};

BodyCopy.defaultProps = {
  dataLocator: '',
  accessibilityText: '',
  margin: null,
  textDecoration: null,
  numberOfLines: null,
};
export default withStyles(BodyCopy);
export { BodyCopy as BodyCopyVanilla };
