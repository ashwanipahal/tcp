import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { propTypes as reduxFormPropTypes, resetSection } from 'redux-form';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import PickUpContactDisplay from '../../PickUpContactDisplay';
import ContactFormFields from '../../ContactFormFields';
import withStyles from '../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';
import Button from '../../../../../../common/atoms/Button';
import {
  Style,
  PickupEditHeader,
  EditAnchor,
} from '../styles/PickupMainContactEditForm.style.native';

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
        fill="BLUE"
        color="white"
        text={labels.btnSaveUpdate}
        onPress={handleSubmit(this.pickupEditSubmit)}
      />
    );
  };

  handleEnterEditModeClick = event => {
    const { onEditModeChange } = this.props;
    event.preventDefault();
    onEditModeChange(true);
  };

  renderSectionTitle = () => {
    const { labels } = this.props;
    return (
      <PickupEditHeader>
        <BodyCopy
          fontFamily="primary"
          fontSize="fs28"
          fontWeight="regular"
          color="gray.900"
          text={labels.pickupContactText}
        />
        <EditAnchor>
          <Anchor
            underline
            anchorVariation="primary"
            fontSize="fs12"
            noLink
            href="#"
            target="_blank"
            text={labels.anchorEdit}
            onPress={this.handleEnterEditModeClick}
            color="gray.900"
          />
        </EditAnchor>
      </PickupEditHeader>
    );
  };

  render() {
    const { formData, isEditing, labels, isReset } = this.props;
    if (isReset) {
      const { dispatch } = this.props;
      dispatch(resetSection('checkoutPickup', 'pickUpContact'));
    }
    return (
      <View>
        {this.renderSectionTitle()}
        {!isEditing && <PickUpContactDisplay formData={formData} />}
        {isEditing && (
          <>
            <ContactFormFields className="pick-up-input toggle" showPhoneNumber labels={labels} />
            {this.SaveButton()}
          </>
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
