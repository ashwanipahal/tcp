import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import style from '../styles/RemoveSoldOut.style';

class RemoveSoldOut extends React.PureComponent {
  getRemoveString = (labels, removeCartItem, getUnavailableOOSItems) => {
    const remove = labels.updateUnavailable.split('#remove#');
    const newRemove = (
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs12"
        component="span"
        className="removeErrorMessage"
        onClick={() => removeCartItem(getUnavailableOOSItems)}
      >
        {labels.removeError}
      </BodyCopy>
    );

    remove.splice(1, 0, newRemove);
    return remove;
  };

  render() {
    const {
      labels,
      className,
      pageView,
      removeCartItem,
      getUnavailableOOSItems,
      showLabelForRemove,
    } = this.props;
    const styleClass = pageView === 'myBag' ? 'bagTileItem' : 'removeItem';
    const labelForRemove = this.getRemoveString(labels, removeCartItem, getUnavailableOOSItems);
    return (
      <>
        <div className={className}>
          {labels && !showLabelForRemove && (
            <BodyCopy
              className={styleClass}
              component="span"
              fontFamily="secondary"
              fontSize="fs12"
            >
              {labels.removeSoldoutHeader}
            </BodyCopy>
          )}
          {showLabelForRemove && (
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
  className: PropTypes.string,
  pageView: PropTypes.string,
  removeCartItem: PropTypes.func.isRequired,
  getUnavailableOOSItems: PropTypes.shape([]),
  showLabelForRemove: PropTypes.bool,
};

RemoveSoldOut.defaultProps = {
  labels: '',
  className: '',
  pageView: '',
  getUnavailableOOSItems: [],
  showLabelForRemove: false,
};

export default withStyles(RemoveSoldOut, style);

export { RemoveSoldOut };
