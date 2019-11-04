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
  ButtonWrapper,
} from '../styles/PickupMainContactEditForm.style.native';
import ErrorMessage from '../../../../common/molecules/ErrorMessage';

class PickupMainContactEditForm extends React.Component {
  static defaultValidation = getStandardConfig(['firstName', 'lastName', 'phoneNumber']);

  pickupEditSubmit = value => {
    const { onEditModeChange } = this.props;
    const { pickUpContact } = value;
    onEditModeChange(false, pickUpContact);
  };

  saveAndCancelButton = () => {
    const { labels, handleSubmit, handleExitEditModeClick } = this.props;
    return (
      <>
        <Button
          fill="BLUE"
          color="white"
          text={labels.btnSaveUpdate}
          onPress={handleSubmit(this.pickupEditSubmit)}
        />
        <ButtonWrapper>
          <Button text={labels.btnCancel} onPress={handleSubmit(handleExitEditModeClick)} />
        </ButtonWrapper>
      </>
    );
  };

  handleEnterEditModeClick = event => {
    const { onEditModeChange } = this.props;
    event.preventDefault();
    onEditModeChange(true);
  };

  renderSectionTitle = () => {
    const { labels, isEditing } = this.props;
    return (
      <PickupEditHeader>
        <BodyCopy
          fontFamily="primary"
          fontSize="fs28"
          fontWeight="regular"
          color="gray.900"
          text={labels.pickupContactText}
        />
        {!isEditing && (
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
        )}
      </PickupEditHeader>
    );
  };

  render() {
    const {
      formData,
      isEditing,
      labels,
      isReset,
      errorMessageRef,
      editModeSubmissionError,
    } = this.props;
    if (isReset) {
      const { dispatch } = this.props;
      dispatch(resetSection('checkoutPickup', 'pickUpContact'));
    }
    return (
      <View ref={errorMessageRef}>
        {this.renderSectionTitle()}
        {!isEditing && <PickUpContactDisplay formData={formData} />}
        {isEditing && (
          <>
            <ContactFormFields className="pick-up-input toggle" showPhoneNumber labels={labels} />
            {editModeSubmissionError ? (
              <ErrorMessage
                error={editModeSubmissionError}
                backgroundColor={props => props.theme.colors.WHITE}
              />
            ) : null}
            {this.saveAndCancelButton()}
          </>
        )}
      </View>
    );
  }
}

PickupMainContactEditForm.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onEditModeChange: PropTypes.func.isRequired,
  editModeSubmissionError: PropTypes.string.isRequired,
  errorMessageRef: PropTypes.shape({}).isRequired,
  ...reduxFormPropTypes,
};

export default withStyles(PickupMainContactEditForm, Style);
export { PickupMainContactEditForm as PickupMainContactEditFormVanilla };
