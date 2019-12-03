import React from 'react';
import PropTypes from 'prop-types';
import { Button, BodyCopy } from '@tcp/core/src/components/common/atoms';
import { Container, SafeAreaViewStyle, TextConatiner } from './NoInternetPage.style';

class NoInternetPage extends React.PureComponent {
  onRetry = () => {
    const {
      screenProps: { retryNetwork },
    } = this.props;
    if (retryNetwork) {
      retryNetwork();
    }
  };

  render() {
    const {
      screenProps: {
        network: { isConnected },
      },
    } = this.props;
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
            disabled={!isConnected}
          />
        </Container>
      </SafeAreaViewStyle>
    );
  }
}

NoInternetPage.propTypes = {
  screenProps: PropTypes.shape({}).isRequired,
};

export default NoInternetPage;
