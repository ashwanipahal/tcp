import React, { PureComponent } from 'react';
import { View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import MyPlaceRewardsOverviewTile from '@tcp/core/src/components/features/account/common/organism/MyPlaceRewardsOverviewTile';
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

import {
  LogoutWrapper,
  LoggedinWrapper,
  LoggedinTextWrapper,
} from '../../Logout/styles/LoginOut.style.native';

import CreateAccount from '../../CreateAccount';
import LoginPageContainer from '../../LoginPage';
import ProfileInfoContainer from '../../common/organism/ProfileInfoTile';

class AccountOverview extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      getComponentId: {
        login: '',
        createAccount: '',
      },
    };
  }

  renderComponent = ({ navigation, getComponentId, isUserLoggedIn }) => {
    return (
      <React.Fragment>
        {getComponentId.login ? (
          <LoginPageContainer
            onRequestClose={this.toggleModal}
            navigation={navigation}
            isUserLoggedIn={isUserLoggedIn}
          />
        ) : (
          <CreateAccount navigation={navigation} onRequestClose={this.toggleModal} />
        )}
      </React.Fragment>
    );
  };

  toggleModal = ({ getComponentId }) => {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal,
      getComponentId: getComponentId
        ? {
            login: getComponentId.login,
            createAccount: getComponentId.createAccount,
          }
        : '',
    });
  };

  render() {
    const viewContainerStyle = { marginTop: 15 };
    const colorPallete = createThemeColorPalette();
    const { isUserLoggedIn, labels, handleComponentChange, navigation } = this.props;
    const { showModal, getComponentId } = this.state;
    return (
      <View style={viewContainerStyle}>
        {isUserLoggedIn && (
          <React.Fragment>
            <Panel title={labels.lbl_overview_myPlaceRewardsHeading}>
              <MyPlaceRewardsOverviewTile labels={labels} handleComponentChange={handleComponentChange} />
            </Panel>
            <Panel title={labels.lbl_overview_myWalletHeading} />
            <Panel title={labels.lbl_overview_earnPointsHeading} />
            <Panel title={labels.lbl_overview_ordersHeading} />
            <Panel title={labels.lbl_overview_profileInformationHeading}>
              <ProfileInfoContainer labels={labels} handleComponentChange={handleComponentChange} />
            </Panel>
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
            <LoggedinTextWrapper>
              <BodyCopy
                mobileFontFamily={['primary']}
                fontSize="fs14"
                textAlign="center"
                text={labels.lbl_overview_logout_heading_Text_1}
              />
              <BodyCopy
                mobileFontFamily={['primary']}
                fontSize="fs14"
                textAlign="center"
                text={labels.lbl_overview_logout_heading_Text_2}
              />
            </LoggedinTextWrapper>
            <LoggedinWrapper>
              <CustomButton
                className="classBtn"
                color={colorPallete.text.secondary}
                fill="WHITE"
                id="createAccount"
                type="submit"
                width="150px"
                buttonVariation="variable-width"
                data-locator=""
                text={labels.lbl_overview_join_text}
                onPress={e =>
                  this.toggleModal({
                    e,
                    getComponentId: { login: false, createAccount: true },
                  })
                }
              />

              <CustomButton
                color={colorPallete.white}
                className="classBtn"
                fill="BLUE"
                id="login"
                type="submit"
                buttonVariation="variable-width"
                data-locator=""
                width="150px"
                text={labels.lbl_overview_login_text}
                onPress={e =>
                  this.toggleModal({
                    e,
                    getComponentId: { login: true, createAccount: false },
                  })
                }
              />
            </LoggedinWrapper>
            {showModal && (
              <ModalNative isOpen={showModal} onRequestClose={this.toggleModal}>
                <ModalHeading>
                  <BodyCopy
                    mobileFontFamily={['secondary']}
                    fontWeight="extrabold"
                    fontSize="fs16"
                    text={
                      getComponentId.login
                        ? `${labels.lbl_overview_login_text}`
                        : `${labels.lbl_overview_createAccount}`
                    }
                  />
                </ModalHeading>
                <LineWrapper>
                  <LineComp marginTop={5} borderWidth={2} borderColor="black" />
                </LineWrapper>
                <SafeAreaView>
                  <ModalViewWrapper>
                    {this.renderComponent({
                      navigation,
                      getComponentId,
                      isUserLoggedIn,
                    })}
                  </ModalViewWrapper>
                </SafeAreaView>
              </ModalNative>
            )}

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

        <LogoutWrapper>{isUserLoggedIn && <LogOutPageContainer labels={labels} />}</LogoutWrapper>
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
