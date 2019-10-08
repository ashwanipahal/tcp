import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { SearchBar } from '@tcp/core/src/components/common/molecules';
import SearchProduct from '@tcp/core/src/components/common/organisms/SearchProduct';

import { getLocator, navigateToNestedRoute } from '@tcp/core/src/utils';
import CustomIcon from '@tcp/core/src/components/common/atoms/Icon';
import { ICON_NAME } from '@tcp/core/src/components/common/atoms/Icon/Icon.constants';
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

const cartIcon = require('../../../../assets/images/empty-bag.png');

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
      cartVal: 0,
      showSearchModal: false,
    };
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
    navigateToNestedRoute(navigation, 'PlpStack', 'SearchDetail', {
      title: searchText,
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
    const { title, showSearch } = this.props;
    const { cartVal, showSearchModal } = this.state;
    return (
      <SafeAreaViewStyle showSearch={showSearch}>
        <Container>
          <HeaderContainer data-locator={getLocator('global_headerpanel')}>
            <LeftSection>
              <TouchableOpacity
                accessible
                onPress={this.onBack}
                accessibilityRole="button"
                accessibilityLabel="back button"
              >
                <CustomIcon name={ICON_NAME.chevronLeft} size="fs20" color="gray.600" />
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
                <CartCountContainer>
                  <BodyCopy
                    text={cartVal}
                    color="white"
                    fontSize="fs10"
                    data-locator={getLocator('global_headerpanelbagitemtext')}
                    accessibilityText="Mini bag with count"
                  />
                </CartCountContainer>
              </Touchable>
            </RightSection>
          </HeaderContainer>
          {showSearch && <SearchBar openSearchProductPage={this.openSearchProductPage} />}
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

export default HeaderNew;
