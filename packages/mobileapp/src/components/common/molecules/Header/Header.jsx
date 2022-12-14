import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import {
  getLocator,
  toTimeString,
  capitalize,
  navigateToNestedRoute,
  getLabelValue,
} from '@tcp/core/src/utils';
import { parseDate, compareDate } from '@tcp/core/src/utils/parseDate';
import { setStoresByCoordinates } from '@tcp/core/src/components/features/storeLocator/StoreLanding/container/StoreLanding.actions';
import InitialPropsHOC from '@tcp/core/src/components/common/hoc/InitialPropsHOC/InitialPropsHOC.native';
import {
  updateCartCount,
  updateCartManually,
} from '@tcp/core/src/components/common/organisms/Header/container/Header.actions';
import ToastContainer from '@tcp/core/src/components/common/atoms/Toast/container/Toast.container.native';
import { toastMessageInfo } from '@tcp/core/src/components/common/atoms/Toast/container/Toast.actions.native';

import {
  getUserLoggedInState,
  getUserName,
} from '@tcp/core/src/components/features/account/User/container/User.selectors';
import { onBack } from '@tcp/core/src/utils/utils.app';
import { SearchBar } from '@tcp/core/src/components/common/molecules';
import SearchProduct from '@tcp/core/src/components/common/organisms/SearchProduct';

import { readCookieMobileApp } from '../../../../utils/utils';
import { INTERNET_OFF } from './Header.constants';

import {
  Container,
  MessageContainer,
  StoreContainer,
  CartContainer,
  Icon,
  RoundView,
  SafeAreaViewStyle,
  TextStyle,
  CartIconView,
  ImageColor,
  Touchable,
  HeaderContainer,
  SearchContainer,
  RoundCircle,
  ArrowBackIcon,
  MiddleSection,
  TitleText,
  BackContainer,
} from './Header.style';

const CART_ITEM_COUNTER = 'cartItemsCount';

/**
 * This component creates Mobile Header
 * @param {*} props Props passed from Header screen
 */
const backicon = require('@tcp/core/src/assets/carrot-large-left.png');
const downIcon = require('../../../../assets/images/carrot-small-down.png');
const cartIcon = require('../../../../assets/images/empty-bag.png');

const STORE_TYPE = 'store';

/**
 * This component creates Mobile Header.
 * 1. To Manage the store locator
 * 2. To Navigate the cart page & show cart quantity
 * 3. To show the welcome text for guest user
 *     and shoe the name fro register user
 */
