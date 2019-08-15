import React, { PureComponent } from 'react';
import { View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import Panel from '../../../../common/molecules/Panel';
import PaymentTile from '../../common/organism/PaymentTile';
import CustomButton from '../../../../common/atoms/Button';
import AddressOverviewTile from '../../common/organism/AddressOverviewTile';
import UnderlineStyle from '../styles/AccountOverview.style.native';
import LogOutPageContainer from '../../Logout/container/LogOut.container';
import ModalNative from '../../../../common/molecules/Modal';
import LineComp from '../../../../common/atoms/Line';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import {
  ModalHeading,
  ModalViewWrapper,
  LineWrapper,
} from '../../LoginPage/molecules/LoginForm/LoginForm.style.native';
import CreateAccount from '../../CreateAccount';

class AccountOverview extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal,
    });
  };

  render() {
    const viewContainerStyle = { marginTop: 15 };
    const colorPallete = createThemeColorPalette();
    const { isUserLoggedIn, labels, handleComponentChange, navigation } = this.props;
    const { showModal } = this.state;
    return (
      <View style={viewContainerStyle}>
        <CustomButton
          color={colorPallete.text.secondary}
          fill="WHITE"
          type="submit"
          buttonVariation="variable-width"
          data-locator=""
          text="CREATE ACCOUNT"
          onPress={this.toggleModal}
        />
        {showModal && (
          <ModalNative isOpen={showModal} onRequestClose={this.toggleModal}>
            <ModalHeading>
              <BodyCopy
                mobileFontFamily={['secondary']}
                fontWeight="extrabold"
                fontSize="fs16"
                text="CREATE ACCOUNT"
              />
            </ModalHeading>
            <LineWrapper>
              <LineComp marginTop={5} borderWidth={2} borderColor="black" />
            </LineWrapper>
            <SafeAreaView>
              <ModalViewWrapper>
                <CreateAccount navigation={navigation} onRequestClose={this.toggleModal} />
              </ModalViewWrapper>
            </SafeAreaView>
          </ModalNative>
        )}
        {isUserLoggedIn && (
          <React.Fragment>
            <Panel title={labels.lbl_overview_myPlaceRewardsHeading} />
            <Panel title={labels.lbl_overview_myWalletHeading} />
            <Panel title={labels.lbl_overview_earnPointsHeading} />
            <Panel title={labels.lbl_overview_ordersHeading} />
            <Panel title={labels.lbl_overview_profileInformationHeading} />
            <Panel title={labels.lbl_overview_addressBookHeading}>
              <AddressOverviewTile labels={labels} handleComponentChange={handleComponentChange} />
            </Panel>
            <Panel title={labels.lbl_overview_paymentHeading}>
              <PaymentTile labels={labels} handleComponentChange={handleComponentChange} />
            </Panel>
            <Panel title={labels.lbl_overview_myPreferencesHeading} />
            <Panel title={labels.lbl_overview_myPlaceRewardsCardHeading} />
          </React.Fragment>
        )}
        {!isUserLoggedIn && (
          <React.Fragment>
            <Panel title={labels.lbl_overview_myFavoritesHeading} isFavorite isVariationTypeLink />

            <UnderlineStyle />

            <Panel
              title={labels.lbl_overview_apply_today}
              isVariationTypeLink
              handleComponentChange={handleComponentChange}
              isCardApply
            />
            <Panel title={labels.lbl_overview_manage_creditCard} isVariationTypeLink />

            <UnderlineStyle />

            <Panel title={labels.lbl_overview_purchase_giftCards} isVariationTypeLink />
            <Panel title={labels.lbl_overview_refer_friend} isVariationTypeLink />

            <UnderlineStyle />

            <Panel title={labels.lbl_overview_app_settings} isVariationTypeLink />
            <Panel title={labels.lbl_overview_help} isVariationTypeLink />
            <Panel title={labels.lbl_overview_messages} isVariationTypeLink />
          </React.Fragment>
        )}

        {isUserLoggedIn && <LogOutPageContainer labels={labels} />}
        <UnderlineStyle />
      </View>
    );
  }
}

AccountOverview.propTypes = {
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  handleComponentChange: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
};

export default AccountOverview;
