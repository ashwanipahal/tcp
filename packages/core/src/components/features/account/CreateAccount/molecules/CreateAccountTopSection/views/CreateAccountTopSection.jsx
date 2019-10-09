import React from 'react';
import { PropTypes } from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
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
            {getLabelValue(labels, 'lbl_createAccount_title', 'registration')}
          </BodyCopy>
        )}
        <BodyCopy className="elem-pb-XS" fontFamily="secondary" fontSize="fs13" textAlign="center">
          <span>{getLabelValue(labels, 'lbl_createAccount_createA', 'registration')}</span>
          <span className="my-place-rewards">
            {getLabelValue(labels, 'lbl_createAccount_myPlaceRewards', 'registration')}
          </span>
          <span>{getLabelValue(labels, 'lbl_createAccount_earnPoints', 'registration')}</span>
        </BodyCopy>
      </BodyCopy>

      {!isCanada() && (
        <>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs14"
            textAlign="center"
            className="my-place-rewards"
          >
            {getLabelValue(labels, 'lbl_createAccount_spendPoint', 'registration')}
          </BodyCopy>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs14"
            textAlign="center"
            className="my-place-rewards"
          >
            {getLabelValue(labels, 'lbl_createAccount_pointReward', 'registration')}
          </BodyCopy>
        </>
      )}

      <BodyCopy component="div" className="bordered elem-pb-MED signed-up-in-store">
        <BodyCopy fontFamily="secondary" fontSize="fs12" textAlign="center">
          <p>{getLabelValue(labels, 'lbl_createAccount_signedUp', 'registration')}</p>
          <p>{getLabelValue(labels, 'lbl_createAccount_onlineAccCreated', 'registration')}</p>
          <BodyCopy component="div" fontFamily="secondary" fontSize="fs12" textAlign="center">
            <Anchor underline className="reset-password" onClick={showForgotPasswordFormFn}>
              {getLabelValue(labels, 'lbl_createAccount_clickhere', 'registration')}
            </Anchor>
            {getLabelValue(labels, 'lbl_createAccount_resetPassword', 'registration')}
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
