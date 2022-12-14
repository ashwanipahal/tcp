import React from 'react';
import PropTypes from 'prop-types';
import Espot from '@tcp/core/src/components/common/molecules/Espot';
import { BodyCopy, Image } from '../../../../../../common/atoms';
import { ErrorIcon, ErrorView, ErrorText } from '../styles/ErrorMessage.style.native';

const alertTriangleIcon = require('../../../../../../../assets/alert-triangle.png');

class ErrorMessage extends React.PureComponent {
  render() {
    const {
      error,
      showAccordian,
      bagPage,
      fontSize,
      fontWeight,
      isEspot,
      ...restProps
    } = this.props;
    return (
      <>
        {!!error && (
          <ErrorView showAccordian={showAccordian} bagPage={bagPage} {...restProps}>
            <Image source={alertTriangleIcon} alt="" style={ErrorIcon} />
            {isEspot ? (
              <Espot richTextHtml={error} />
            ) : (
              <BodyCopy
                color="error"
                fontFamily="secondary"
                fontSize={fontSize || (bagPage ? 'fs14' : 'fs10')}
                fontWeight={fontWeight || 'regular'}
                text={error}
                style={ErrorText}
              />
            )}
          </ErrorView>
        )}
      </>
    );
  }
}

ErrorMessage.propTypes = {
  error: PropTypes.string,
  showAccordian: PropTypes.bool.isRequired,
  bagPage: PropTypes.bool,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  isEspot: PropTypes.bool,
};

ErrorMessage.defaultProps = {
  error: '',
  bagPage: false,
  fontSize: '',
  fontWeight: '',
  isEspot: false,
};

export default ErrorMessage;

export { ErrorMessage as ErrorMessageVanilla };
