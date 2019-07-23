import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { Image } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import SignupConfirmStyle from '../SignupConfirm.style';

const SignupConfirm = ({ className, formViewConfig, susbscriptionType }) => (
  <div className={className}>
    <BodyCopy
      fontSize={['fs28', 'fs28', 'fs38']}
      fontFamily="primary"
      fontWeight="black"
      textAlign="center"
      className="thank-you__label"
      dataLocator={`${susbscriptionType}_thank_you_message`}
    >
      {formViewConfig.thankYouTextLabel}
    </BodyCopy>
    <BodyCopy
      fontSize={['fs18', 'fs18', 'fs22']}
      fontFamily="secondary"
      textAlign="center"
      className="confirmation-label"
    >
      {formViewConfig.joiningTextLabel}
    </BodyCopy>
    <Image
      src={
        susbscriptionType === 'email'
          ? '/static/images/dot-email-blue.svg'
          : '/static/images/chat.svg'
      }
      alt={`${susbscriptionType}-icon`}
      className="confirmation-image"
    />
    <BodyCopy
      fontSize={['fs22', 'fs22', 'fs28']}
      fontFamily="secondary"
      textAlign="center"
      fontWeight="semibold"
      color="primary.main"
      className="first-label"
    >
      {formViewConfig.confirmationMsgReceiveLabel}
    </BodyCopy>
    <BodyCopy
      fontSize={['fs16', 'f16', 'fs18']}
      fontFamily="secondary"
      textAlign="center"
      className="redeem-label"
    >
      {formViewConfig.extraMessageLabel}
    </BodyCopy>
    <BodyCopy fontSize="fs10" fontFamily="secondary" textAlign="center" className="tnc-label">
      {formViewConfig.footerTextLabel}
    </BodyCopy>
  </div>
);

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
