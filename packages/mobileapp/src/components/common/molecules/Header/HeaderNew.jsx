import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { SearchBar } from '@tcp/core/src/components/common/molecules';
import SearchProduct from '@tcp/core/src/components/common/organisms/SearchProduct';
import InitialPropsHOC from '@tcp/core/src/components/common/hoc/InitialPropsHOC/InitialPropsHOC.native';
import { getLocator, navigateToNestedRoute } from '@tcp/core/src/utils';
import ToastContainer from '@tcp/core/src/components/common/atoms/Toast/container/Toast.container.native';
import {
  updateCartCount,
  updateCartManually,
} from '@tcp/core/src/components/common/organisms/Header/container/Header.actions';
import {
  Container,
  HeaderContainer,
  SafeAreaViewStyle,
  CartIconView,
  Touchable,
  LeftSection,
  MiddleSection,
  RightSection,
  TitleText,
  CartCountContainer,
} from './HeaderNew.style';
import { readCookieMobileApp } from '../../../../utils/utils';
import { ArrowBackIconPLP } from '../../../features/content/Navigation/molecules/NavMenuLevel2/NavMenuLevel2.style';

const cartIcon = require('../../../../assets/images/empty-bag.png');
const Icon = require('../../../../../../core/src/assets/carrot-large-left.png');

const CART_ITEM_COUNTER = 'cartItemsCount';

/**
 * This component creates Mobile Header.
 * 1. To Manage the store locator
 * 2. To Navigate the cart page & show cart quantity
 * 3. To show the welcome text for guest user
 *     and shoe the name fro register user
 */
class HeaderNew extends React.PureComponent<Props> {
  static propTypes = {
    title: PropTypes.string,
    showSearch: PropTypes.bool,
  };

  static defaultProps = {
    title: '',
    showSearch: false,
  };

  /**
   * To manage the state of icons on the
   * basis of expand & collaps .
   */
  constructor(props) {
    super(props);
    this.state = {
      showSearchModal: false,
    };
  }

  componentDidMount() {
    this.getInitialProps();
  }

  componentDidUpdate(prevProps) {
    const { isUpdateCartCount, updateCartManuallyAction } = this.props;
    if (isUpdateCartCount !== prevProps.isUpdateCartCount) {
      this.getInitialProps();
      updateCartManuallyAction(false);
    }
  }

  getInitialProps() {
    const { updateCartCountAction } = this.props;
    const cartValuePromise = readCookieMobileApp(CART_ITEM_COUNTER);
    cartValuePromise.then(res => {
      updateCartCountAction(parseInt(res || 0, 10));
    });
  }

  /**
   * @function openSearchProductPage
   * opens search product modal
   *
   * @memberof HeaderNew
   */
  openSearchProductPage = () => {
    this.setState({ showSearchModal: true });
  };

  /**
   * @function closeSearchProductPage
   * closes search product modal
   *
   * @memberof HeaderNew
   */
  closeSearchProductPage = () => {
    this.setState({ showSearchModal: false });
  };

  /**
   * @function goToSearchResultsPage
   * navigates to search results page
   *
   * @memberof HeaderNew
   */
  goToSearchResultsPage = searchText => {
    this.closeSearchProductPage();

    const { navigation } = this.props;
    navigateToNestedRoute(navigation, 'HomeStack', 'SearchDetail', {
      title: searchText,
      isForceUpdate: true,
    });
  };

  onBack = () => {
    const { navigation } = this.props;
    const goBackRoute = get(navigation, 'state.params.backTo', false);
    const isReset = get(navigation, 'state.params.reset', false);
    if (isReset) {
      navigation.pop();
    } else if (goBackRoute) {
      navigation.navigate(goBackRoute);
    } else {
      navigation.goBack(null);
    }
  };

  render() {
    const { title, showSearch, cartVal, slpLabels } = this.props;
    const { showSearchModal } = this.state;
    return (
      <SafeAreaViewStyle showSearch={showSearch}>
        <ToastContainer />
        <Container>
          <HeaderContainer data-locator={getLocator('global_headerpanel')}>
            <LeftSection>
              <TouchableOpacity
                accessible
                onPress={this.onBack}
                accessibilityRole="button"
                accessibilityLabel="back button"
              >
                <ArrowBackIconPLP source={Icon} />
              </TouchableOpacity>
            </LeftSection>

            <MiddleSection>
              <TitleText numberOfLines={1} accessibilityRole="text" accessibilityLabel={title}>
                {title}
              </TitleText>
            </MiddleSection>

            <RightSection>
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
                <CartCountContainer cartVal={cartVal}>
                  <BodyCopy
                    text={cartVal}
                    color="white"
                    fontSize="fs10"
                    data-locator={getLocator('global_headerpanelbagitemtext')}
                    accessibilityText="Mini bag with count"
                    fontWeight="extrabold"
                  />
                </CartCountContainer>
              </Touchable>
            </RightSection>
          </HeaderContainer>
          {showSearch && (
            <SearchBar openSearchProductPage={this.openSearchProductPage} labels={slpLabels} />
          )}
          {showSearchModal && (
            <SearchProduct
              closeSearchModal={this.closeSearchProductPage}
              goToSearchResultsPage={this.goToSearchResultsPage}
            />
          )}
        </Container>
      </SafeAreaViewStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartVal: state.Header && state.Header.cartItemCount,
    isUpdateCartCount: state.Header && state.Header.updateCartCount,
    slpLabels: state.Labels.Browse && state.Labels.Browse.SLP,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCartCountAction: payload => {
      dispatch(updateCartCount(payload));
    },
    updateCartManuallyAction: payload => {
      dispatch(updateCartManually(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitialPropsHOC(HeaderNew));

export { HeaderNew as HeaderNewVanilla };
