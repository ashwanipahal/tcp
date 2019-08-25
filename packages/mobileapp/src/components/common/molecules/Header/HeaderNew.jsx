import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getLocator } from '@tcp/core/src/utils';
import CustomIcon from '@tcp/core/src/components/common/atoms/Icon';
import { ICON_NAME } from '@tcp/core/src/components/common/atoms/Icon/Icon.constants';
import {
  Container,
  RoundView,
  SafeAreaViewStyle,
  TextStyle,
  BackgroundView,
  CartIconView,
  Touchable,
  LeftSection,
  MiddleSection,
  RightSection,
  TitleText,
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
  };

  static defaultProps = {
    title: '',
  };

  /**
   * To manage the state of icons on the
   * basis of expand & collaps .
   */
  constructor(props) {
    super(props);
    this.state = {
      cartVal: 0,
    };
  }

  onBack = () => {
    const { navigation } = this.props;
    const goBackRoute = get(navigation, 'state.params.backTo', false);
    if (goBackRoute) {
      navigation.navigate(goBackRoute);
    } else {
      navigation.goBack(null);
    }
  };

  render() {
    const { title } = this.props;
    const { cartVal } = this.state;
    return (
      <SafeAreaViewStyle>
        <Container data-locator={getLocator('global_headerpanel')}>
          <LeftSection>
            <TouchableOpacity onPress={this.onBack} accessibilityRole="button">
              <CustomIcon name={ICON_NAME.chevronLeft} size={20} color="#9b9b9b" />
            </TouchableOpacity>
          </LeftSection>

          <MiddleSection>
            <TitleText numberOfLines={1}>{title}</TitleText>
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
          </RightSection>
        </Container>
      </SafeAreaViewStyle>
    );
  }
}

export default HeaderNew;
