import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import getStandardConfig from '@tcp/core/src/utils/formValidation/validatorStandardConfig';
import createValidateMethod from '@tcp/core/src/utils/formValidation/createValidateMethod';
import {
  BodyCopyWithSpacing,
  ViewWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';
import withStyles from '../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import RichText from '../../../../../../common/atoms/RichText';
import {
  Styles,
  BrandWrapper,
  CheckBoxFieldWrapper,
  CheckBoxTextWrapper,
  RichTextContainer,
  GymboreeCheckBoxTextWrapper,
  SuccessTextWrapper,
  SuccessRichTextContainer,
} from '../styles/SMSNotifications.style.native';
import TextBox from '../../../../../../common/atoms/TextBox';
import Button from '../../../../../../common/atoms/Button';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import { Image } from '../../../../../../common/atoms';
import SMSNOTIFICATION_CONSTANTS from '../SMSNotification.constants';
import ErrorMessage from '../../../../common/molecules/ErrorMessage';

const doneIcon = require('@tcp/core/src/assets/done.png');

const getEnableAction = (smsNotificationSuccess, isChecked) => {
  return !smsNotificationSuccess && isChecked;
};
const getBrand = (isGymboree, isChildrenPalace) => {
  return isGymboree || isChildrenPalace;
};
const renderBrand = ({ saved, labels, handleChange, isGymboreeCheckBoxShow }) => {
  return (
    !saved && (
      <BrandWrapper>
        <CheckBoxFieldWrapper>
          <Field
            name="brandTCP"
            component={InputCheckbox}
            dataLocator="children-place-checkbox"
            enableSuccessCheck={false}
            className="children-place-checkbox"
            onChange={handleChange}
          />
          <CheckBoxTextWrapper>
            <BodyCopy
              fontSize="fs16"
              fontFamily="secondary"
              fontWeight="regular"
              dataLocator="children-place-label"
              text={labels.childrenPlaceLabel}
            />
          </CheckBoxTextWrapper>
        </CheckBoxFieldWrapper>

        {!isGymboreeCheckBoxShow && (
          <GymboreeCheckBoxTextWrapper>
            <Field
              name="brandGYM"
              component={InputCheckbox}
              dataLocator="gymboree-checkbox"
              enableSuccessCheck={false}
              className="gymboree-checkbox"
              onChange={handleChange}
            />
            <CheckBoxTextWrapper>
              <BodyCopyWithSpacing
                fontSize="fs16"
                fontFamily="secondary"
                fontWeight="regular"
                dataLocator="gymboree-label"
                text={labels.gymboreeLabel}
                spacingStyles="padding-left-XXS"
              />
            </CheckBoxTextWrapper>
          </GymboreeCheckBoxTextWrapper>
        )}
      </BrandWrapper>
    )
  );
};
/**
 * @function SMSNotifications
 * @description wrapper for sms notification.
 */
const SMSNotifications = ({
  labels,
  notificationCarrierMessage,
  isGymboree,
  isChildrenPalace,
  handleSubmit,
  smsNotificationSubmit,
  smsNotificationSuccess,
  smsNotificationError,
  resetNotificationErrorState,
  subscribeSuccessMsg,
  isCanada,
  isTCP,
}) => {
  const formSubmit = formValues => {
    resetNotificationErrorState();
    smsNotificationSubmit({
      ...formValues,
    });
  };
  const handleChange = () => {
    if (smsNotificationError) {
      resetNotificationErrorState();
    }
  };

  const saved = smsNotificationSuccess;
  const isChecked = getBrand(isGymboree, isChildrenPalace);
  const enableActions = getEnableAction(smsNotificationSuccess, isChecked);
  const isGymboreeCheckBoxShow = isCanada && isTCP;

  return (
    <ViewWithSpacing spacingStyles="margin-top-SM margin-bottom-LRG">
      {smsNotificationError && <ErrorMessage showAccordian error={smsNotificationError} />}

      {!saved && (
        <>
          <BodyCopy
            fontSize="fs16"
            fontFamily="secondary"
            className=""
            dataLocator="join-our-text-alerts"
            textAlign="center"
            fontWeight="extrabold"
            text={labels.textAlertHeading}
          />
          <ViewWithSpacing spacingStyles="margin-top-MED margin-bottom-LRG">
            <BodyCopy
              fontSize="fs16"
              fontFamily="secondary"
              dataLocator="special-promos-new-arrivals"
              textAlign="center"
              text={labels.promosAndArrivalsHeading}
            />
          </ViewWithSpacing>
        </>
      )}
      {saved && (
        <BrandWrapper>
          <Image
            alt={labels.subscribeSuccess}
            source={doneIcon}
            width="25px"
            height="25px"
            title={labels.subscribeSuccess}
            data-locator="ChkmarkIcon"
          />
          <SuccessTextWrapper>
            <BodyCopy
              fontSize="fs16"
              fontFamily="secondary"
              dataLocator="join-our-text-alerts"
              textAlign="center"
              fontWeight="extrabold"
              text={labels.subscribeSuccess}
            />
          </SuccessTextWrapper>
        </BrandWrapper>
      )}
      {saved && (
        <SuccessRichTextContainer>
          <RichText source={{ html: subscribeSuccessMsg }} dataLocator="success-message" />
        </SuccessRichTextContainer>
      )}

      {renderBrand({ saved, labels, handleChange, isGymboreeCheckBoxShow })}
      {enableActions && (
        <Field
          id="notification-phoneNumber"
          label={labels.phoneNumber}
          name="phoneNumber"
          type="tel"
          component={TextBox}
          maxLength={50}
          dataLocator="phone-number-field"
          enableSuccessCheck={false}
          onChange={handleChange}
        />
      )}
      {enableActions && (
        <RichTextContainer>
          <RichText source={{ html: notificationCarrierMessage }} dataLocator="carrier-message" />
        </RichTextContainer>
      )}
      {enableActions && (
        <ViewWithSpacing spacingStyles="margin-bottom-LRG">
          <Button
            buttonVariation="fixed-width"
            fill="BLUE"
            type="submit"
            data-locator="join-now-btn"
            text={labels.joinNow}
            onPress={handleSubmit(formSubmit)}
          />
        </ViewWithSpacing>
      )}
    </ViewWithSpacing>
  );
};
SMSNotifications.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  notificationCarrierMessage: PropTypes.string,
  isChildrenPalace: PropTypes.bool,
  isGymboree: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  smsNotificationSubmit: PropTypes.func.isRequired,
  smsNotificationSuccess: PropTypes.bool,
  smsNotificationError: PropTypes.string,
  resetNotificationErrorState: PropTypes.func.isRequired,
  subscribeSuccessMsg: PropTypes.string,
  isTCP: PropTypes.bool,
  isCanada: PropTypes.bool,
};
SMSNotifications.defaultProps = {
  notificationCarrierMessage: '',
  isChildrenPalace: false,
  isGymboree: false,
  smsNotificationSuccess: false,
  smsNotificationError: '',
  subscribeSuccessMsg: '',
  isTCP: false,
  isCanada: false,
};

const validateMethod = createValidateMethod(getStandardConfig(['phoneNumber']));

export default reduxForm({
  form: SMSNOTIFICATION_CONSTANTS.FORM_NAME, // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(SMSNotifications, Styles));

export { SMSNotifications as SMSNotificationsVanilla };
