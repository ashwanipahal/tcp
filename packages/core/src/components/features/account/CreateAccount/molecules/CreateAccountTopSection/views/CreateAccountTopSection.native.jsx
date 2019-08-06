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
  LabelsWrapper,
  TextAlignCenter,
  ViewAlignCenter,
  TopSectionWrapper,
  PointsWrapper,
  ResetWrapper,
} from '../styles/CreateAccountTopSection.style.native';
import LineComp from '../../../../../../common/atoms/Line';
import Anchor from '../../../../../../common/atoms/Anchor';

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
      <TopSectionWrapper>
        <CenterAlignWrapper>
          <ImageComp source={TheMarketPlaceLogo} width={186} height={60} />
        </CenterAlignWrapper>
        <LineComp marginTop={28} />
        <LabelsWrapper className="labels-wrapper">
          <TextAlignCenter>
            {labels.CREATE_ACC_LBL_CREATE_A}
            {labels.CREATE_ACC_LBL_MY_PLACE_REWARDS}
            {labels.CREATE_ACC_LBL_EARN_POINTS}
          </TextAlignCenter>
          <PointsWrapper>
            <TextAlignCenter>{labels.CREATE_ACC_LBL_SPEND_POINT}</TextAlignCenter>
            <TextAlignCenter>{labels.CREATE_ACC_LBL_POINT_REWARD}</TextAlignCenter>
          </PointsWrapper>
          <ResetWrapper>
            <TextAlignCenter>{labels.CREATE_ACC_LBL_SIGNED_UP}</TextAlignCenter>
            <TextAlignCenter>{labels.CREATE_ACC_LBL_ONLINE_ACC_CREATED}</TextAlignCenter>
            <ViewAlignCenter>
              <Anchor fontSizeVariation="xlarge" text={labels.CREATE_ACC_LBL_RESET_PWD} underline />
            </ViewAlignCenter>
          </ResetWrapper>
        </LabelsWrapper>
        <LineComp marginTop={28} />
      </TopSectionWrapper>
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
