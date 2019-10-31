import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Image } from '../../../../../../common/atoms';
import { ErrorIcon, ErrorView, ErrorText } from '../styles/ErrorMessage.style.native';

const alertTriangleIcon = require('../../../../../../../assets/alert-triangle.png');

class ErrorMessage extends React.PureComponent {
  render() {
    const { error, showAccordian, bagPage, fontSize, fontWeight } = this.props;
    return (
      <>
        {!!error && (
          <ErrorView showAccordian={showAccordian} bagPage={bagPage}>
            <Image source={alertTriangleIcon} style={ErrorIcon} />
            <BodyCopy
              color="error"
              fontFamily="secondary"
              fontSize={fontSize || (bagPage ? 'fs14' : 'fs10')}
              fontWeight={fontWeight || 'regular'}
              text={error}
              style={ErrorText}
            />
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
};

ErrorMessage.defaultProps = {
  error: '',
  bagPage: false,
  fontSize: '',
  fontWeight: '',
};

export default ErrorMessage;

export { ErrorMessage as ErrorMessageVanilla };
