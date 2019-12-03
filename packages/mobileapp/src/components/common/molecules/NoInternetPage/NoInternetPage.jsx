import React from 'react';
import PropTypes from 'prop-types';
import { StackActions, NavigationActions } from 'react-navigation';
import { Button, BodyCopy } from '@tcp/core/src/components/common/atoms';
import { Container, SafeAreaViewStyle, TextConatiner } from './NoInternetPage.style';

class NoInternetPage extends React.PureComponent {
  onRetry = () => {
    const {
      navigation,
      screenProps: {
        network: { isConnected },
      },
    } = this.props;
    if (navigation && isConnected) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })],
      });
      navigation.dispatch(resetAction);
    }
  };

  render() {
    return (
      <SafeAreaViewStyle>
        <Container>
          <TextConatiner>
            <BodyCopy
              fontFamily="secondary"
              fontWeight="extrabold"
              fontSize="fs22"
              text="No Internet Connection"
            />
          </TextConatiner>
          <Button
            fontFamily="secondary"
            width="50%"
            text="Retry"
            fill="BLUE"
            color="white"
            onPress={this.onRetry}
          />
        </Container>
      </SafeAreaViewStyle>
    );
  }
}

NoInternetPage.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  screenProps: PropTypes.shape({}).isRequired,
};

export default NoInternetPage;
