import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import style from '../styles/RemoveSoldOut.style';

class RemoveSoldOut extends React.PureComponent {
  render() {
    const { labels, className, labelForRemove } = this.props;
    return (
      <>
        <div className={className}>
          {labels && (
            <BodyCopy
              className="removeItem"
              component="span"
              fontFamily="secondary"
              fontSize="fs12"
            >
              {labels.removeSoldoutHeader}
            </BodyCopy>
          )}
          {labelForRemove && (
            <BodyCopy
              className="pointer removeItem"
              component="span"
              fontFamily="secondary"
              fontSize="fs12"
            >
              {labelForRemove}
            </BodyCopy>
          )}
        </div>
      </>
    );
  }
}

RemoveSoldOut.propTypes = {
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  labelForRemove: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  className: PropTypes.string,
};

RemoveSoldOut.defaultProps = {
  labels: '',
  className: '',
  labelForRemove: '',
};

export default withStyles(RemoveSoldOut, style);

export { RemoveSoldOut };
