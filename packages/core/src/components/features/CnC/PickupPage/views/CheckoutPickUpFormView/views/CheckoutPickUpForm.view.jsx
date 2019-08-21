import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import style from '../styles/CheckoutPickUpForm.style';
import PickUpFormPart from '../../../organisms/PickUpFormPart';
import CnCTemplate from '../../../../common/organism/CnCTemplate';

class PickupPage extends React.PureComponent {
  pickupForm = () => {
    const {
      className,
      isMobile,
      isGuest,
      error,
      isUsSite,
      isSmsUpdatesEnabled,
      currentPhoneNumber,
      isOrderUpdateChecked,
      isAlternateUpdateChecked,
    } = this.props;
    return (
      <PickUpFormPart
        className={className}
        pickupError={error}
        isMobile={isMobile}
        isGuest={isGuest}
        isSMSActive={isSmsUpdatesEnabled}
        isUsSite={isUsSite}
        currentPhoneNumber={currentPhoneNumber}
        isOrderUpdateChecked={isOrderUpdateChecked}
        isAlternateUpdateChecked={isAlternateUpdateChecked}
      />
    );
  };

  render() {
    return (
      <CnCTemplate
        header={() => {
          return null;
        }}
        leftSection={() => {
          return this.pickupForm();
        }}
      />
    );
  }
}

PickupPage.propTypes = {
  className: PropTypes.string,
  isGuest: PropTypes.bool,
  isMobile: PropTypes.bool,
  isSmsUpdatesEnabled: PropTypes.bool,
  isUsSite: PropTypes.bool,
  isOrderUpdateChecked: PropTypes.bool,
  isAlternateUpdateChecked: PropTypes.bool,
  error: PropTypes.string,
  currentPhoneNumber: PropTypes.string,
};

PickupPage.defaultProps = {
  className: '',
  isGuest: false,
  isMobile: false,
  isSmsUpdatesEnabled: false,
  isUsSite: false,
  isOrderUpdateChecked: false,
  isAlternateUpdateChecked: false,
  error: '',
  currentPhoneNumber: '',
};

export default withStyles(PickupPage, style);
export { PickupPage as PickupPageVanilla };
