import React from 'react';
import PropTypes from 'prop-types';
import { propTypes as reduxFormPropTypes, resetSection } from 'redux-form';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import PickUpContactDisplay from '../../PickUpContactDisplay';
import ContactFormFields from '../../ContactFormFields';
import withStyles from '../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';
import styles from '../styles/style';

class PickupMainContactEditForm extends React.Component {
  static defaultValidation = getStandardConfig(['firstName', 'lastName', 'phoneNumber']);

  handleEnterEditModeClick = event => {
    const { onEditModeChange } = this.props;
    event.preventDefault();
    onEditModeChange(true);
  };

  renderSectionTitle = () => {
    const { isEditing, labels } = this.props;
    return isEditing ? (
      <div className="header">
        <BodyCopy fontSize="fs36" fontFamily="primary" fontWeight="regular">
          {labels.pickupContactText}
        </BodyCopy>
      </div>
    ) : (
      <div className="header">
        <BodyCopy fontSize="fs36" fontFamily="primary" fontWeight="regular">
          {labels.pickupContactText}
        </BodyCopy>
        <div className="EditAnchor">
          <Anchor
            underline
            anchorVariation="secondary"
            fontSize="fs12"
            dataLocator=""
            onClick={this.handleEnterEditModeClick}
            className="couponModal_print_anchortext"
          >
            {labels.anchorEdit}
          </Anchor>
        </div>
      </div>
    );
  };

  render() {
    const { className, isMobile, formData, isEditing, labels, isReset } = this.props;
    if (isReset) {
      const { dispatch } = this.props;
      dispatch(resetSection('checkoutPickup', 'pickUpContact'));
    }
    return (
      <div className={className}>
        {this.renderSectionTitle()}
        {!isEditing && <PickUpContactDisplay formData={formData} />}
        {isEditing && !isMobile && (
          <ContactFormFields className="pick-up-input toggle" showPhoneNumber labels={labels} />
        )}
      </div>
    );
  }
}

PickupMainContactEditForm.propTypes = {
  className: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onEditModeChange: PropTypes.func.isRequired,
  ...reduxFormPropTypes,
};

export default withStyles(PickupMainContactEditForm, styles);
export { PickupMainContactEditForm as PickupMainContactEditFormVanilla };
