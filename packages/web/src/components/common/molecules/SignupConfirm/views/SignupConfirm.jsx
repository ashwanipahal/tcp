import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import SignupConfirmStyle from '../SignupConfirm.style';

const SignupConfirm = ({ className, formViewConfig }) => (
  <div className={className}>
    <BodyCopy
      fontSize="fs28"
      fontFamily="primary"
      fontWeight="black"
      textAlign="center"
      className="thank-you__label"
    >
      {formViewConfig.thankYouTextLabel}
    </BodyCopy>
    <BodyCopy
      fontSize="fs18"
      fontFamily="secondary"
      textAlign="center"
      className="confirmation__label"
    >
      {formViewConfig.joiningTextLabel}
    </BodyCopy>
    <BodyCopy
      fontSize="fs22"
      fontFamily="secondary"
      textAlign="center"
      fontWeight="semibold"
      color="primary.main"
    >
      {formViewConfig.confirmationMsgReceiveLabel}
    </BodyCopy>
    <BodyCopy fontSize="fs16" fontFamily="secondary" textAlign="center">
      {formViewConfig.extraMessageLabel}
    </BodyCopy>
    <BodyCopy fontSize="fs12" fontFamily="secondary" textAlign="center">
      {formViewConfig.footerTextLabel}
    </BodyCopy>
  </div>
);

SignupConfirm.propTypes = {
  className: PropTypes.string,
  formViewConfig: PropTypes.shape({}),
};

SignupConfirm.defaultProps = {
  className: '',
  formViewConfig: {},
};

export { SignupConfirm as SignupConfirmVanilla };
export default withStyles(SignupConfirm, SignupConfirmStyle);
