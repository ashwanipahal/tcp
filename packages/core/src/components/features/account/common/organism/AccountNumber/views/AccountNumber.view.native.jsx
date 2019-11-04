import React, { PureComponent } from 'react';
import { View, Platform, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import {
  ViewWithSpacing,
  BodyCopyWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';
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
    const { myPlaceNumber, labels } = this.props;
    const { toggleArrowDown } = this.state;
    const url =
      'https://mp.vibescm.com/p/s5i4q0?unique_identifier=9ebcd5fc-4311-4963-83cc-27c0928deb7b';

    return (
      <View>
        <ViewWithSpacing spacingStyles="margin-bottom-LRG margin-top-XS">
          <CouponHeading>
            <BodyCopyWithSpacing
              fontFamily="secondary"
              fontSize="fs16"
              fontWeight="black"
              text={
                toggleArrowDown
                  ? getLabelValue(labels, 'lbl_overview_show_account_number')
                  : getLabelValue(labels, 'lbl_overview_hide_account_number')
              }
              spacingStyles="margin-bottom-XS"
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
                  text={
                    Platform.OS === 'ios'
                      ? getLabelValue(labels, 'lbl_overview_add_to_apple_wallet')
                      : getLabelValue(labels, 'lbl_overview_add_to_google_pay')
                  }
                  customStyle={buttonStyle}
                  onPress={() => this.addToWalletHandler(url)}
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
  myPlaceNumber: PropTypes.string,
};

AccountNumber.defaultProps = {
  labels: {},
  myPlaceNumber: '',
};

export default AccountNumber;
