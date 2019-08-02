import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Anchor from '../../../../../../common/atoms/Anchor';
import { Image } from '../../../../../../common/atoms';
import Styles from '../styles/CreateAccountTopSection.style';
import { getIconPath } from '../../../../../../../utils';

const CreateAccountTopSection = props => {
  const { labels } = props;
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
            <span>{labels.createAccount.CREATE_ACC_LBL_CREATE_A}</span>
            <span className="my-place-rewards">
              {labels.createAccount.CREATE_ACC_LBL_MY_PLACE_REWARDS}
            </span>
            <span>{labels.createAccount.CREATE_ACC_LBL_EARN_POINTS}</span>
          </div>
          <div className="elem-pb-XS spend-points">
            <p>{labels.createAccount.CREATE_ACC_LBL_SPEND_POINT}</p>
            <p>{labels.createAccount.CREATE_ACC_LBL_POINT_REWARD}</p>
          </div>
          <div>
            <p>{labels.createAccount.CREATE_ACC_LBL_SIGNED_UP}</p>
            <p>{labels.createAccount.CREATE_ACC_LBL_ONLINE_ACC_CREATED}</p>
            <div className="reset-pwd">
              <Anchor className="reset-password" to="" target="">
                {labels.createAccount.CREATE_ACC_LBL_RESET_PWD}
              </Anchor>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
