import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { PropTypes } from 'prop-types';
import { Image } from '@tcp/core/src/components/common/atoms';
import { isGymboree, getLabelValue } from '@tcp/core/src/utils';

import { Container, TCPIcon, GymIcon, styles } from './AnimatedBrandChangeIcon.style';
import { APP_TYPE } from '../../hoc/ThemeWrapper.constants';
import icons from '../../../../utils/icons';

const BrandSwitchConfig = {
  MAX_X: 90,
  AnimationDuration: 200,
};

/**
 * kindly use this component only for the bottom tab at the center of the tab
 *
 */
class AnimatedBrandChangeIcon extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = { openSwitch: true };
    this.brandTCPAnimatedValue = new Animated.ValueXY();
    this.brandGymAnimatedValue = new Animated.ValueXY();

    this.showBrands();
  }

  /**
   * To change the state of position of logos before and
   * after the animation it behaves like a toggle.
   */
  changePosition = () => {
    const { openSwitch } = this.state;
    this.setState(
      {
        openSwitch: !openSwitch,
      },
      () => {
        if (!openSwitch) {
          this.showBrands();
        } else {
          this.hideBrands();
          const { toggleBrandAction } = this.props;
          if (toggleBrandAction) toggleBrandAction();
        }
      }
    );
  };

  /**
   * @function showBrands
   * This method shows brands animatedly
   *
   * @memberof AnimatedBrandChangeIcon
   */
  showBrands = () => {
    Animated.parallel([
      Animated.timing(this.brandTCPAnimatedValue, {
        toValue: { x: -BrandSwitchConfig.MAX_X, y: 0 },
        duration: BrandSwitchConfig.AnimationDuration,
      }),
      Animated.timing(this.brandGymAnimatedValue, {
        toValue: { x: BrandSwitchConfig.MAX_X, y: 0 },
        duration: BrandSwitchConfig.AnimationDuration,
      }),
    ]).start();
  };

  /**
   * @function hideBrands
   * This method hides brands and sends them to their original position
   *
   * @memberof AnimatedBrandChangeIcon
   */
  hideBrands = () => {
    Animated.parallel([
      Animated.timing(this.brandTCPAnimatedValue, {
        toValue: { x: 0, y: 0 },
        duration: 0,
      }),
      Animated.timing(this.brandGymAnimatedValue, {
        toValue: { x: 0, y: 0 },
        duration: 0,
      }),
    ]).start();
  };

  /**
   * @function switchToTCP
   * This function switches current app type to tcp
   *
   * @memberof AnimatedBrandChangeIcon
   */
  switchToTCP = () => {
    this.switchToBrand(APP_TYPE.TCP);
  };

  /**
   * @function switchToGymboree
   * This function switches current app type to tcp
   *
   * @memberof AnimatedBrandChangeIcon
   */
  switchToGymboree = () => {
    this.switchToBrand(APP_TYPE.GYMBOREE);
  };

  /**
   * @function switchToGymboree
   * This function switches the app to input brand
   * @param brand
   *
   * @memberof AnimatedBrandChangeIcon
   */
  switchToBrand = brand => {
    const { updateAppTypeHandler } = this.props;
    if (updateAppTypeHandler) updateAppTypeHandler(brand);
    this.changePosition();
  };

  /**
   * @function renderTCPBrand
   * returns view for tcp brand switch
   *
   * @memberof AnimatedBrandChangeIcon
   */
  renderTCPBrand = source => {
    const { brandContainer } = styles;
    const { labels } = this.props;
    const theChildrensplace = getLabelValue(labels, 'theChildrensplace');
    return (
      <Animated.View
        style={[
          brandContainer,
          {
            transform: this.brandTCPAnimatedValue.getTranslateTransform(),
          },
        ]}
      >
        <TCPIcon
          accessibilityLabel={theChildrensplace}
          accessibilityTraits="none"
          accessibilityComponentType="none"
          onPress={this.switchToTCP}
          name="tcpBrand"
        >
          <Image source={source} alt="The Children's Place" />
        </TCPIcon>
      </Animated.View>
    );
  };

  /**
   * @function renderGymboreeBrand
   * returns view for gymboree brand switch
   *
   * @memberof AnimatedBrandChangeIcon
   */
  renderGymboreeBrand = source => {
    const { brandContainer } = styles;
    const { labels } = this.props;
    const gymboreeLink = getLabelValue(labels, 'gymboreeLink');
    return (
      <Animated.View
        style={[
          brandContainer,
          {
            transform: this.brandGymAnimatedValue.getTranslateTransform(),
          },
        ]}
      >
        <GymIcon
          accessibilityLabel={gymboreeLink}
          accessibilityTraits="none"
          accessibilityComponentType="none"
          onPress={this.switchToGymboree}
          name="gymboreeBrand"
        >
          <Image source={source} alt="Gymboree" />
        </GymIcon>
      </Animated.View>
    );
  };

  /**
   * @function renderFirstBrand
   * returns first brand as tcp for gymboree app type and vice-versa
   * this brand appears above second brand
   *
   * @memberof AnimatedBrandChangeIcon
   */
  renderFirstBrand = () => {
    if (isGymboree()) {
      const source = icons.gymboree.peekABooActive;
      return this.renderGymboreeBrand(source);
    }
    const source = icons.tcp.peekABooActive;
    return this.renderTCPBrand(source);
  };

  /**
   * @function renderSecondBrand
   * returns first brand as tcp for gymboree app type and vice-versa
   * this brand appears below first brand
   *
   * @memberof AnimatedBrandChangeIcon
   */
  renderSecondBrand = () => {
    if (isGymboree()) {
      const source = icons.tcp.peekABoo;

      return this.renderTCPBrand(source);
    }
    const source = icons.gymboree.peekABoo;
    return this.renderGymboreeBrand(source);
  };

  /**
   * render
   * renders main view
   *
   * @returns
   * @memberof AnimatedBrandChangeIcon
   */
  render() {
    return (
      <Container
        onPress={this.changePosition}
        accessibilityTraits="none"
        accessibilityComponentType="none"
        accessibilityLabel="switchBrand"
      >
        {this.renderFirstBrand()}
        {this.renderSecondBrand()}
      </Container>
    );
  }
}

/* Prop types declaration */
AnimatedBrandChangeIcon.propTypes = {
  updateAppTypeHandler: PropTypes.func,
  toggleBrandAction: PropTypes.func,
};

AnimatedBrandChangeIcon.defaultProps = {
  updateAppTypeHandler: null,
  toggleBrandAction: null,
};

export default AnimatedBrandChangeIcon;
