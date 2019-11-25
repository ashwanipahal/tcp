import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import getStandardConfig from '@tcp/core/src/utils/formValidation/validatorStandardConfig';
import createValidateMethod from '@tcp/core/src/utils/formValidation/createValidateMethod';
import withStyles from '../../../../../../common/hoc/withStyles';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
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
const renderBrand = ({ saved, labels, inputColGrid, handleChange, isGymboreeCheckBoxShow }) => {
  return (
    !saved && (
      <Col {...inputColGrid}>
        <div className="brandWrapper">
          <div className="childrenPlace">
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
              >
                {labels.childrenPlaceLabel}
              </BodyCopy>
            </Field>
          </div>
          {!isGymboreeCheckBoxShow && (
            <div className="gymboree">
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
                >
                  {labels.gymboreeLabel}
                </BodyCopy>
              </Field>
            </div>
          )}
        </div>
      </Col>
    )
  );
};
/**
 * @function SMSNotifications
 * @description wrapper for sms notification.
 */
const SMSNotifications = ({
  labels,
  className,
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

  const inputColGrid = {
    offsetLeft: { large: smsNotificationSuccess ? 3.5 : 3.3, medium: 0.5 },
    offsetRight: { large: 3.3, medium: 0.5 },
    ignoreGutter: { small: true },
    colSize: { small: 6, large: 5, medium: 8 },
  };
  const buttonColGrid = {
    offsetLeft: { large: 4.3, medium: 2.3 },
    offsetRight: { large: 4.3, medium: 2.3 },
    ignoreGutter: { small: true },
    colSize: { small: 6, large: 3, medium: 3 },
  };
  const saved = smsNotificationSuccess;
  const isChecked = getBrand(isGymboree, isChildrenPalace);
  const enableActions = getEnableAction(smsNotificationSuccess, isChecked);
  const isGymboreeCheckBoxShow = isCanada && isTCP;

  return (
    <div className={`${className} notification-width elem-mt-MED elem-mb-XL`}>
      <form onSubmit={handleSubmit(formSubmit)}>
        <Row fullBleed>
          {smsNotificationError && (
            <Col {...inputColGrid}>
              <ErrorMessage error={smsNotificationError} className="notification-error" />
            </Col>
          )}

          {!saved && (
            <Col
              colSize={{
                large: 12,
                medium: 8,
                small: 6,
              }}
            >
              <BodyCopy
                fontSize={['fs16', 'fs16', 'fs18']}
                fontFamily="secondary"
                className=""
                dataLocator="join-our-text-alerts"
                textAlign="center"
                fontWeight="extrabold"
              >
                {labels.textAlertHeading}
              </BodyCopy>
              <div className="elem-mt-MED elem-mb-MED">
                <BodyCopy
                  fontSize={['fs16', 'fs16', 'fs18']}
                  fontFamily="secondary"
                  className=""
                  dataLocator="special-promos-new-arrivals"
                  textAlign="center"
                >
                  {labels.promosAndArrivalsHeading}
                </BodyCopy>
              </div>
            </Col>
          )}
          {saved && (
            <Col {...inputColGrid}>
              <div className="successWrapper">
                <Image
                  className="activity-complete-icon"
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
                  className="elem-ml-XS"
                >
                  {labels.subscribeSuccess}
                </BodyCopy>
              </div>
            </Col>
          )}
          {saved && (
            <Col {...inputColGrid}>
              <BodyCopy
                fontSize={['fs14', 'fs14', 'fs16']}
                fontFamily="secondary"
                className="elem-mt-XS"
              >
                <RichText richTextHtml={subscribeSuccessMsg} dataLocator="success-message" />
              </BodyCopy>
            </Col>
          )}

          {renderBrand({ saved, labels, inputColGrid, handleChange, isGymboreeCheckBoxShow })}
          {enableActions && (
            <Col {...inputColGrid}>
              <Field
                id="notification-phoneNumber"
                placeholder={labels.phoneNumber}
                name="phoneNumber"
                type="tel"
                component={TextBox}
                maxLength={50}
                dataLocator="phone-number-field"
                enableSuccessCheck={false}
                className="phone-field"
                normalize={formatPhoneNumber}
                onChange={handleChange}
              />
            </Col>
          )}
          {enableActions && (
            <Col {...inputColGrid}>
              <BodyCopy
                fontSize={['fs14', 'fs14', 'fs16']}
                fontFamily="secondary"
                className="elem-mt-LRG elem-mb-LRG"
              >
                <RichText richTextHtml={notificationCarrierMessage} dataLocator="carrier-message" />
              </BodyCopy>
            </Col>
          )}
          {enableActions && (
            <Col {...buttonColGrid}>
              <Button
                buttonVariation="fixed-width"
                fill="BLUE"
                type="submit"
                data-locator="join-now-btn"
              >
                {labels.joinNow}
              </Button>
            </Col>
          )}
        </Row>
      </form>
    </div>
  );
};
SMSNotifications.propTypes = {
  className: PropTypes.string,
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
  className: '',
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
