import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getLocator, isGymboree } from '@tcp/core/src/utils';
import { TouchableOpacity } from 'react-native';
import ToastContainer from '@tcp/core/src/components/common/atoms/Toast/container/Toast.container.native';
import { toastMessageInfo } from '@tcp/core/src/components/common/atoms/Toast/container/Toast.actions.native';
import {
  SafeAreaViewStyle,
  BrandIcon,
  CloseIcon,
  BrandIconSection,
  CloseIconTouchable,
  CloseContainer,
  BagPageContainer,
  ArrowBackIcon,
} from './Header.style';

import { BagPageBackContainer } from './BagPageHeader.style';
import { INTERNET_OFF } from './Header.constants';

// @flow
type Props = {
  navigation: object,
};

/**
 * This component creates Mobile Header
 * @param {*} props Props passed from Header screen
 */

const closeIcon = require('@tcp/core/src/assets/close.png');
const backIcon = require('@tcp/core/src/assets/carrot-large-left.png');
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
  componentDidUpdate(prevProps) {
    const {
      screenProps: {
        network: { isConnected },
      },
      toastMessage,
    } = this.props;
    const {
      screenProps: {
        network: { isConnected: PrevIsConnected },
      },
    } = prevProps;
    if (isConnected !== PrevIsConnected && !isConnected) {
      toastMessage(INTERNET_OFF);
    }
  }

  closeIconAction = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { showBrandIcon, showCloseButton, showGobackIcon, isPayPalWebViewEnable } = this.props;
    return (
      <SafeAreaViewStyle>
        <ToastContainer />
        {!isPayPalWebViewEnable && (
          <BagPageContainer data-locator={getLocator('global_bagpageheaderpanel')}>
            {showGobackIcon && (
              <BagPageBackContainer>
                <TouchableOpacity
                  accessible
                  onPress={this.closeIconAction}
                  accessibilityRole="button"
                  accessibilityLabel="back button"
                  data-locator={getLocator('global_bagpagebackbutton')}
                >
                  <ArrowBackIcon source={backIcon} />
                </TouchableOpacity>
              </BagPageBackContainer>
            )}

            {showBrandIcon && (
              <BrandIconSection>
                <BrandIcon
                  source={isGymboree() ? gymIcon : tcpIcon}
                  data-locator={getLocator('global_bagpageheaderpanelbrandicon')}
                  accessibilityRole="image"
                />
              </BrandIconSection>
            )}

            {showCloseButton && (
              <CloseContainer>
                <CloseIconTouchable onPress={this.closeIconAction}>
                  <CloseIcon
                    source={closeIcon}
                    data-locator={getLocator('global_bagpageheaderpanelcloseicon')}
                    accessibilityRole="button"
                  />
                </CloseIconTouchable>
              </CloseContainer>
            )}
          </BagPageContainer>
        )}
      </SafeAreaViewStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    labels: state.Labels.global && state.Labels.global.header,
    isPayPalWebViewEnable:
      state.CartPageReducer.getIn(['uiFlags', 'isPayPalWebViewEnable']) || false,
  };
};

BagPageHeader.propTypes = {
  showBrandIcon: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  showGobackIcon: PropTypes.bool,
  isPayPalWebViewEnable: PropTypes.shape({}),
  screenProps: PropTypes.shape({}),
  toastMessage: PropTypes.func,
};

BagPageHeader.defaultProps = {
  showBrandIcon: true,
  showCloseButton: true,
  showGobackIcon: false,
  isPayPalWebViewEnable: false,
  screenProps: {},
  toastMessage: () => {},
};

const mapDispatchToProps = dispatch => {
  return {
    toastMessage: payload => {
      dispatch(toastMessageInfo(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BagPageHeader);
export { BagPageHeader as BagPageHeaderVanilla };
