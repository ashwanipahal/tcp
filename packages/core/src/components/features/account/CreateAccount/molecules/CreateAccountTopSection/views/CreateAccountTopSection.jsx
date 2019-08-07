import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Anchor from '../../../../../../common/atoms/Anchor';
import { Image } from '../../../../../../common/atoms';
import Styles from '../styles/CreateAccountTopSection.style';
import { getIconPath } from '../../../../../../../utils';

class CreateAccountTopSection extends React.Component<Props> {
  showForgotPasswordForm = e => {
    e.preventDefault();
    const { showForgotPasswordForm } = this.props;
    showForgotPasswordForm();
  };

  render() {
    const { labels } = this.props;
    return (
      <div>
        <div className="elem-pr-MED elem-pl-MED">
          <div className="img-parent align-center">
            <div className="my-rewards-img-wrapper elem-pb-XL">
              <Image className="tcp_carousel__play" src={getIconPath('my-place-rewards')} />
            </div>
          </div>
        </div>
        <div className="elem-pr-MED elem-pl-MED">
          <div className="labels-wrapper">
            <div className="elem-pb-XS">
              <span>{labels.registration.lbl_createAccount_createA}</span>
              <span className="my-place-rewards">
                {labels.registration.lbl_createAccount_myPlaceRewards}
              </span>
              <span>{labels.registration.lbl_createAccount_earnPoints}</span>
            </div>
            <div className="elem-pb-XS spend-points">
              <p>{labels.registration.lbl_createAccount_spendPoint}</p>
              <p>{labels.registration.lbl_createAccount_pointReward}</p>
            </div>
            <div>
              <p>{labels.registration.lbl_createAccount_signedUp}</p>
              <p>{labels.registration.lbl_createAccount_onlineAccCreated}</p>
              <div className="reset-pwd">
                <Anchor className="reset-password" onClick={this.showForgotPasswordForm}>
                  {labels.registration.lbl_createAccount_resetPassword}
                </Anchor>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateAccountTopSection.propTypes = {
  labels: PropTypes.shape({
    heading: PropTypes.string,
    subHeading: PropTypes.string,
    description: PropTypes.string,
  }),
};

CreateAccountTopSection.defaultProps = {
  labels: {
    heading: 'Welcome Back',
    subHeading: 'Log in to earn points for MY PLACE REWARDS ',
    description: `Signed up in store?\nAn online account has been created with your email! Click here to reset your password.`,
  },
};

export default withStyles(CreateAccountTopSection, Styles);
export { CreateAccountTopSection as CreateAccountTopSectionVanilla };
