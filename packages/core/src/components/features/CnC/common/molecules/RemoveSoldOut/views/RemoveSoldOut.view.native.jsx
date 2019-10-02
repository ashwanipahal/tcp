import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '../../../../../../common/atoms';
import { RemoveSoldOutView, RowSectionStyle } from '../styles/RemoveSoldOut.style.native';

class RemoveSoldOut extends React.PureComponent {
  getRemoveString = (labels, removeCartItem, getUnavailableOOSItems) => {
    const remove = labels.updateUnavailable.split('#remove#');
    const newRemove = (
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs12"
        text={labels.removeError}
        textDecoration="underline"
        onPress={() => removeCartItem(getUnavailableOOSItems)}
      />
    );

    remove.splice(1, 0, newRemove);
    return remove;
  };

  render() {
    const { labels, removeCartItem, getUnavailableOOSItems, showLabelForRemove } = this.props;
    const labelForRemove = this.getRemoveString(labels, removeCartItem, getUnavailableOOSItems);
    return (
      <RemoveSoldOutView>
        {labels && !showLabelForRemove && (
          <RowSectionStyle>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs12"
              fontWeight="regular"
              text={labels.removeSoldoutHeader}
            />
          </RowSectionStyle>
        )}
        {showLabelForRemove && (
          <RowSectionStyle>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs12"
              fontWeight="regular"
              text={labelForRemove}
            />
          </RowSectionStyle>
        )}
      </RemoveSoldOutView>
    );
  }
}

RemoveSoldOut.propTypes = {
  labels: PropTypes.string,
  removeCartItem: PropTypes.func.isRequired,
  getUnavailableOOSItems: PropTypes.shape([]),
  showLabelForRemove: PropTypes.bool,
};

RemoveSoldOut.defaultProps = {
  labels: '',
  getUnavailableOOSItems: [],
  showLabelForRemove: false,
};

export default RemoveSoldOut;

export { RemoveSoldOut as RemoveSoldOutVanilla };
