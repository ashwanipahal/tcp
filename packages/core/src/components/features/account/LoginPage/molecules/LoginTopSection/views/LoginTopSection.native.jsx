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
      <ImageComp source={TheMarketPlaceLogo} width={186} height={60} customStyle={imgStyle} />
      <LineComp marginTop={30} marginBottom={17} />
      <HeadingStyle>{labels.heading}</HeadingStyle>
      <SubHeadingStyle>{labels.subHeading}</SubHeadingStyle>
      <DescriptionStyle>{labels.description}</DescriptionStyle>
      <LineComp marginTop={25} marginBottom={0} />
    </View>
  );
};

LoginTopSection.propTypes = {
  labels: PropTypes.shape({
    heading: PropTypes.string,
    subHeading: PropTypes.string,
    description: PropTypes.string,
  }),
};

LoginTopSection.defaultProps = {
  labels: {
    heading: 'Welcome Back',
    subHeading: 'Log in to earn points for MY PLACE REWARDS ',
    description: `Signed up in store?\nAn online account has been created with your email! Click here to reset your password.`,
  },
};

export default withStyles(LoginTopSection, SectionStyle);
export { LoginTopSection as LoginTopSectionVanilla };
