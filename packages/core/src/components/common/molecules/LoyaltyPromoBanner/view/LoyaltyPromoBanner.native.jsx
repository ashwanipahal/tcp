import React from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import { RichText, Anchor } from '../../../atoms';
import { Wrapper, StyledImage, Touchable } from '../LoyaltyPromoBanner.style.native';

const crossImage = require('../../../../../../src/assets/close.png');

const cookieName = '@mprAboveHead_-1002:key';
const date = new Date();
const currentDateValue = date.getTime();
const daysAlive = 10;

class LoyaltyPromoBanner extends React.PureComponent {
  /**
   * To manage the state of icons on the
   * basis of visible & hide .
   */
  constructor(props) {
    super(props);
    this.state = {
      bannerClosed: false,
    };
  }

  componentDidMount() {
    this.isDisplay();
  }

  /**
   * To save the date
   */
  setDate = () => {
    const expiteDateValue = date.setTime(date.getTime() + daysAlive * 24 * 60 * 60 * 1000);
    try {
      AsyncStorage.setItem(cookieName, expiteDateValue.toString());
    } catch (error) {
      // eslint-disable-next-line rule
      console.info('error', error);
    }
  };

  /**
   * To fetch the date
   */
  retrieveDate = async () => {
    try {
      return await AsyncStorage.getItem(cookieName);
    } catch (error) {
      // Error retrieving data
      return null;
    }
  };

  /**
   * To check the visiblity of the banner
   */
  isDisplay = () => {
    this.retrieveDate().then(data => {
      if (data !== null) {
        if (currentDateValue <= parseInt(data, 10)) {
          this.setState({
            bannerClosed: true,
          });
        } else {
          this.setState({
            bannerClosed: false,
          });
        }
      }
    });
  };

  /**
   * This function validate the iconView.
   */
  validateView = () => {
    this.setDate();
    this.setState({ bannerClosed: true });
  };

  /**
   * To render the view
   */
  render() {
    const {
      richTextList: [{ richText, link }],
      navigation,
    } = this.props;

    const { bannerClosed } = this.state;

    return (
      <View>
        {bannerClosed ? (
          <View />
        ) : (
          <Anchor navigation={navigation} url={link.url}>
            <Wrapper>
              <RichText
                source={{
                  html: `<html><header><meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'> </header><body>${
                    richText.text
                  }</body></html>`,
                }}
              />
              <Touchable
                accessibilityRole="button"
                accessibilityLabels="close"
                onPress={this.validateView}
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
  navigation: PropTypes.shape({}).isRequired,
};

LoyaltyPromoBanner.defaultProps = {
  richTextList: [
    {
      richText: { text: '' },
      link: {},
    },
  ],
};

export default LoyaltyPromoBanner;
