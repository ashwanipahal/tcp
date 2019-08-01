import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import ImageComp from '../../../../../../common/atoms/Image';
import LineComp from '../../../../../../common/atoms/Line';
import TheMarketPlaceLogo from '../../../../../../../assets/my-place-rewards.png';
import {
  SectionStyle,
  HeadingStyle,
  SubHeadingStyle,
  DescriptionStyle,
} from '../LoginTopSection.style.native';

/**
 * @param {string} props : props for CustomIcon
 * @return {JSX} IconClass : Return jsx icon component
 * @desc This method based on the props generate icon component.
 */
const LoginTopSection = props => {
  const { labels } = props;
  const imgStyle = { alignSelf: 'center' };
  return (
    <View {...props}>
      <ImageComp source={TheMarketPlaceLogo} width={186} height={60} style={imgStyle} />
      <LineComp marginTop={30} marginBottom={17} />
      <HeadingStyle>{labels.ACC_LBL_LOGIN_HEADING}</HeadingStyle>
      <SubHeadingStyle>{labels.ACC_LBL_LOGIN_SUB_HEADING}</SubHeadingStyle>
      <DescriptionStyle>{labels.ACC_LBL_LOGIN_SUB_DESCRIPTION}</DescriptionStyle>
      <LineComp marginTop={25} marginBottom={0} />
    </View>
  );
};

LoginTopSection.propTypes = {
  labels: PropTypes.shape({
    ACC_LBL_LOGIN_HEADING: PropTypes.string,
    ACC_LBL_LOGIN_SUB_HEADING: PropTypes.string,
    ACC_LBL_LOGIN_SUB_DESCRIPTION: PropTypes.string,
  }),
};

LoginTopSection.defaultProps = {
  labels: {
    ACC_LBL_LOGIN_HEADING: 'Welcome Back',
    ACC_LBL_LOGIN_SUB_HEADING: 'Log in to earn points for MY PLACE REWARDS ',
    ACC_LBL_LOGIN_SUB_DESCRIPTION: `Signed up in store?\nAn online account has been created with your email! Click here to reset your password.`,
  },
};

export default withStyles(LoginTopSection, SectionStyle);
export { LoginTopSection as LoginTopSectionVanilla };
