import React, { PureComponent } from 'react';
import { View, Platform, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import Barcode from '@tcp/core/src/components/common/molecules/Barcode';
import { CouponHeading, BarWrapper, buttonStyle } from '../styles/AccountNumber.style.native';
import CustomIcon from '../../../../../../common/atoms/Icon';
import { ICON_NAME } from '../../../../../../common/atoms/Icon/Icon.constants';
import CustomButton from '../../../../../../common/atoms/Button';

const colorPallete = createThemeColorPalette();

/**
 * This Component return the account number
 */
class AccountNumber extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toggleArrowDown: true,
    };
  }

  toggleArrowDownState = () => {
    const { toggleArrowDown } = this.state;
    this.setState({
      toggleArrowDown: !toggleArrowDown,
    });
  };

  addToWalletHandler = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  render() {
    // const { myPlaceNumber } = this.props;
    const myPlaceNumber = '34234324324';
    const { toggleArrowDown } = this.state;
    return (
      <View>
        <ViewWithSpacing spacingStyles="margin-bottom-LRG margin-top-LRG">
          <CouponHeading>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs16"
              fontWeight="black"
              text="Show My Account Number"
            />
            <CustomIcon
              name={toggleArrowDown ? ICON_NAME.chevronDown : ICON_NAME.chevronUp}
              size="fs10"
              color="gray.900"
              isButton
              onPress={() => this.toggleArrowDownState()}
            />
            {!toggleArrowDown && (
              <>
                <BarWrapper>
                  <Barcode value={myPlaceNumber} height="50" />
                </BarWrapper>
                <CustomButton
                  color={colorPallete.white}
                  fill="BLUE"
                  text={Platform.OS === 'ios' ? 'ADD TO APPLE WALLET' : 'ADD TO GOOGLE PLAY'}
                  customStyle={buttonStyle}
                  onPress={() =>
                    this.addToWalletHandler(
                      'https://mp.vibescm.com/p/s5i4q0?unique_identifier=9ebcd5fc-4311-4963-83cc-27c0928deb7b'
                    )
                  }
                />
              </>
            )}
          </CouponHeading>
        </ViewWithSpacing>
      </View>
    );
  }
}

AccountNumber.propTypes = {
  labels: PropTypes.shape({}),
  commonLabels: PropTypes.shape({}),
  myPlaceNumber: PropTypes.string,
};

AccountNumber.defaultProps = {
  labels: {},
  commonLabels: {},
  myPlaceNumber: '',
};

export default AccountNumber;
