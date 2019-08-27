import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Field, reduxForm, FormSection } from 'redux-form';
import PropTypes from 'prop-types';
import Button from '@tcp/core/src/components/common/atoms/Button';
import withStyles from '../../../../../../common/hoc/withStyles';

import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import { FormStyle, Container, PickupError } from '../styles/PickupPage.view.native.style';
import ErrorMessage from '../../../../common/molecules/ErrorMessage';
import ContactFormFields from '../../../molecules/ContactFormFields';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import CnCTemplate from '../../../../common/organism/CnCTemplate';

class PickUpFormPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, isReset: false };
  }

  handleEditModeChange = isEditing => {
    this.setState({ isEditing, isReset: false });
  };

  onEditMainContactSubmit = () => {
    this.setState({ isEditing: false });
  };

  handleExitEditModeClick = () => {
    this.setState({ isEditing: false, isReset: true });
  };

  SaveAndCancelButton = () => {
    const { pickUpLabels } = this.props;
    return (
      <View>
        <Button
          buttonVariation="variable-width"
          text={pickUpLabels.btnCancel}
          onPress={this.handleExitEditModeClick}
        />

        <Button buttonVariation="variable-width" text={pickUpLabels.btnUpdate} onPress={() => {}} />
      </View>
    );
  };

  render() {
    const {
      className,
      isGuest,
      isMobile,
      pickupError,
      isUsSite,
      pickUpLabels,
      smsSignUpLabels,
      currentPhoneNumber,
      isOrderUpdateChecked,
      isAlternateUpdateChecked,
      initialValues,
      isSmsUpdatesEnabled,
      dispatch,
      handleSubmit,
    } = this.props;
    const { isEditing, isReset } = this.state;

    return (
      <ScrollView>
        <Container>
          <PickupError>
            <ErrorMessage
              error={pickupError}
              className="pickupError"
              fontSize="fs14"
              fontWeight="black"
              dataLocator="pickup-error"
            />
          </PickupError>
          {/* CheckoutSectionTitleDisplay */}
          <Text>PickUpFormPart</Text>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs12"
            textAlign="left"
            fontWeight="semibold"
            marginTop="10"
            text="PickUpFormPart"
          />
          <View>
            {/* <FormSection name="pickUpContact" className="pickUpContact">
              {isGuest ? (
                <ContactFormFields
                  className="pickup-contact-guest-form"
                  showEmailAddress
                  showPhoneNumber
                  labels={pickUpLabels}
                />
              ) : null}
            </FormSection> */}
          </View>
        </Container>
        {/* <CnCTemplate navigation={navigation} btnText="NEXT:SHIPPING" routeToPage="ShippingPage" /> */}
      </ScrollView>
    );
  }
}

PickUpFormPart.propTypes = {
  className: PropTypes.string,
  isGuest: PropTypes.bool,
  isMobile: PropTypes.bool,
  isUsSite: PropTypes.bool,
  isSmsUpdatesEnabled: PropTypes.bool,
  isOrderUpdateChecked: PropTypes.bool,
  isAlternateUpdateChecked: PropTypes.bool,
  pickupError: PropTypes.string,
  currentPhoneNumber: PropTypes.string,
  pickUpLabels: PropTypes.shape({}).isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

PickUpFormPart.defaultProps = {
  className: '',
  isGuest: false,
  isMobile: false,
  isUsSite: false,
  isSmsUpdatesEnabled: false,
  isOrderUpdateChecked: false,
  isAlternateUpdateChecked: false,
  pickupError: '',
  currentPhoneNumber: '',
};

const validateMethod = createValidateMethod({
  pickUpContact: ContactFormFields.ContactValidationConfig,
});

export default reduxForm({
  form: 'checkoutPickup', // a unique identifier for this form
  ...validateMethod,
  destroyOnUnmount: false,
})(withStyles(PickUpFormPart, FormStyle));
export { PickUpFormPart as PickUpFormPartVanilla };
