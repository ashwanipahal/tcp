import React from 'react';
import { connect } from 'react-redux';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getLocator } from '@tcp/core/src/utils';
import HeaderPromo from '../HeaderPromo/HeaderPromo';
import { readCookieMobileApp } from '../../../../utils/utils';

import {
  Container,
  MessageContainer,
  StoreContainer,
  CartContainer,
  Icon,
  RoundView,
  SafeAreaViewStyle,
  TextStyle,
  BackgroundView,
  CartIconView,
  ImageColor,
  HeaderPromoContainer,
  Touchable,
} from './Header.style';

// @flow
type Props = {
  labels: object,
  headerPromo: Array,
  navigation: object,
};

/**
 * This component creates Mobile Header
 * @param {*} props Props passed from Header screen
 */

const downIcon = require('../../../../assets/images/carrot-small-down.png');
const upIcon = require('../../../../assets/images/carrot-small-up.png');
const cartIcon = require('../../../../assets/images/empty-bag.png');

/**
 * This component creates Mobile Header.
 * 1. To Manage the store locator
 * 2. To Navigate the cart page & show cart quantity
 * 3. To show the welcome text for guest user
 *     and shoe the name fro register user
 */
class Header extends React.PureComponent<Props> {
  /**
   * To manage the state of icons on the
   * basis of expand & collaps .
   */
  constructor(props) {
    super(props);
    const CART_ITEM_COUNTER = 'cartItemsCount';
    this.state = {
      isDownIcon: false,
      cartVal: parseInt(readCookieMobileApp(CART_ITEM_COUNTER) || 0, 10),
    };
  }

  /**
   * This function validate the iconView.
   */
  validateIcon = () => {
    const { isDownIcon } = this.state;
    this.setState({
      isDownIcon: !isDownIcon,
    });
  };

  renderPromo = () => {
    const { headerPromo } = this.props;
    if (headerPromo) {
      return (
        <HeaderPromoContainer>
          <HeaderPromo headerPromo={headerPromo} />
        </HeaderPromoContainer>
      );
    }
    return null;
  };

  render() {
    const { isDownIcon, cartVal } = this.state;
    let headerLabels = {
      lbl_header_storeDefaultTitle: '',
      lbl_header_welcomeMessage: '',
    };

    const { labels } = this.props;
    if (labels) {
      headerLabels = labels;
    }

    return (
      <SafeAreaViewStyle>
        <Container data-locator={getLocator('global_headerpanel')}>
          <MessageContainer>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs14"
              textAlign="center"
              color="black"
              fontWeight="semibold"
              text={headerLabels.lbl_header_welcomeMessage}
              data-locator={getLocator('global_headerpanelwelcometext')}
            />
            <StoreContainer onPress={this.validateIcon}>
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs12"
                textAlign="center"
                color="text.primary"
                fontWeight="regular"
                text={headerLabels.lbl_header_storeDefaultTitle}
                data-locator={getLocator('global_findastoretext')}
                accessibilityText="Drop Down"
              />
              {isDownIcon ? (
                <Icon
                  source={upIcon}
                  style={ImageColor}
                  data-locator={getLocator('global_headerpanelexpandedicon')}
                />
              ) : (
                <Icon
                  source={downIcon}
                  style={ImageColor}
                  data-locator={getLocator('global_headerpanelcollapsedicon')}
                />
              )}
            </StoreContainer>
          </MessageContainer>
          <CartContainer>
            <Touchable
              accessibilityRole="button"
              onPress={() => {
                // eslint-disable-next-line react/destructuring-assignment
                this.props.navigation.navigate('BagPage');
              }}
            >
              <CartIconView
                source={cartIcon}
                data-locator={getLocator('global_headerpanelbagicon')}
              />
              <BackgroundView />
              <RoundView />
              <BodyCopy
                text={cartVal}
                color="white"
                style={TextStyle}
                fontSize="fs10"
                data-locator={getLocator('global_headerpanelbagitemtext')}
                accessibilityText="Mini bag with count"
              />
            </Touchable>
          </CartContainer>
        </Container>
        {this.renderPromo()}
      </SafeAreaViewStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    labels: state.Labels.global && state.Labels.global.header,
    headerPromo: state.Header && state.Header.promoTextBannerCarousel,
  };
};

export default connect(mapStateToProps)(Header);
export { Header as HeaderVanilla };
