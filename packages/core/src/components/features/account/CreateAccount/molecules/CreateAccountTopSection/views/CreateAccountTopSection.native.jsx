import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import ImageComp from '../../../../../../common/atoms/Image';
// import LineComp from '../../../../../../common/atoms/';
import TheMarketPlaceLogo from '../../../../../../../assets/my-place-rewards.png';
import {
  SectionStyle,
  CenterAlignWrapper,
  LabelsWrapper,
  TopSectionWrapper,
  PointsWrapper,
  ResetWrapper,
  HeadingTextWrapper,
} from '../styles/CreateAccountTopSection.style.native';
import LineComp from '../../../../../../common/atoms/Line';
import Anchor from '../../../../../../common/atoms/Anchor';

/**
 * @param {string} props : props for CustomIcon
 * @return {JSX} IconClass : Return jsx icon component
 * @desc This method based on the props generate icon component.
 */

class CreateAccountTopSection extends React.PureComponent<Props> {
  showForgotPassword = () => {
    const { showForgotPasswordForm } = this.props;
    showForgotPasswordForm();
  };

  render() {
    const { labels } = this.props;
    return (
      <View {...this.props}>
        <TopSectionWrapper>
          <CenterAlignWrapper>
            <ImageComp source={TheMarketPlaceLogo} width={186} height={60} />
          </CenterAlignWrapper>
          <LineComp marginTop={28} />
          <LabelsWrapper className="labels-wrapper">
            <HeadingTextWrapper>
              <BodyCopy
                fontSize="fs13"
                component="span"
                textAlign="center"
                text={labels.registration.lbl_createAccount_createA}
              />
              <BodyCopy
                fontSize="fs13"
                component="span"
                textAlign="center"
                color="gray.1000"
                text={labels.registration.lbl_createAccount_myPlaceRewards}
              />
              <BodyCopy
                fontSize="fs13"
                component="span"
                textAlign="center"
                text={labels.registration.lbl_createAccount_earnPoints}
              />
            </HeadingTextWrapper>
            <PointsWrapper>
              <BodyCopy
                fontSize="fs14"
                textAlign="center"
                color="gray.800"
                text={labels.registration.lbl_createAccount_spendPoint}
              />
              <BodyCopy
                fontWeight="black"
                fontSize="fs14"
                textAlign="center"
                color="gray.800"
                text={labels.registration.lbl_createAccount_pointReward}
              />
            </PointsWrapper>
            <ResetWrapper>
              <BodyCopy
                fontSize="fs12"
                textAlign="center"
                text={labels.registration.lbl_createAccount_signedUp}
              />

              <BodyCopy
                fontSize="fs12"
                textAlign="center"
                text={labels.registration.lbl_createAccount_onlineAccCreated}
              />
              <Anchor
                class="clickhere"
                fontSizeVariation="medium"
                text={labels.registration.lbl_createAccount_resetPassword}
                underline
                onPress={this.showForgotPassword}
              />
            </ResetWrapper>
          </LabelsWrapper>
          <LineComp marginTop={28} />
        </TopSectionWrapper>
      </View>
    );
  }
}

CreateAccountTopSection.propTypes = {
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

CreateAccountTopSection.defaultProps = {
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

export default withStyles(CreateAccountTopSection, SectionStyle);
export { CreateAccountTopSection as CreateAccountTopSectionVanilla };
