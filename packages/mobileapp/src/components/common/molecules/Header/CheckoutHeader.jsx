import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { getLocator } from '@tcp/core/src/utils';
import ToastContainer from '@tcp/core/src/components/common/atoms/Toast/container/Toast.container.native';
import {
  MessageContainer,
  StoreContainer,
  SafeAreaViewStyle,
  ImageColor,
  CheckoutHeaderContainer,
  CheckoutHeaderTextSection,
  BackIcon,
  BackIconTouchable,
} from './Header.style';

// @flow
type Props = {
  navigation: object,
};

/**
 * This component creates Mobile Header
 * @param {*} props Props passed from Header screen
 */

const leftIcon = require('../../../../assets/images/carrot-large-left.png');

/**
 * This component creates Mobile Header.
 * 1. To Manage the store locator
 * 2. To Navigate the cart page & show cart quantity
 * 3. To show the welcome text for guest user
 *     and shoe the name fro register user
 */
class CheckoutHeader extends React.PureComponent<Props> {
  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaViewStyle>
        <ToastContainer />
        <CheckoutHeaderContainer data-locator={getLocator('global_headerpanel')}>
          <MessageContainer>
            <StoreContainer>
              <BackIconTouchable
                onPress={() => {
                  navigation.goBack(null);
                }}
              >
                <BackIcon
                  source={leftIcon}
                  style={ImageColor}
                  data-locator={getLocator('global_headerpanelcollapsedicon')}
                  accessibilityRole="button"
                />
              </BackIconTouchable>
            </StoreContainer>
          </MessageContainer>
          <CheckoutHeaderTextSection>
            <Text className="product-name">CHECKOUT</Text>
          </CheckoutHeaderTextSection>
        </CheckoutHeaderContainer>
      </SafeAreaViewStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    labels: state.Labels.global && state.Labels.global.header,
  };
};

export default connect(mapStateToProps)(CheckoutHeader);
export { CheckoutHeader as CheckoutHeaderVanilla };
