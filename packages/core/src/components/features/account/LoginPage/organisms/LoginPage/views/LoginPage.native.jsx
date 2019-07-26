import React from 'react';
import { View } from 'react-native';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import LoginPageStyle from '../LoginPage.style.native';
import LoginTopSection from '../../../molecules/LoginTopSection';

const LoginPage = props => {
  return (
    <View {...props}>
      <LoginTopSection />
    </View>
  );
};

export default withStyles(LoginPage, LoginPageStyle);
export { LoginPage as LoginPageVanilla };
