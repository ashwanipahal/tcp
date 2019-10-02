import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { Image } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { isGymboree, getIconPath } from '@tcp/core/src/utils';
import SignupConfirmStyle from '../SignupConfirm.style';

const SignupConfirm = ({ className, formViewConfig, susbscriptionType }) => {
  const color = isGymboree() ? 'orange' : 'blue';
  const emailIcon = `dot-email-${color}`;
  const chatIcon = `chat-${color}`;

  return (
    <div className={className} id="sign-up-modal-confirm-view">
      <BodyCopy
        fontSize={['fs28', 'fs28', 'fs38']}
        fontFamily="primary"
        fontWeight="black"
        textAlign="center"
        className="thank-you__label"
        data-locator={`${susbscriptionType}_thank_you_message`}
      >
        {formViewConfig.lbl_SignUp_thankYouTextLabel}
      </BodyCopy>
      <BodyCopy
        fontSize={['fs18', 'fs18', 'fs22']}
        fontFamily="secondary"
        textAlign="center"
        className="confirmation-label"
        data-locator={`${susbscriptionType}_copy_text_01`}
      >
        {formViewConfig.lbl_SignUp_joiningTextLabel}
      </BodyCopy>
      <Image
        src={susbscriptionType === 'email' ? getIconPath(emailIcon) : getIconPath(chatIcon)}
        alt={`${susbscriptionType}-icon`}
        className="confirmation-image"
        aria-hidden="true"
        data-locator={susbscriptionType === 'email' ? 'e-mail_icon' : 'sms_icon'}
      />
      <BodyCopy
        fontSize={['fs22', 'fs22', 'fs28']}
        fontFamily="secondary"
        textAlign="center"
        fontWeight="semibold"
        color="primary.dark"
        className="first-label"
        data-locator={`${susbscriptionType}_copy_text_02`}
      >
        {formViewConfig.lbl_SignUp_confirmationMsgReceiveLabel}
      </BodyCopy>
      <BodyCopy
        fontSize={['fs16', 'f16', 'fs18']}
        fontFamily="secondary"
        textAlign="center"
        className="redeem-label"
        data-locator={`${susbscriptionType}_copy_text_03`}
      >
        {formViewConfig.lbl_SignUp_extraMessageLabel}
      </BodyCopy>
      <BodyCopy
        fontSize="fs10"
        fontFamily="secondary"
        textAlign="center"
        className="tnc-label"
        data-locator={`${susbscriptionType}_copy_text_04`}
      >
        {formViewConfig.lbl_SignUp_footerTextLabel}
      </BodyCopy>
    </div>
  );
};

SignupConfirm.propTypes = {
  className: PropTypes.string,
  formViewConfig: PropTypes.shape({}),
  susbscriptionType: PropTypes.string.isRequired,
};

SignupConfirm.defaultProps = {
  className: '',
  formViewConfig: {},
};

export { SignupConfirm as SignupConfirmVanilla };
export default withStyles(SignupConfirm, SignupConfirmStyle);
