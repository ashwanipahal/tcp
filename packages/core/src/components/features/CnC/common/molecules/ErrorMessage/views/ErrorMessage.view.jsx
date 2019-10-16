import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy, Image } from '@tcp/core/src/components/common/atoms';
import style from '../styles/ErrorMessage.style';
import { getIconPath } from '../../../../../../../utils';

const alertTriangleIcon = getIconPath('alert-triangle');

class ErrorMessage extends React.PureComponent {
  render() {
    const { error, alt, className, fontSize, fontWeight } = this.props;
    return (
      <>
        {error && (
          <div className={className}>
            <Image alt={alt} src={alertTriangleIcon} />
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
          </div>
        )}
      </>
    );
  }
}

ErrorMessage.propTypes = {
  error: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
};

ErrorMessage.defaultProps = {
  error: '',
  alt: 'error',
  className: '',
  fontSize: 'fs10',
  fontWeight: 'normal',
};

export default withStyles(ErrorMessage, style);

export { ErrorMessage };
