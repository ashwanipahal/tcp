import React, { PureComponent } from 'react';
import { View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import TrackOrderContainer from '@tcp/core/src/components/features/account/TrackOrder';
import MyPlaceRewardsOverviewTile from '@tcp/core/src/components/features/account/common/organism/MyPlaceRewardsOverviewTile';
import MyWalletTile from '@tcp/core/src/components/features/account/common/organism/MyWalletTile';
import Panel from '../../../../common/molecules/Panel';
import PaymentTile from '../../common/organism/PaymentTile';
import CustomButton from '../../../../common/atoms/Button';
import AddressOverviewTile from '../../common/organism/AddressOverviewTile';
import { UnderlineStyle, ImageWrapper, FavtWrapper } from '../styles/AccountOverview.style.native';
import LogOutPageContainer from '../../Logout/container/LogOut.container';
import ModalNative from '../../../../common/molecules/Modal';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import { ModalViewWrapper } from '../../LoginPage/molecules/LoginForm/LoginForm.style.native';

import {
  LogoutWrapper,
  LoggedinWrapper,
  LoggedinTextWrapper,
} from '../../Logout/styles/LoginOut.style.native';
import ImageComp from '../../../../common/atoms/Image';
import CreateAccount from '../../CreateAccount';
import LoginPageContainer from '../../LoginPage';
import ProfileInfoContainer from '../../common/organism/ProfileInfoTile';

const favIcon = require('../../../../../../../mobileapp/src/assets/images/filled-heart.png');

class AccountOverview extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      getComponentId: {
        login: '',
        createAccount: '',
        favorites: '',
      },
    };
  }

  renderComponent = ({ navigation, getComponentId, isUserLoggedIn }) => {
    let componentContainer = null;
    if (getComponentId.login || getComponentId.favorites) {
      componentContainer = (
        <LoginPageContainer
          onRequestClose={this.toggleModal}
          navigation={navigation}
          isUserLoggedIn={isUserLoggedIn}
          variation={getComponentId.favorites && 'favorites'}
          showLogin={this.showloginModal}
          showCheckoutModal={this.showCheckoutModal}
        />
      );
    }
    if (getComponentId.createAccount) {
      componentContainer = (
        <CreateAccount
          showCheckoutModal={this.showCheckoutModal}
          showLogin={this.showloginModal}
          navigation={navigation}
          onRequestClose={this.toggleModal}
        />
      );
    }
    return <React.Fragment>{componentContainer}</React.Fragment>;
  };

  showloginModal = () => {
    this.setState({
      getComponentId: {
        login: true,
      },
    });
  };

  showCheckoutModal = () => {
    this.setState({
      getComponentId: {
        createAccount: true,
      },
    });
  };

  toggleModal = ({ getComponentId }) => {
    this.setState(state => ({
      showModal: !state.showModal,
      getComponentId: getComponentId
        ? {
            login: getComponentId.login,
            createAccount: getComponentId.createAccount,
            favorites: getComponentId.favorites,
          }
        : '',
    }));
  };

  showTrackOrderModal = () => {
    const { openTrackOrder } = this.props;
    openTrackOrder({ state: true });
  };

  getModalHeader = (getComponentId, labels) => {
    let header = null;
    if (getComponentId.login || getComponentId.favorites) {
      header = labels.lbl_overview_login_text;
    }
    if (getComponentId.createAccount) {
      header = labels.lbl_overview_createAccount;
    }
    return header;
  };

  render() {
    const { isUserLoggedIn, labels, commonLabels, handleComponentChange, navigation } = this.props;
    const { showModal, getComponentId } = this.state;
    const modalHeaderLbl = this.getModalHeader(getComponentId, labels);
    const viewContainerStyle = { marginTop: 15 };
    const colorPallete = createThemeColorPalette();

    return (
      <View style={viewContainerStyle}>
        {isUserLoggedIn && (
          <React.Fragment>
            <Panel title={labels.lbl_overview_myPlaceRewardsHeading}>
              <MyPlaceRewardsOverviewTile
                labels={labels}
                commonLabels={commonLabels}
                handleComponentChange={handleComponentChange}
              />
            </Panel>
            <Panel title={labels.lbl_overview_myWalletHeading}>
              <MyWalletTile
                labels={labels}
                commonLabels={commonLabels}
                handleComponentChange={handleComponentChange}
              />
            </Panel>
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
                id="createAccount"
                type="submit"
                width="150px"
                buttonVariation="variable-width"
                data-locator=""
                text={labels.lbl_overview_join_text}
                onPress={e =>
                  this.toggleModal({
                    e,
                    getComponentId: {
                      login: false,
                      createAccount: true,
                      favorites: false,
                    },
                  })
                }
              />

              <CustomButton
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
                    getComponentId: {
                      login: true,
                      createAccount: false,
                      favorites: false,
                    },
                  })
                }
              />
            </LoggedinWrapper>

            {showModal && (
              <ModalNative
                isOpen={showModal}
                onRequestClose={this.toggleModal}
                heading={modalHeaderLbl}
                headingFontFamily="secondary"
                fontSize="fs16"
              >
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
            <FavtWrapper>
              <BodyCopy
                color="gray.900"
                mobileFontFamily={['primary']}
                fontSize="fs13"
                textAlign="left"
                fontWeight="semibold"
                text={labels.lbl_overview_myFavoritesHeading}
                onPress={e =>
                  this.toggleModal({
                    e,
                    getComponentId: { favorites: true },
                  })
                }
              />
              <ImageWrapper>
                <ImageComp source={favIcon} width={20} height={18} />
              </ImageWrapper>
            </FavtWrapper>
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
            <Panel
              title={labels.lbl_overview_trackYourOrder}
              isVariationTypeLink
              handleComponentChange={this.showTrackOrderModal}
            />
            <UnderlineStyle />
            <Panel title={labels.lbl_overview_app_settings} isVariationTypeLink />
            <Panel title={labels.lbl_overview_help} isVariationTypeLink />
            <Panel title={labels.lbl_overview_messages} isVariationTypeLink />
          </React.Fragment>
        )}

        <LogoutWrapper>{isUserLoggedIn && <LogOutPageContainer labels={labels} />}</LogoutWrapper>
        <TrackOrderContainer handleToggle={this.toggleModal} navigation={navigation} />
        <UnderlineStyle />
      </View>
    );
  }
}

AccountOverview.propTypes = {
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  handleComponentChange: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  commonLabels: PropTypes.shape({}),
};

AccountOverview.defaultProps = {
  labels: {
    lbl_overview_messages: '',
    lbl_overview_help: '',
    lbl_overview_app_settings: '',
    lbl_overview_refer_friend: '',
    lbl_overview_purchase_giftCards: '',
    lbl_overview_manage_creditCard: '',
    lbl_overview_apply_today: '',
    lbl_overview_myFavoritesHeading: '',
    lbl_overview_createAccount: '',
    lbl_overview_login_text: '',
    lbl_overview_join_text: '',
    lbl_overview_logout_heading_Text_2: '',
    lbl_overview_logout_heading_Text_1: '',
    lbl_overview_myPlaceRewardsCardHeading: '',
    lbl_overview_myPreferencesHeading: '',
    lbl_overview_paymentHeading: '',
    lbl_overview_addressBookHeading: '',
    lbl_overview_profileInformationHeading: '',
    lbl_overview_ordersHeading: '',
    lbl_overview_earnPointsHeading: '',
    lbl_overview_myWalletHeading: '',
    lbl_overview_myPlaceRewardsHeading: '',
  },
  commonLabels: {},
};

export default AccountOverview;
