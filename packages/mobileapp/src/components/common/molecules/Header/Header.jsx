import React from 'react';
import { connect } from 'react-redux';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getLocator } from '@tcp/core/src/utils/utils.native';
import HeaderPromo from '../HeaderPromo/HeaderPromo';
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
} from './Header.style';

// @flow
type Props = {
  labels: object,
  headerPromo: Array,
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
    this.state = {
      isDownIcon: false,
      cartVal: 0,
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

  render() {
    const { isDownIcon, cartVal } = this.state;
    let headerLabels = {
      lbl_header_storeDefaultTitle: '',
      lbl_header_welcomeMessage: '',
    };

    const { labels, headerPromo } = this.props;

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
            />
          </CartContainer>
        </Container>
        <HeaderPromo headerPromo={headerPromo} />
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
