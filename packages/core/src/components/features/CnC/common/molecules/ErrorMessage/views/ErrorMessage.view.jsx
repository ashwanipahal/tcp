import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy, Image } from '@tcp/core/src/components/common/atoms';
import style from '../styles/ErrorMessage.style';
import { getIconPath } from '../../../../../../../utils';

const alertTriangleIcon = getIconPath('alert-triangle');

class ErrorMessage extends React.PureComponent {
  render() {
    const { error, className } = this.props;
    return (
      <>
        {error && (
          <div className={className}>
            <Image src={alertTriangleIcon} />
            <BodyCopy component="span" color="error" fontFamily="secondary" fontSize="fs10">
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
  className: PropTypes.string,
};

ErrorMessage.defaultProps = {
  error: '',
  className: '',
};

export default withStyles(ErrorMessage, style);

export { ErrorMessage };
