import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Anchor from '../../../../../../common/atoms/Anchor';
import { Image, BodyCopy } from '../../../../../../common/atoms';
import Styles from '../styles/CreateAccountTopSection.style';
import { getIconPath, isCanada } from '../../../../../../../utils';

const CreateAccountTopSection = props => {
  const { labels } = props;
  const showForgotPasswordFormFn = e => {
    e.preventDefault();
    const { showForgotPasswordForm } = props;
    showForgotPasswordForm();
  };

  return (
    <BodyCopy component="div" className="elem-pr-XS elem-pl-XS">
      {!isCanada() && (
        <BodyCopy component="div" className="img-parent align-center">
          <BodyCopy component="div" className="my-rewards-img-wrapper elem-pb-XL">
            <Image className="tcp_carousel__play" src={getIconPath('my-place-rewards')} />
          </BodyCopy>
        </BodyCopy>
      )}

      <BodyCopy component="div" className="bordered elem-pt-MED labels-wrapper">
        {isCanada() && (
          <BodyCopy fontSize="fs14" fontWeight="black" textAlign="center" className="elem-pb-LRG">
            {labels.registration.lbl_createAccount_title}
          </BodyCopy>
        )}
        <BodyCopy className="elem-pb-XS" fontFamily="secondary" fontSize="fs13" textAlign="center">
          <span>{labels.registration.lbl_createAccount_createA}</span>
          <span className="my-place-rewards">
            {labels.registration.lbl_createAccount_myPlaceRewards}
          </span>
          <span>{labels.registration.lbl_createAccount_earnPoints}</span>
        </BodyCopy>
      </BodyCopy>

      {!isCanada() && (
        <BodyCopy component="div" className="elem-pb-XS spend-points">
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs14"
            textAlign="center"
            className="my-place-rewards"
          >
            {labels.registration.lbl_createAccount_spendPoint}
          </BodyCopy>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs14"
            textAlign="center"
            className="my-place-rewards"
          >
            {labels.registration.lbl_createAccount_pointReward}
          </BodyCopy>
        </BodyCopy>
      )}

      <BodyCopy component="div" className="bordered elem-pb-MED signed-up-in-store">
        <BodyCopy fontFamily="secondary" fontSize="fs12" textAlign="center">
          <p>{labels.registration.lbl_createAccount_signedUp}</p>
          <p>{labels.registration.lbl_createAccount_onlineAccCreated}</p>
          <BodyCopy component="div" fontFamily="secondary" fontSize="fs12" textAlign="center">
            <Anchor className="reset-password" onClick={showForgotPasswordFormFn}>
              {labels.registration.lbl_createAccount_resetPassword}
            </Anchor>
          </BodyCopy>
        </BodyCopy>
      </BodyCopy>
    </BodyCopy>
  );
};

CreateAccountTopSection.propTypes = {
  showForgotPasswordForm: PropTypes.func,
  labels: PropTypes.shape({
    heading: PropTypes.string,
    subHeading: PropTypes.string,
    description: PropTypes.string,
  }),
};

CreateAccountTopSection.defaultProps = {
  showForgotPasswordForm: () => {},
  labels: {
    heading: 'Welcome Back',
    subHeading: 'Log in to earn points for MY PLACE REWARDS ',
    description: `Signed up in store?\nAn online account has been created with your email! Click here to reset your password.`,
  },
};

export default withStyles(CreateAccountTopSection, Styles);
export { CreateAccountTopSection as CreateAccountTopSectionVanilla };
