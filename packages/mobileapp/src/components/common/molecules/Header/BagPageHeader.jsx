import React from 'react';
import { connect } from 'react-redux';
import { getLocator, isGymboree } from '@tcp/core/src/utils';
import ToastContainer from '@tcp/core/src/components/common/atoms/Toast/container/Toast.container.native';
import {
  SafeAreaViewStyle,
  BrandIcon,
  CloseIcon,
  BrandIconSection,
  CloseIconTouchable,
  CloseContainer,
  BagPageContainer,
  Header,
} from './Header.style';

// @flow
type Props = {
  navigation: object,
  closeModal: Function,
  isApplyNowModal: Boolean,
};

/**
 * This component creates Mobile Header
 * @param {*} props Props passed from Header screen
 */

const closeIcon = require('@tcp/core/src/assets/close.png');
const tcpIcon = require('../../../../assets/images/tcp/tcpLaunchImage.png');
const gymIcon = require('../../../../assets/images/gymboree/gymboreeLaunchImage.png');

/**
 * This component creates Mobile Header.
 * 1. To Manage the store locator
 * 2. To Navigate the cart page & show cart quantity
 * 3. To show the welcome text for guest user
 *     and shoe the name fro register user
 */
class BagPageHeader extends React.PureComponent<Props> {
  closeIconAction = () => {
    const { navigation, closeModal } = this.props;
    navigation.goBack();
    if (closeModal) {
      closeModal();
    }
  };

  render() {
    const { isApplyNowModal } = this.props;
    return (
      <SafeAreaViewStyle>
        <ToastContainer />
        <BagPageContainer data-locator={getLocator('global_bagpageheaderpanel')}>
          {!isApplyNowModal ? (
            <BrandIconSection>
              <BrandIcon
                source={isGymboree() ? gymIcon : tcpIcon}
                data-locator={getLocator('global_bagpageheaderpanelbrandicon')}
                accessibilityRole="image"
              />
            </BrandIconSection>
          ) : (
            <Header />
          )}
          <CloseContainer>
            <CloseIconTouchable onPress={this.closeIconAction}>
              <CloseIcon
                source={closeIcon}
                data-locator={getLocator('global_bagpageheaderpanelcloseicon')}
                accessibilityRole="button"
              />
            </CloseIconTouchable>
          </CloseContainer>
        </BagPageContainer>
      </SafeAreaViewStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    labels: state.Labels.global && state.Labels.global.header,
  };
};

export default connect(mapStateToProps)(BagPageHeader);
export { BagPageHeader as BagPageHeaderVanilla };