class Header extends React.PureComponent {
  /**
   * To manage the state of icons on the
   * basis of expand & collaps .
   */
  constructor(props) {
    super(props);
    this.state = {
      isDownIcon: false,
      showSearchModal: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { isUpdateCartCount, updateCartManuallyAction, isUserLoggedIn } = this.props;
    if (
      isUpdateCartCount !== prevProps.isUpdateCartCount ||
      isUserLoggedIn !== prevProps.isUserLoggedIn
    ) {
      this.getInitialProps();
      updateCartManuallyAction(false);
    }
    this.noInterNetHandle(prevProps);
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
    const { navigation, labels, resetSuggestedStores } = this.props;
    const { isDownIcon } = this.state;
    resetSuggestedStores([]);
    navigation.navigate({
      routeName: 'StoreLanding',
      params: {
        title: getLabelValue(labels, 'lbl_header_storeDefaultTitle').toUpperCase(),
      },
    });
    this.setState({
      isDownIcon: !isDownIcon,
    });
  };

  /**
   * @function openSearchProductPage
   * opens search product modal
   *
   * @memberof Header
   */
  openSearchProductPage = () => {
    this.setState({ showSearchModal: true });
  };

  /**
   * @function closeSearchProductPage
   * closes search product modal
   *
   * @memberof Header
   */
  closeSearchProductPage = () => {
    this.setState({ showSearchModal: false });
  };

  /**
   * @function goToSearchResultsPage
   * navigates to search results page
   *
   * @memberof Header
   */
  goToSearchResultsPage = searchText => {
    this.closeSearchProductPage();

    const { navigation } = this.props;
    navigateToNestedRoute(navigation, 'HomeStack', 'SearchDetail', {
      title: searchText,
      isForceUpdate: true,
    });
  };

  renderSearchBar = () => {
    const { showSearch, slpLabels, navigation } = this.props;
    const { showSearchModal } = this.state;
    if (!showSearch) return null;
    return (
      <SearchContainer>
        {showSearch && (
          <SearchBar
            openSearchProductPage={this.openSearchProductPage}
            navigation={navigation}
            labels={slpLabels}
          />
        )}
        {showSearchModal && (
          <SearchProduct
            closeSearchModal={this.closeSearchProductPage}
            goToSearchResultsPage={this.goToSearchResultsPage}
            navigation={navigation}
          />
        )}
      </SearchContainer>
    );
  };

  /**
   * @function getStoreHours to calulate store hours for the current date
   * @param {Object} store - store object
   * @return {string} storeTime for the current date
   */
  getStoreHours = store => {
    const hours = store && store.hours;
    const storeHours = hours && [
      ...hours.regularAndHolidayHours,
      ...hours.regularHours,
      ...hours.holidayHours,
    ];
    const todaysDate = new Date();
    let storeTime = '';
    if (storeHours && Array.isArray(storeHours)) {
      storeHours.forEach(hour => {
        const openInterval =
          hour &&
          hour.openIntervals.length > 0 &&
          hour.openIntervals[hour.openIntervals.length - 1].toHour;
        if (compareDate(todaysDate, parseDate(openInterval))) {
          storeTime = toTimeString(parseDate(openInterval), true);
        }
      });
    }
    return storeTime;
  };

  noInterNetHandle(prevProps) {
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

  render() {
    const {
      favStore,
      labels,
      cartVal,
      isUserLoggedIn,
      userName,
      navigation,
      headertype,
      title,
    } = this.props;
    const { isDownIcon } = this.state;
    const basicInfo = favStore && favStore.basicInfo;
    const storeTime = this.getStoreHours(favStore);
    const isInfoPresent = basicInfo && basicInfo.storeName && storeTime;
    let headerLabels = {
      lbl_header_storeDefaultTitle: '',
      lbl_header_welcomeMessage: '',
    };

    if (labels) {
      headerLabels = labels;
    }
    const favStoreTxt = isInfoPresent
      ? `${capitalize(basicInfo.storeName)} ${headerLabels.lbl_header_openUntil} ${storeTime}`
      : null;
    const welcomeMessage = isUserLoggedIn
      ? `${headerLabels.lbl_header_hiTxt} ${userName}!`
      : headerLabels.lbl_header_welcomeMessage;

    return (
      <SafeAreaViewStyle>
        <ToastContainer />
        <Container>
          <HeaderContainer data-locator={getLocator('global_headerpanel')}>
            {headertype === STORE_TYPE ? (
              <BackContainer>
                <TouchableOpacity
                  accessible
                  onPress={() => onBack(navigation)}
                  accessibilityRole="button"
                  accessibilityLabel="back button"
                >
                  <ArrowBackIcon source={backicon} />
                </TouchableOpacity>
                <MiddleSection>
                  <TitleText numberOfLines={1} accessibilityRole="text" accessibilityLabel={title}>
                    {title}
                  </TitleText>
                </MiddleSection>
              </BackContainer>
            ) : (
              <MessageContainer>
                <BodyCopy
                  fontFamily="secondary"
                  fontSize="fs14"
                  textAlign="center"
                  color="black"
                  fontWeight="semibold"
                  text={welcomeMessage}
                  data-locator={getLocator('global_headerpanelwelcometext')}
                />
                <StoreContainer onPress={this.validateIcon}>
                  <BodyCopy
                    fontFamily="secondary"
                    fontSize="fs12"
                    textAlign="center"
                    color="text.primary"
                    fontWeight="regular"
                    text={favStoreTxt || headerLabels.lbl_header_storeDefaultTitle}
                    data-locator={getLocator('global_findastoretext')}
                    accessibilityText="Drop Down"
                  />
                  {isDownIcon ? (
                    <Icon
                      source={downIcon}
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
            )}

            <CartContainer>
              <Touchable
                accessibilityRole="button"
                onPress={() => {
                  // eslint-disable-next-line react/destructuring-assignment
                  // if labels not null then click work .
                  if (labels) navigation.navigate('BagPage');
                }}
              >
                <CartIconView
                  source={cartIcon}
                  data-locator={getLocator('global_headerpanelbagicon')}
                  cartVal={cartVal}
                />
                <RoundCircle cartVal={cartVal}>
                  <RoundView cartVal={cartVal}>
                    <BodyCopy
                      text={cartVal}
                      color="white"
                      style={TextStyle}
                      fontSize="fs10"
                      data-locator={getLocator('global_headerpanelbagitemtext')}
                      accessibilityText="Mini bag with count"
                      fontWeight="extrabold"
                    />
                  </RoundView>
                </RoundCircle>
              </Touchable>
            </CartContainer>
          </HeaderContainer>
          {this.renderSearchBar()}
        </Container>
      </SafeAreaViewStyle>
    );
  }
}

Header.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  favStore: PropTypes.shape({}),
  cartVal: PropTypes.number.isRequired,
  showSearch: PropTypes.bool,
  title: PropTypes.string,
  isUpdateCartCount: PropTypes.bool,
  updateCartManuallyAction: PropTypes.func,
  isUserLoggedIn: PropTypes.bool,
  updateCartCountAction: PropTypes.func,
  navigation: PropTypes.shape({}),
  slpLabels: PropTypes.shape({}),
  userName: PropTypes.string,
  headertype: PropTypes.string,
  screenProps: PropTypes.shape({}),
  toastMessage: PropTypes.func,
  resetSuggestedStores: PropTypes.func,
};

Header.defaultProps = {
  favStore: {},
  showSearch: false,
  title: '',
  isUpdateCartCount: false,
  updateCartManuallyAction: () => {},
  isUserLoggedIn: false,
  updateCartCountAction: () => {},
  navigation: {},
  slpLabels: {},
  userName: '',
  headertype: '',
  screenProps: {},
  toastMessage: () => {},
  resetSuggestedStores: () => {},
};

const mapStateToProps = state => {
  return {
    labels: state.Labels.global && state.Labels.global.header,
    favStore: state.User && state.User.get('defaultStore'),
    cartVal: state.Header && state.Header.cartItemCount,
    isUpdateCartCount: state.Header && state.Header.updateCartCount,
    isUserLoggedIn: getUserLoggedInState(state),
    userName: getUserName(state),
    slpLabels: state.Labels.Browse && state.Labels.Browse.SLP,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    updateCartCountAction: payload => {
      dispatch(updateCartCount(payload));
    },
    updateCartManuallyAction: payload => {
      dispatch(updateCartManually(payload));
    },
    toastMessage: payload => {
      dispatch(toastMessageInfo(payload));
    },
    resetSuggestedStores: payload => dispatch(setStoresByCoordinates(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitialPropsHOC(Header));
export { Header as HeaderVanilla };
