import React from 'react';
import { PropTypes } from 'prop-types';

export class ProductWishlistIcon {
  render() {
    const { onClick, isRemove, isDisabled, isMobile } = this.props;
    const removeTextHeader = isMobile ? 'Tap to Remove' : 'Click to Remove';
    const removeTxtDesc = isMobile
      ? 'Remove this item from your Favorites List by tapping the heart icon again.'
      : 'Remove this item from your Favorites List by clicking the heart icon again.';

    return (
      <button type="button" onClick={onClick} disabled={isDisabled}>
        Favorites
        {isRemove ? (
          <div className="information-remove">
            <p className="information-remove-message">
              <strong className="remove-title">{removeTextHeader}</strong>
              <br />
              {removeTxtDesc}
            </p>
          </div>
        ) : (
          <span className="message-icon">Add to favorites</span>
        )}
      </button>
    );
  }
}

ProductWishlistIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  isRemove: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isMobile: PropTypes.bool,
};

ProductWishlistIcon.defaultProps = {
  isRemove: false,
  isDisabled: false,
  isMobile: false,
};

export default ProductWishlistIcon;
