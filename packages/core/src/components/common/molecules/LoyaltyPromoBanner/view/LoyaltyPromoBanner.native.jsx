import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { RichText, Anchor } from '../../../atoms';
import { Wrapper, StyledImage, Touchable } from '../LoyaltyPromoBanner.style.native';
import { readCookie, setCookie } from '../../../../../utils/cookie.util';

const crossImage = require('../../../../../../src/assets/close.png');

class LoyaltyPromoBanner extends React.PureComponent<Props> {
  /**
   * To manage the state of icons on the
   * basis of visible & hide .
   */
  constructor(props) {
    super(props);
    this.state = {
      isDownIcon: false,
    };
  }

  /**
   * Check if required UUID cookie available else return default.
   */
  getUUID = uuidCookieString => {
    const UUID = readCookie(uuidCookieString);
    return UUID ? UUID.split(',')[0] : '-1002';
  };

  closeButtonHandler = () => {
    const currentDate = new Date();
    setCookie({
      value: currentDate.toGMTString(),
      daysAlive: 10,
    });
  };

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
    const {
      richTextList: [{ text, link }],
      navigation,
    } = this.props;

    const { isDownIcon } = this.state;

    return (
      <View>
        {isDownIcon ? null : (
          <Anchor navigation={navigation} url={link.url}>
            <Wrapper>
              <RichText source={{ html: text }} />

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
}

LoyaltyPromoBanner.propTypes = {
  richTextList: PropTypes.arrayOf(PropTypes.object),
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
        url: '/banner/url',
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
