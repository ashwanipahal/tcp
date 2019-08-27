import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { propTypes as reduxFormPropTypes, resetSection } from 'redux-form';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import PickUpContactDisplay from '../../PickUpContactDisplay';
import ContactFormFields from '../../ContactFormFields';
import withStyles from '../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';
import Modal from '../../../../../../common/molecules/Modal';
import Button from '../../../../../../common/atoms/Button';
import { Style, ModalHeading } from '../styles/PickupMainContactEditForm.style.native';

class PickupMainContactEditForm extends React.Component {
  static defaultValidation = getStandardConfig(['firstName', 'lastName', 'phoneNumber']);

  SaveButton = () => {
    const { labels, onClose } = this.props;
    return (
      <View>
        <Button buttonVariation="variable-width" text="Close" onPress={onClose} />
        <Button
          fill="BLUE"
          buttonVariation="variable-width"
          text={labels.btnSaveUpdate}
          onPress={() => {}}
        />
      </View>
    );
  };

  handleEnterEditModeClick = event => {
    const { onEditModeChange } = this.props;
    event.preventDefault();
    onEditModeChange(true);
  };

  renderSectionTitle = () => {
    const { isEditing, labels } = this.props;
    return isEditing ? (
      <View className="header">
        <BodyCopy
          fontFamily="primary"
          fontSize="fs26"
          fontWeight="regular"
          text={labels.pickupContactText}
        />
      </View>
    ) : (
      <View className="header">
        <BodyCopy
          fontFamily="primary"
          fontSize="fs26"
          fontWeight="regular"
          text={labels.pickupContactText}
        />
        <View className="EditAnchor">
          <Anchor
            noUnderline
            anchorVariation="secondary"
            fontSize="fs12"
            noLink
            href="#"
            target="_blank"
            text={labels.anchorEdit}
            onPress={this.handleEnterEditModeClick}
          />
        </View>
      </View>
    );
  };

  render() {
    const { isMobile, formData, isEditing, labels, isReset, onClose } = this.props;
    if (isReset) {
      const { dispatch } = this.props;
      dispatch(resetSection('checkoutPickup', 'pickUpContact'));
    }
    return (
      <View>
        {this.renderSectionTitle()}
        {!isEditing && <PickUpContactDisplay formData={formData} />}
        {isEditing && isMobile && (
          <View>
            <Modal isOpen={isEditing} onRequestClose={onClose}>
              <View>
                <ModalHeading>
                  <BodyCopy
                    fontFamily="primary"
                    fontSize="fs26"
                    fontWeight="regular"
                    text={labels.titleEditPickup}
                  />
                </ModalHeading>
                <ContactFormFields
                  className="pick-up-input toggle"
                  showPhoneNumber
                  labels={labels}
                />
                {this.SaveButton()}
              </View>
            </Modal>
          </View>
        )}
      </View>
    );
  }
}

PickupMainContactEditForm.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onEditModeChange: PropTypes.func.isRequired,
  ...reduxFormPropTypes,
};

export default withStyles(PickupMainContactEditForm, Style);
export { PickupMainContactEditForm as PickupMainContactEditFormVanilla };
