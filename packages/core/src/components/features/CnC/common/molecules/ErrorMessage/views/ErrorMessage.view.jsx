import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import Espot from '@tcp/core/src/components/common/molecules/Espot';
import style from '../styles/ErrorMessage.style';

class ErrorMessage extends React.PureComponent {
  render() {
    const { error, className, fontSize, fontWeight, isEspot } = this.props;
    return (
      <>
        {error && (
          <div className={className} role="alert">
            <div className="warning-icon" aria-disabled="true" />
            {isEspot ? (
              <Espot richTextHtml={error} />
            ) : (
              <BodyCopy
                component="span"
                color="error"
                fontFamily="secondary"
                fontWeight={fontWeight}
                fontSize={fontSize}
                aria-live="assertive"
                role="alert"
              >
                {error}
              </BodyCopy>
            )}
          </div>
        )}
      </>
    );
  }
}

ErrorMessage.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
};

ErrorMessage.defaultProps = {
  error: '',
  className: '',
  fontSize: 'fs10',
  fontWeight: 'normal',
};

export default withStyles(ErrorMessage, style);

export { ErrorMessage };
