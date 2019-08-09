import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import style from '../styles/RemoveSoldOut.style';

class RemoveSoldOut extends React.PureComponent {
  render() {
    const { errorMsg, className } = this.props;
    return (
      <>
        <div className={className}>
          <BodyCopy className="removeItem" component="span" fontFamily="secondary" fontSize="fs12">
            Please
            <Anchor
              fontSizeVariation="medium"
              underline
              anchorVariation="primary"
              noLink
              to=""
              data-locator="miniBag-removeItems"
              className="removeAnchor"
            >
              {`remove`}
            </Anchor>
            the sold out items from your bag before you check out.
            {errorMsg}
          </BodyCopy>
        </div>
      </>
    );
  }
}

RemoveSoldOut.propTypes = {
  errorMsg: PropTypes.string,
  className: PropTypes.string,
};

RemoveSoldOut.defaultProps = {
  errorMsg: '',
  className: '',
};

export default withStyles(RemoveSoldOut, style);

export { RemoveSoldOut };
