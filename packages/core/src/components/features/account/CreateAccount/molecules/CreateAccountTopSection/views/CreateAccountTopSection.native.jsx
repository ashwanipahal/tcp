import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import ImageComp from '../../../../../../common/atoms/Image';
// import LineComp from '../../../../../../common/atoms/';
import TheMarketPlaceLogo from '../../../../../../../assets/my-place-rewards.png';
import {
  SectionStyle,
  CenterAlignWrapper,
  TextAlignCenter,
} from '../styles/CreateAccountTopSection.style.native';

/**
 * @param {string} props : props for CustomIcon
 * @return {JSX} IconClass : Return jsx icon component
 * @desc This method based on the props generate icon component.
 */
const CreateAccountTopSection = props => {
  const { labels } = props;
  // const imgStyle = { alignSelf: 'center' };
  return (
    <View {...props}>
      <CenterAlignWrapper>
        <ImageComp source={TheMarketPlaceLogo} width={186} height={60} />
      </CenterAlignWrapper>
      <CenterAlignWrapper className="labels-wrapper">
        <TextAlignCenter>
          {labels.registration.lbl_createAccount_createA}
          {labels.registration.lbl_createAccount_myPlaceRewards}
          {labels.registration.lbl_createAccount_earnPoints}
        </TextAlignCenter>
        <View>
          <TextAlignCenter>{labels.registration.lbl_createAccount_spendPoint}</TextAlignCenter>
          <TextAlignCenter>{labels.registration.lbl_createAccount_pointReward}</TextAlignCenter>
        </View>
        <View>
          <TextAlignCenter>{labels.registration.lbl_createAccount_signedUp}</TextAlignCenter>
          <TextAlignCenter>
            {labels.registration.lbl_createAccount_onlineAccCreated}
          </TextAlignCenter>
        </View>
      </CenterAlignWrapper>
    </View>
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

export default withStyles(CreateAccountTopSection, SectionStyle);
export { CreateAccountTopSection as CreateAccountTopSectionVanilla };
