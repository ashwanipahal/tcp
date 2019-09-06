import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import style from '../styles/RemoveSoldOut.style';

class RemoveSoldOut extends React.PureComponent {
  render() {
    const { labels, className, labelForRemove, pageView } = this.props;
    const styleClass = pageView === 'myBag' ? 'bagTileItem' : 'removeItem';
    return (
      <>
        <div className={className}>
          {labels && (
            <BodyCopy
              className={styleClass}
              component="span"
              fontFamily="secondary"
              fontSize="fs12"
            >
              {labels.removeSoldoutHeader}
            </BodyCopy>
          )}
          {labelForRemove && (
            <BodyCopy
              className={`${styleClass} pointer`}
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
  pageView: PropTypes.string,
};

RemoveSoldOut.defaultProps = {
  labels: '',
  className: '',
  labelForRemove: '',
  pageView: '',
};

export default withStyles(RemoveSoldOut, style);

export { RemoveSoldOut };
