import React from 'react';
import { View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import ImageComp from '../../../../../../common/atoms/Image';
// import LineComp from '../../../../../../common/atoms/';
import TheMarketPlaceLogo from '../../../../../../../assets/my-place-rewards.png';
import {
  SectionStyle,
  // HeadingStyle,
  // SubHeadingStyle,
  // DescriptionStyle,
} from '../styles/CreateAccountTopSection.style.native';

/**
 * @param {string} props : props for CustomIcon
 * @return {JSX} IconClass : Return jsx icon component
 * @desc This method based on the props generate icon component.
 */
const CreateAccountTopSection = props => {
  const { labels } = props;
  const imgStyle = { alignSelf: 'center' };
  return (
    <View {...props}>
      <ImageComp source={TheMarketPlaceLogo} width={186} height={60} customStyle={imgStyle} />
      <View className="labels-wrapper">
        <View className="padding-bottom-10">
          <Text>{labels.CREATE_ACC_LBL_CREATE_A}</Text>
          <Text>{labels.CREATE_ACC_LBL_MY_PLACE_REWARDS}</Text>
          <Text>{labels.CREATE_ACC_LBL_EARN_POINTS}</Text>
        </View>
        <View className="padding-bottom-10">
          <Text>{labels.CREATE_ACC_LBL_SPEND_POINT}</Text>
          <Text>{labels.CREATE_ACC_LBL_POINT_REWARD}</Text>
        </View>
        <View>
          <Text>{labels.CREATE_ACC_LBL_SIGNED_UP}</Text>
          <Text>{labels.CREATE_ACC_LBL_ONLINE_ACC_CREATED}</Text>
          {/* <View className="reset-pwd">
            <Anchor className="reset_password" to="" target="">
              {labels.CREATE_ACC_LBL_RESET_PWD}
            </Anchor>
          </View> */}
        </View>
      </View>
      {/* <LineComp marginTop={30} marginBottom={17} /> */}
      {/* <HeadingStyle>{labels.heading}</HeadingStyle>
      <SubHeadingStyle>{labels.subHeading}</SubHeadingStyle>
      <DescriptionStyle>{labels.description}</DescriptionStyle> */}
      {/* <LineComp marginTop={25} marginBottom={0} /> */}
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
