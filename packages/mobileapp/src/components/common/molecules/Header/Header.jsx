import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getLocator, readCookieMobileApp } from '@tcp/core/src/utils';
import InitialPropsHOC from '@tcp/core/src/components/common/hoc/InitialPropsHOC/InitialPropsHOC.native';
import { updateCartCount } from '@tcp/core/src/components/common/organisms/Header/container/Header.actions';
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
  Touchable,
} from './Header.style';

const CART_ITEM_COUNTER = 'cartItemsCount';

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
    };
  }

  getInitialProps() {
    const { updateCartCountAction } = this.props;
    const cartValuePromise = readCookieMobileApp(CART_ITEM_COUNTER);
    cartValuePromise.then(res => {
      updateCartCountAction(parseInt(res || 0, 10));
    });
  }

  /**
   * This function validate the iconView.
   */
  validateIcon = () => {
    const { navigation, labels } = this.props;
    const { isDownIcon } = this.state;
    navigation.navigate({
      routeName: 'StoreDetails',
      params: { title: labels.lbl_header_storeDefaultTitle.toUpperCase() },
    });
    this.setState({
      isDownIcon: !isDownIcon,
    });
  };

  render() {
    const { isDownIcon } = this.state;
    const { cartVal } = this.props;
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
      </SafeAreaViewStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    labels: state.Labels.global && state.Labels.global.header,
    cartVal: state.Header.cartItemCount,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    updateCartCountAction: payload => {
      dispatch(updateCartCount(payload));
    },
  };
};

Header.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}),
  cartVal: PropTypes.number.isRequired,
};

Header.defaultProps = {
  navigation: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitialPropsHOC(Header));
export { Header as HeaderVanilla };
