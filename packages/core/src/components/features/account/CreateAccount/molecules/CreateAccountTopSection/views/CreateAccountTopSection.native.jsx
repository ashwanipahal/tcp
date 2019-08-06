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
    registration: {
      lbl_createAccount_createA: '',
      lbl_createAccount_myPlaceRewards: '',
      lbl_createAccount_earnPoints: '',
      lbl_createAccount_spendPoint: '',
      lbl_createAccount_pointReward: '',
      lbl_createAccount_signedUp: '',
      lbl_createAccount_onlineAccCreated: '',
    },
  }),
};

CreateAccountTopSection.defaultProps = {
  labels: {
    registration: {
      lbl_createAccount_createA: PropTypes.string,
      lbl_createAccount_myPlaceRewards: PropTypes.string,
      lbl_createAccount_earnPoints: PropTypes.string,
      lbl_createAccount_spendPoint: PropTypes.string,
      lbl_createAccount_pointReward: PropTypes.string,
      lbl_createAccount_signedUp: PropTypes.string,
      lbl_createAccount_onlineAccCreated: PropTypes.string,
    },
  },
};

export default withStyles(CreateAccountTopSection, SectionStyle);
export { CreateAccountTopSection as CreateAccountTopSectionVanilla };
