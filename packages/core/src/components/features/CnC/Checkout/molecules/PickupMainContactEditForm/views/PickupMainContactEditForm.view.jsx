import React from 'react';
import PropTypes from 'prop-types';
import { propTypes as reduxFormPropTypes } from 'redux-form';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import PickUpContactDisplay from '../../PickUpContactDisplay';
import ContactFormFields from '../../ContactFormFields';
import withStyles from '../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';
import Modal from '../../../../../../common/molecules/Modal';
import Button from '../../../../../../common/atoms/Button';
import styles from '../styles/PickupMainContactEditForm.style';

class PickupMainContactEditForm extends React.Component {
  static defaultValidation = getStandardConfig(['firstName', 'lastName', 'phoneNumber']);

  pickupEditSubmit = value => {
    const { onEditModeChange } = this.props;
    const { pickUpContact } = value;
    onEditModeChange(false, pickUpContact);
  };

  SaveButton = () => {
    const { labels, handleSubmit } = this.props;
    return (
      <Button
        onClick={handleSubmit(this.pickupEditSubmit)}
        className="saveUpdateButton"
        fill="BLUE"
        type="button"
        buttonVariation="fixed-width"
        data-locator="pickup-modal-save-btn"
      >
        {labels.btnSaveUpdate}
      </Button>
    );
  };

  handleEnterEditModeClick = event => {
    event.preventDefault();
    const { onEditModeChange } = this.props;
    onEditModeChange(true);
  };

  renderSectionTitle = () => {
    const { isEditing, labels } = this.props;
    return isEditing ? (
      <div className="header">
        <BodyCopy fontSize="fs26" fontFamily="primary" fontWeight="regular">
          {labels.pickupContactText}
        </BodyCopy>
      </div>
    ) : (
      <div className="header">
        <BodyCopy fontSize="fs26" fontFamily="primary" fontWeight="regular">
          {labels.pickupContactText}
        </BodyCopy>
        <div className="EditAnchor">
          <Anchor
            underline
            anchorVariation="secondary"
            fontSize="fs12"
            fontFamily="secondary"
            dataLocator="pickup-pickupContact-edit-anchor"
            onClick={this.handleEnterEditModeClick}
            className="anchorStyle"
          >
            {labels.anchorEdit}
          </Anchor>
        </div>
      </div>
    );
  };

  render() {
    const {
      className,
      isMobile,
      formData,
      isEditing,
      labels,
      handleExitEditModeClick,
    } = this.props;

    return (
      <div className={className}>
        {this.renderSectionTitle()}
        {!isEditing && <PickUpContactDisplay formData={formData} />}
        {isEditing && !isMobile && (
          <ContactFormFields className="pick-up-input toggle" showPhoneNumber labels={labels} />
        )}
        {isEditing && isMobile && (
          <div>
            <Modal
              isOpen={isEditing}
              className="TCPModal__Content PickupModal"
              maxWidth="616px"
              minHeight="540px"
              fixedWidth
              closeIconDataLocator="coupondetailmodalcrossicon"
              onRequestClose={handleExitEditModeClick}
              overlayClassName="pick-up-overlay"
            >
              <div className="pickupModalContainer">
                <div className="pickupModalHeader">{labels.titleEditPickup}</div>
                <ContactFormFields
                  className="pick-up-input toggle"
                  showPhoneNumber
                  labels={labels}
                />
                {this.SaveButton()}
              </div>
            </Modal>
          </div>
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
