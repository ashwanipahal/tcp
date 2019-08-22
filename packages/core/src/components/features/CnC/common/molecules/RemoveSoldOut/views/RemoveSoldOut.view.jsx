import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import style from '../styles/RemoveSoldOut.style';

class RemoveSoldOut extends React.PureComponent {
  render() {
    const { labels, className } = this.props;
    return (
      <>
        <div className={className}>
          <BodyCopy className="removeItem" component="span" fontFamily="secondary" fontSize="fs12">
            {labels.removeSoldOut}
          </BodyCopy>
        </div>
      </>
    );
  }
}

RemoveSoldOut.propTypes = {
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  className: PropTypes.string,
};

RemoveSoldOut.defaultProps = {
  labels: '',
  className: '',
};

export default withStyles(RemoveSoldOut, style);

export { RemoveSoldOut };
