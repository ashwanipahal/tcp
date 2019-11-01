import React from 'react';
import { View, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { RichText, Anchor } from '../../../atoms';
import { Wrapper, StyledImage, Touchable } from '../LoyaltyPromoBanner.style.native';

const crossImage = require('../../../../../../src/assets/close.png');

const cookieName = 'tcp-mobile';

const date = new Date();
const currentDateValue = date.getTime();

class LoyaltyPromoBanner extends React.PureComponent {
  /**
   * To manage the state of icons on the
   * basis of visible & hide .
   */
  constructor(props) {
    super(props);
    this.state = {
      bannerClosed: false,
      bannerVisible: false,
    };
  }

  setDate = () => {
    const daysAlive = 10;
    const expiteDateValue = date.setTime(date.getTime() + daysAlive * 24 * 60 * 60 * 1000);
    try {
      AsyncStorage.setItem(cookieName, expiteDateValue);
    } catch (error) {
      console.info('error', error);
    }
  };

  retrieveDate = () => {
    return AsyncStorage.getItem(cookieName);
  };

  isDisplay = () => {
    this.retrieveDate().then(data => {
      if (currentDateValue >= data) {
        this.setState({
          bannerVisible: true,
        });
      } else {
        this.setState({
          bannerVisible: false,
        });
      }
    });
  };

  /**
   * This function validate the iconView.
   */
  validateIcon = () => {
    const { bannerClosed } = this.state;
    this.setState({
      bannerClosed: !bannerClosed,
    });
    this.setDate();
  };

  render() {
    const {
      richTextList: [{ text, link }],
      navigation,
    } = this.props;

    this.isDisplay();

    const { bannerClosed, bannerVisible } = this.state;

    if (bannerVisible) {
      return (
        <View>
          {bannerClosed ? null : (
            <Anchor navigation={navigation} url={link.url}>
              <Wrapper>
                <RichText
                  source={{
                    html: `<html><header><meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'> </header><body>${text}</body></html>`,
                  }}
                />

                <Touchable
                  accessibilityRole="button"
                  accessibilityLabels="close"
                  onPress={this.validateIcon}
                >
                  <StyledImage source={crossImage} />
                </Touchable>
              </Wrapper>
            </Anchor>
          )}
        </View>
      );
    }
    return null;
  }
}

LoyaltyPromoBanner.propTypes = {
  richTextList: PropTypes.arrayOf(PropTypes.object),
  navigation: PropTypes.shape({}).isRequired,
};

LoyaltyPromoBanner.defaultProps = {
  richTextList: [
    {
      text: `
  <style>

.header-loyalty-banner-wrapper {
  height: 23px;
  display: flex;
  justify-content: space-between;
}

.header-loyalty-banner-wrapper__item {
  display: flex;
  align-items: center;
}

.header-loyalty-banner-wrapper__divider {
  width: 1px;
  height: 100%;
  background-color: #d8d8d8;
  margin: 0 8px;
}

.header-loyalty-banner-wrapper__text-content {
  font-family: Arial;
  font-size: 12px;
  text-align: center;
  color: #d8d8d8;
}

.content-3X {
  width: auto;
  font-size: 22px;
  font-weight: bold;
  padding: 0 8px;
}

.the-my-place-rewards {
  width: 240px;
  font-size: 10px;
  line-height: 1.04;
  text-align: left;
  padding-right: 15px;
}

.header-loyalty-banner-wrapper__img {
  height: 100%;
  margin-right: 4px;
}
.header-loyalty-banner-wrapper__img img {
  height: 100%;
}

@media (max-width: 767px) {
  .hide-on-mobile {
    display: none;
  }
}

@media (min-width: 768px) {
  .header-loyalty-banner-wrapper__divider {
    margin: 0 14px;
  }
  .the-my-place-rewards {
    width: 320px;
    font-size: 13px;
  }
  .header-loyalty-banner-wrapper__img {
    height: 23px;
    margin-right: 4px;
  }
}

@media (min-width: 1200px) {

  .header-loyalty-banner-wrapper__divider {
    margin: 0 22px;
  }
  .header-loyalty-banner-wrapper {
    height: 45px;
  }
  .header-loyalty-banner-wrapper__text-content {
    font-size: 22px;
  }

  .content-3X {
    font-size: 58px;
  }

  .the-my-place-rewards {
    width: 570px;
    font-size: 22px;
  }
  .header-loyalty-banner-wrapper__img {
    height: 44px;
    margin-right: 8px;
  }

}
  </style>


<div class="header-loyalty-banner-wrapper">
  <div class="header-loyalty-banner-wrapper__item hide-on-mobile">
    <div class="header-loyalty-banner-wrapper__text-content">
      BONUS POINTS EVENT
    </div>
  </div>

  <div class="header-loyalty-banner-wrapper__divider hide-on-mobile"></div>

  <div class="header-loyalty-banner-wrapper__item hide-on-mobile">
    <div class="header-loyalty-banner-wrapper__text-content">
      MARCH 7-APRIL 21, 2019
    </div>
  </div>
  <div class="header-loyalty-banner-wrapper__divider hide-on-mobile"></div>
  <div class="header-loyalty-banner-wrapper__item">
    <div class="header-loyalty-banner-wrapper__img">
          <img src="https://test5.childrensplace.com/image/upload//v1571658182/tcp-loyality.png" alt="Rewards">
    </div>
    <div class="header-loyalty-banner-wrapper__text-content content-3X">
        3X
  </div>
  <div class="header-loyalty-banner-wrapper__text-content the-my-place-rewards">
  THE MY PLACE REWARDS POINTS
ON ALL EASTER DRESS UP & MATCHING FAMILY STYLES
</div>

  </div>

</div>`,
      link: {
        url: 'https://test6.childrensplace.com/us/c/baby-clothe',
        text: '',
        title: '',
        external: 0,
        target: '',
        action: '<action_value>',
      },
    },
  ],
};

export default LoyaltyPromoBanner;
