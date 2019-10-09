import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getLocator, toTimeString, capitalize } from '@tcp/core/src/utils';
import { parseDate, compareDate } from '@tcp/core/src/utils/parseDate';
import { getFavoriteStoreActn } from '@tcp/core/src/components/features/storeLocator/StoreLanding/container/StoreLanding.actions';
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
  Touchable,
} from './Header.style';

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

  componentDidMount() {
    const CART_ITEM_COUNTER = 'cartItemsCount';
    const cartValuePromise = readCookieMobileApp(CART_ITEM_COUNTER);
    const { loadFavoriteStore } = this.props;
    loadFavoriteStore({});

    cartValuePromise.then(res => {
      this.setState({
        cartVal: parseInt(res || 0, 10),
      });
    });
  }

  /**
   * This function validate the iconView.
   */
  validateIcon = () => {
    const { navigation, labels } = this.props;
    const { isDownIcon } = this.state;
    navigation.navigate({
      routeName: 'StoreLanding',
      params: { title: labels.lbl_header_storeDefaultTitle.toUpperCase() },
    });
    this.setState({
      isDownIcon: !isDownIcon,
    });
  };

  getStoreHours = store => {
    const hours = store && store.hours;
    const storeHours = hours && [
      ...hours.regularAndHolidayHours,
      ...hours.regularHours,
      ...hours.holidayHours,
    ];
    const todaysDate = new Date();
    let storeTime = '';
    /* eslint-disable no-unused-expressions */
    storeHours &&
      storeHours.forEach(hour => {
        const openInterval =
          hour &&
          hour.openIntervals.length > 0 &&
          hour.openIntervals[hour.openIntervals.length - 1].toHour;
        if (compareDate(todaysDate, parseDate(openInterval))) {
          storeTime = toTimeString(parseDate(openInterval), true);
        }
      });
    return storeTime;
  };

  render() {
    const { favStore, labels } = this.props;
    const { isDownIcon, cartVal } = this.state;
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
                text={favStoreTxt || headerLabels.lbl_header_storeDefaultTitle}
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

Header.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  favStore: PropTypes.shape({}),
  loadFavoriteStore: PropTypes.func,
};

Header.defaultProps = {
  favStore: {},
  loadFavoriteStore: () => null,
};

const mapStateToProps = state => {
  return {
    labels: state.Labels.global && state.Labels.global.header,
    favStore: state.User && state.User.get('defaultStore'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadFavoriteStore: payload => dispatch(getFavoriteStoreActn(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
export { Header as HeaderVanilla };
