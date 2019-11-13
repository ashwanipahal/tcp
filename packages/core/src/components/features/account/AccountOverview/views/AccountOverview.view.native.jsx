/* eslint-disable max-lines */
import React, { PureComponent } from 'react';
import { View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import MyPlaceRewardsOverviewTile from '@tcp/core/src/components/features/account/common/organism/MyPlaceRewardsOverviewTile';
import MyWalletTile from '@tcp/core/src/components/features/account/common/organism/MyWalletTile';
import EarnExtraPointsOverview from '@tcp/core/src/components/features/account/common/organism/EarnExtraPointsOverview';
import { getLabelValue } from '@tcp/core/src/utils';
import AsyncStorage from '@react-native-community/async-storage';
import CookieManager from 'react-native-cookies';
import Panel from '../../../../common/molecules/Panel';
import PaymentTile from '../../common/organism/PaymentTile';
import MyPlaceRewardsCreditCard from '../../common/organism/MyPlaceRewardsCreditCard';
import CustomButton from '../../../../common/atoms/Button';
import AddressOverviewTile from '../../common/organism/AddressOverviewTile';
import OrdersTile from '../../common/organism/OrdersTile';
import MyPreferencesTile from '../../common/organism/MyPreferencesTile';
import {
  UnderlineStyle,
  FavtWrapper,
  FavoritesWrapper,
  TextWrapper,
  TouchabelContainer,
  ImageContainer,
  RightArrowImageContainer,
  StyledImage,
  FavImageWrapper,
} from '../styles/AccountOverview.style.native';
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
import CustomIcon from '../../../../common/atoms/Icon';
import { ICON_NAME, ICON_FONT_CLASS } from '../../../../common/atoms/Icon/Icon.constants';
import OrderNotification from '../../OrderNotification';

const favIcon = require('../../../../../../../mobileapp/src/assets/images/filled-heart.png');
const cardIcon = require('../../../../../../../mobileapp/src/assets/images/tcp-cc.png');
const rightIcon = require('../../../../../../../mobileapp/src/assets/images/carrot-small-right-gray.png');

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
      horizontalBar: true,
      modalHeaderLbl: ' ',
      changePassword: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isUserLoggedIn && state.showModal) {
      return { showModal: false };
    }
    return null;
  }

  componentDidMount() {
    const { changePassword } = this.state;
    if (!changePassword) this.navigateToChangePassword();
  }

  componentDidUpdate(prevPops) {
    const { changePassword } = this.state;
    if (!changePassword) this.navigateToChangePassword();

    const { isUserLoggedIn } = this.props;
    if (prevPops.isUserLoggedIn !== isUserLoggedIn && isUserLoggedIn && Platform.OS === 'ios')
      // save cookies in the async storage for ios
      CookieManager.getAll().then(res => {
        Object.keys(res).forEach(key => {
          if (key.startsWith('WC_')) {
            AsyncStorage.setItem(key, res[key].value);
          }
        });
      });
  }

  navigateToChangePassword = () => {
    const { labels, navigation } = this.props;
    const { showModal } = this.state;
    if (!isEmpty(labels) && navigation) {
      const {
        state: { params },
      } = navigation;
      if (params) {
        const { component } = params;

        if (component && component === 'change-password') {
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({ changePassword: true });
          if (showModal) {
            // if login modal is already opened
            this.setState({ showModal: false });
          }
          // using set timeout as labels doesn't load sometime just after opening app
          this.toggleModal({
            getComponentId: {
              login: true,
              createAccount: false,
              favorites: false,
            },
          });
        }
      }
    }
  };

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
          updateHeader={this.updateHeader}
          resetChangePasswordState={this.resetChangePasswordState}
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

  toggleApplyNowModal = () => {
    const { navigation, openApplyNowModal } = this.props;
    navigation.navigate('ApplyNow');
    openApplyNowModal({ isModalOpen: true });
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

  resetAccountOverViewState = () => {
    this.setState({
      showModal: false,
      getComponentId: {
        login: '',
        createAccount: '',
        favorites: '',
      },
    });
  };

  showTrackOrderModal = () => {
    const { navigation } = this.props;
    navigation.navigate('TrackOrder', {
      handleToggle: this.toggleModal,
      noHeader: true,
    });
  };

  getModalHeader = (getComponentId, labels) => {
    let header = ' ';
    if (getComponentId.login || getComponentId.favorites) {
      header = getLabelValue(labels, 'lbl_overview_login_text');
      this.setState({
        horizontalBar: true,
      });
    }
    if (getComponentId.createAccount) {
      header = getLabelValue(labels, 'lbl_overview_createAccount');
      this.setState({
        horizontalBar: true,
      });
    }
    this.setState({ modalHeaderLbl: header });
  };

  updateHeader = () => {
    this.setState({
      modalHeaderLbl: ' ',
      horizontalBar: false,
    });
  };

  resetChangePasswordState = () => {
    this.setState({
      changePassword: false,
    });
  };

  render() {
    const { isUserLoggedIn, labels, commonLabels, handleComponentChange, navigation } = this.props;
    const { showModal, getComponentId, modalHeaderLbl, horizontalBar } = this.state;
    this.getModalHeader(getComponentId, labels);
    const viewContainerStyle = { marginTop: 15 };
    const colorPallete = createThemeColorPalette();

    return (
      <View style={viewContainerStyle}>
        {isUserLoggedIn && (
          <React.Fragment>
            <OrderNotification />
            <Panel title={getLabelValue(labels, 'lbl_overview_myPlaceRewardsHeading')}>
              <MyPlaceRewardsOverviewTile
                labels={labels}
                commonLabels={commonLabels}
                handleComponentChange={handleComponentChange}
              />
            </Panel>

            <Panel title={getLabelValue(labels, 'lbl_overview_myWalletHeading')}>
              <MyWalletTile
                labels={labels}
                commonLabels={commonLabels}
                handleComponentChange={handleComponentChange}
              />
            </Panel>
            <Panel title={getLabelValue(labels, 'lbl_overview_earnPointsHeading')}>
              <EarnExtraPointsOverview handleComponentChange={handleComponentChange} />
            </Panel>
            <Panel title={getLabelValue(labels, 'lbl_overview_ordersHeading')}>
              <OrdersTile
                labels={labels}
                navigation={navigation}
                handleComponentChange={handleComponentChange}
              />
            </Panel>
            <Panel title={getLabelValue(labels, 'lbl_overview_addressBookHeading')}>
              <AddressOverviewTile labels={labels} handleComponentChange={handleComponentChange} />
            </Panel>
            <Panel title={getLabelValue(labels, 'lbl_overview_profileInformationHeading')}>
              <ProfileInfoContainer labels={labels} handleComponentChange={handleComponentChange} />
            </Panel>
            <Panel title={getLabelValue(labels, 'lbl_overview_paymentHeading')}>
              <PaymentTile labels={labels} handleComponentChange={handleComponentChange} />
            </Panel>
            <Panel title={getLabelValue(labels, 'lbl_overview_myPreferencesHeading')}>
              <MyPreferencesTile labels={labels} handleComponentChange={handleComponentChange} />
            </Panel>
            <Panel title={getLabelValue(labels, 'lbl_overview_myPlaceRewardsCardHeading')}>
              <MyPlaceRewardsCreditCard
                labels={labels}
                handleComponentChange={handleComponentChange}
              />
            </Panel>
          </React.Fragment>
        )}
        {!isUserLoggedIn && (
          <React.Fragment>
            <LoggedinTextWrapper>
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs14"
                textAlign="center"
                text={getLabelValue(labels, 'lbl_overview_logout_heading_Text_1')}
              />
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs14"
                textAlign="center"
                text={getLabelValue(labels, 'lbl_overview_logout_heading_Text_2')}
              />
            </LoggedinTextWrapper>
            <LoggedinWrapper>
              <CustomButton
                className="classBtn"
                color={colorPallete.text.secondary}
                id="createAccount"
                type="submit"
                width="47%"
                data-locator=""
                text={getLabelValue(labels, 'lbl_overview_join_text')}
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
                fill="BLUE"
                id="login"
                type="submit"
                data-locator=""
                width="47%"
                text={getLabelValue(labels, 'lbl_overview_login_text')}
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
                horizontalBar={horizontalBar}
              >
                <ModalViewWrapper>
                  {this.renderComponent({
                    navigation,
                    getComponentId,
                    isUserLoggedIn,
                  })}
                </ModalViewWrapper>
              </ModalNative>
            )}
            <FavtWrapper>
              <BodyCopy
                color="gray.900"
                fontFamily="secondary"
                fontSize="fs13"
                textAlign="left"
                fontWeight="regular"
                text={getLabelValue(labels, 'lbl_overview_myFavoritesHeading')}
                onPress={e =>
                  this.toggleModal({
                    e,
                    getComponentId: { favorites: true },
                  })
                }
              />
              <FavImageWrapper>
                <ImageComp source={favIcon} width={15} height={13} />
              </FavImageWrapper>
            </FavtWrapper>
            <UnderlineStyle />
          </React.Fragment>
        )}

        {isUserLoggedIn && (
          <TouchabelContainer onPress={() => handleComponentChange('myFavoritePageMobile')}>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs13"
              fontWeight="regular"
              text={getLabelValue(labels, 'lbl_overview_myFavoritesHeading')}
              color="gray.900"
              textAlign="center"
            />
            <CustomIcon
              margins="0 0 0 8px"
              iconFontName={ICON_FONT_CLASS.Icomoon}
              name={ICON_NAME.filledHeart}
              size="fs20"
              color="red.500"
            />
          </TouchabelContainer>
        )}
        <>
          <TouchabelContainer onPress={this.toggleApplyNowModal}>
            <FavoritesWrapper>
              <ImageContainer>
                <StyledImage source={cardIcon} width={47} height={30} />
              </ImageContainer>
              <TextWrapper>
                <BodyCopy
                  fontFamily="secondary"
                  fontSize="fs13"
                  fontWeight="regular"
                  text={labels.lbl_overview_apply_today}
                  color="gray.900"
                  textAlign="center"
                />
              </TextWrapper>
            </FavoritesWrapper>
            <CustomIcon name={ICON_NAME.chevronRight} size="fs12" color="gray.600" isButton />
          </TouchabelContainer>
          <Panel
            title={getLabelValue(labels, 'lbl_overview_manage_creditCard')}
            isVariationTypeLink
          />
          <UnderlineStyle />
          <TouchabelContainer
            onPress={() => {
              navigation.navigate('GiftCardPage', {
                title: 'Gift Cards',
                pdpUrl: 'Gift Card',
              });
            }}
          >
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs13"
              fontWeight="regular"
              text={getLabelValue(labels, 'lbl_overview_purchase_giftCards')}
              color="gray.900"
            />
            <RightArrowImageContainer>
              <ImageComp source={rightIcon} width={7} height={10} />
            </RightArrowImageContainer>
          </TouchabelContainer>
          <Panel title={getLabelValue(labels, 'lbl_overview_refer_friend')} isVariationTypeLink />
          <Panel
            title={getLabelValue(labels, 'lbl_overview_trackYourOrder')}
            isVariationTypeLink
            handleComponentChange={this.showTrackOrderModal}
          />
          <UnderlineStyle />
          <Panel title={getLabelValue(labels, 'lbl_overview_app_settings')} isVariationTypeLink />
          <Panel title={getLabelValue(labels, 'lbl_overview_help')} isVariationTypeLink />
          <Panel title={getLabelValue(labels, 'lbl_overview_messages')} isVariationTypeLink />
        </>
        <LogoutWrapper>{isUserLoggedIn && <LogOutPageContainer labels={labels} />}</LogoutWrapper>
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
