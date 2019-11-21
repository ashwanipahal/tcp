import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import getStandardConfig from '@tcp/core/src/utils/formValidation/validatorStandardConfig';
import createValidateMethod from '@tcp/core/src/utils/formValidation/createValidateMethod';
import withStyles from '../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import RichText from '../../../../../../common/atoms/RichText';
import styles from '../styles/SMSNotifications.style';
import { formatPhoneNumber } from '../../../../../../../utils/formValidation/phoneNumber';
import TextBox from '../../../../../../common/atoms/TextBox';
import Button from '../../../../../../common/atoms/Button';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import { getIconPath } from '../../../../../../../utils';
import { Image } from '../../../../../../common/atoms';
import SMSNOTIFICATION_CONSTANTS from '../SMSNotification.constants';
import ErrorMessage from '../../../../common/molecules/ErrorMessage';

const getEnableAction = (smsNotificationSuccess, isChecked) => {
  return !smsNotificationSuccess && isChecked;
};
const getBrand = (isGymboree, isChildrenPalace) => {
  return isGymboree || isChildrenPalace;
};
const renderBrand = ({ saved, labels, handleChange, isGymboreeCheckBoxShow }) => {
  return (
    !saved && (
      <>
        <>
          <Field
            name="brandTCP"
            component={InputCheckbox}
            dataLocator="children-place-checkbox"
            enableSuccessCheck={false}
            className="children-place-checkbox"
            onChange={handleChange}
          >
            <BodyCopy
              fontSize="fs16"
              fontFamily="secondary"
              fontWeight="regular"
              dataLocator="children-place-label"
              text={labels.childrenPlaceLabel}
            />
          </Field>
        </>
        {!isGymboreeCheckBoxShow && (
          <>
            <Field
              name="brandGYM"
              component={InputCheckbox}
              dataLocator="gymboree-checkbox"
              enableSuccessCheck={false}
              className="gymboree-checkbox"
              onChange={handleChange}
            >
              <BodyCopy
                fontSize="fs16"
                fontFamily="secondary"
                fontWeight="regular"
                dataLocator="gymboree-label"
                text={labels.gymboreeLabel}
              />
            </Field>
          </>
        )}
      </>
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
    <>
      <form onSubmit={handleSubmit(formSubmit)}>
        {smsNotificationError && (
          <ErrorMessage error={smsNotificationError} className="notification-error" />
        )}

        {!saved && (
          <>
            <BodyCopy
              fontSize={['fs16', 'fs16', 'fs18']}
              fontFamily="secondary"
              className=""
              dataLocator="join-our-text-alerts"
              textAlign="center"
              fontWeight="extrabold"
              text={labels.textAlertHeading}
            />
            <>
              <BodyCopy
                fontSize={['fs16', 'fs16', 'fs18']}
                fontFamily="secondary"
                dataLocator="special-promos-new-arrivals"
                textAlign="center"
                text={labels.promosAndArrivalsHeading}
              />
            </>
          </>
        )}
        {saved && (
          <>
            <Image
              alt={labels.subscribeSuccess}
              src={getIconPath('icon-done')}
              title={labels.subscribeSuccess}
              data-locator="ChkmarkIcon"
            />
            <BodyCopy
              fontSize={['fs16', 'fs16', 'fs18']}
              fontFamily="secondary"
              dataLocator="join-our-text-alerts"
              textAlign="center"
              fontWeight="extrabold"
              text={labels.subscribeSuccess}
            />
          </>
        )}
        {saved && (
          <BodyCopy fontSize={['fs14', 'fs14', 'fs16']} fontFamily="secondary">
            <RichText richTextHtml={subscribeSuccessMsg} dataLocator="success-message" />
          </BodyCopy>
        )}

        {renderBrand({ saved, labels, handleChange, isGymboreeCheckBoxShow })}
        {enableActions && (
          <Field
            id="notification-phoneNumber"
            placeholder={labels.phoneNumber}
            name="phoneNumber"
            type="tel"
            component={TextBox}
            maxLength={50}
            dataLocator="phone-number-field"
            enableSuccessCheck={false}
            normalize={formatPhoneNumber}
            onChange={handleChange}
          />
        )}
        {enableActions && (
          <BodyCopy fontSize="fs14" fontFamily="secondary">
            <RichText richTextHtml={notificationCarrierMessage} dataLocator="carrier-message" />
          </BodyCopy>
        )}
        {enableActions && (
          <Button
            buttonVariation="fixed-width"
            fill="BLUE"
            type="submit"
            data-locator="join-now-btn"
            text={labels.joinNow}
          />
        )}
      </form>
    </>
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
})(withStyles(SMSNotifications, styles));

export { SMSNotifications as SMSNotificationsVanilla };
