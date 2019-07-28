import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { SectionStyle, HeadingStyle } from '../LoginForm.style.native';

/**
 * @param {string} props : props for CustomIcon
 * @return {JSX} IconClass : Return jsx icon component
 * @desc This method based on the props generate icon component.
 */
const LoginTopSection = props => {
  const { labels } = props;
  return (
    <View {...props}>
      <HeadingStyle>{labels.heading}</HeadingStyle>
    </View>
  );
};

LoginTopSection.propTypes = {
  labels: PropTypes.shape({
    heading: PropTypes.string,
  }),
};

LoginTopSection.defaultProps = {
  labels: {
    heading: 'Email Address',
  },
};

export default withStyles(LoginTopSection, SectionStyle);
export { LoginTopSection as LoginTopSectionVanilla };
