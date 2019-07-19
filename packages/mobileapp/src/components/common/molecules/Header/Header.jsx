import React from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getLocator } from '@tcp/core/src/utils/utils.native';
import {
  Wrapper,
  HorizontalView,
  VerticalLeftView,
  VerticalRightView,
  Icon,
  RoundView,
} from './Header.style';

// @flow
type Props = {
  labels: object,
};

/**
 * This component creates Mobile Header
 * @param {*} props Props passed from Header screen
 */

const downIcon = require('../../../../assets/images/carrot-small-down.png');
const upIcon = require('../../../../assets/images/carrot-small-up.png');
const cartIcon = require('../../../../assets/images/empty-bag.png');

const textStyle = { position: 'absolute', marginTop: 18, paddingRight: 5 };
const imageColor = { tintColor: 'grey' };
const wrapperStyle = { marginTop: Platform.OS === 'ios' ? 50 : 0 };

class Header extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isIconIn: false,
    };
  }

  validateIcon = () => {
    const { isIconIn } = this.state;
    this.setState({
      isIconIn: !isIconIn,
    });
  };

  render() {
    const { isIconIn } = this.state;
    let headerLabels = {
      storeTitle: 'Find the store',
      headerTitle: 'Welcome',
    };
    const { labels } = this.props;
    if (labels) {
      headerLabels = labels;
    }

    return (
      <Wrapper style={wrapperStyle} data-locator={getLocator('global_headerpanel')}>
        <VerticalLeftView>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs14"
            textAlign="center"
            color="black"
            fontWeight="semibold"
            text={headerLabels.headerTitle}
            data-locator={getLocator('global_headerpanelwelcometext')}
          />
          <HorizontalView onPress={this.validateIcon}>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs12"
              textAlign="center"
              color="text.primary"
              fontWeight="regular"
              text={headerLabels.storeTitle}
              data-locator={getLocator('global_findastoretext')}
            />
            {isIconIn ? (
              <Icon
                source={upIcon}
                style={imageColor}
                data-locator={getLocator('global_headerpanelexpandedicon')}
              />
            ) : (
              <Icon
                source={downIcon}
                style={imageColor}
                data-locator={getLocator('global_headerpanelcollapsedicon')}
              />
            )}
          </HorizontalView>
        </VerticalLeftView>
        <VerticalRightView data-locator={getLocator('')}>
          <Icon
            source={cartIcon}
            width="32px"
            height="32px"
            data-locator={getLocator('global_headerpanelbagicon')}
          />
          <RoundView
            color="white"
            width="22px"
            height="22px"
            borderRadius={11}
            style={imageColor}
          />
          <RoundView color="TCP" />
          <BodyCopy
            text="0"
            color="white"
            style={textStyle}
            fontSize="fs10"
            data-locator={getLocator('global_headerpanelbagitemtext')}
          />
        </VerticalRightView>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    labels: state.Labels.MobileApp && state.Labels.MobileApp.Header,
  };
};

export default connect(mapStateToProps)(Header);
export { Header as HeaderVanilla };
