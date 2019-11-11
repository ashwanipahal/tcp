import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import RewardsPoints from '@tcp/core/src/components/features/account/common/organism/RewardsPoints';
import { getLabelValue, getScreenHeight } from '@tcp/core/src/utils';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import {
  TextWrapper,
  TouchabelContainer,
  ImageContainer,
  StyledImage,
  FavoritesWrapper,
} from '../../AccountOverview/styles/AccountOverview.style.native';
import WalletLayout from '../styles/Wallet.style.native';
import { ModalViewWrapper } from '../../LoginPage/molecules/LoginForm/LoginForm.style.native';
import { LoggedinWrapper, LoggedinTextWrapper } from '../../Logout/styles/LoginOut.style.native';
import MyRewards from '../../common/organism/MyRewards';
import AccountNumber from '../../common/organism/AccountNumber';
import CreateAccount from '../../CreateAccount';
import LoginPageContainer from '../../LoginPage';
import PageHeadingWithLinks from '../../common/molecule/PageHeadingWithLinks';
import Panel from '../../../../common/molecules/Panel';
import ModalNative from '../../../../common/molecules/Modal';
import CustomIcon from '../../../../common/atoms/Icon';
import CustomButton from '../../../../common/atoms/Button';
import { ICON_NAME } from '../../../../common/atoms/Icon/Icon.constants';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import { ViewWithSpacing } from '../../../../common/atoms/styledWrapper/styledWrapper.native';
import mock from './mock';

const cardIcon = require('../../../../../../../mobileapp/src/assets/images/tcp-cc.png');

class WalletView extends PureComponent {
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
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isUserLoggedIn && state.showModal) {
      return { showModal: false };
    }
    return null;
  }

  toggleApplyNowModal = () => {
    const { navigation, openApplyNowModal } = this.props;
    navigation.navigate('ApplyNow');
    openApplyNowModal({ isModalOpen: true });
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

  renderFooterLinks = () => {
    const accountFooterLinks = mock.walletFooterNavLegalLinks;
    const { navigation } = this.props;
    return accountFooterLinks.map(link => {
      let linkMarkup = null;
      const { leafLink } = link;
      if (leafLink.url.includes('plcc')) {
        linkMarkup = (
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
                  text={leafLink.text}
                  color="gray.900"
                  textAlign="center"
                />
              </TextWrapper>
            </FavoritesWrapper>
            <CustomIcon name={ICON_NAME.chevronRight} size="fs12" color="gray.600" isButton />
          </TouchabelContainer>
        );
      } else if (leafLink.url.includes('credit-account')) {
        linkMarkup = <Panel title={leafLink.text} isVariationTypeLink />;
      } else if (leafLink.url.includes('gift-card')) {
        linkMarkup = (
          <TouchabelContainer
            onPress={() => {
              navigation.navigate('GiftCardPage', {
                title: 'Gift Cards',
                pdpUrl: 'Gift Card',
              });
            }}
          >
            <FavoritesWrapper>
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs13"
                fontWeight="regular"
                text={leafLink.text}
                color="gray.900"
              />
            </FavoritesWrapper>

            <CustomIcon name={ICON_NAME.chevronRight} size="fs12" color="gray.600" isButton />
          </TouchabelContainer>
        );
      }
      return linkMarkup;
    });
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

  renderGuestView = overViewLabels => {
    const colorPallete = createThemeColorPalette();
    const { isUserLoggedIn, navigation } = this.props;
    const { showModal, getComponentId, modalHeaderLbl, horizontalBar } = this.state;
    this.getModalHeader(getComponentId, overViewLabels);
    return (
      <React.Fragment>
        <LoggedinTextWrapper>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs14"
            textAlign="center"
            text={getLabelValue(overViewLabels, 'lbl_overview_logout_heading_Text_1')}
          />
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs14"
            textAlign="center"
            text={getLabelValue(overViewLabels, 'lbl_overview_logout_heading_Text_2')}
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
            text={getLabelValue(overViewLabels, 'lbl_overview_join_text')}
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
            text={getLabelValue(overViewLabels, 'lbl_overview_login_text')}
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
      </React.Fragment>
    );
  };

  render() {
    const {
      labels,
      commonLabels,
      overViewLabels,
      isUserLoggedIn,
      navigation,
      ...props
    } = this.props;
    const viewContainerStyle = { height: getScreenHeight() };
    return (
      <View style={viewContainerStyle}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <WalletLayout>
            {isUserLoggedIn ? (
              <>
                <RewardsPoints tableView />
                <PageHeadingWithLinks
                  heading={getLabelValue(labels, 'lbl_my_wallet_heading', 'placeRewards')}
                  noTopPadding
                  noCTA
                >
                  <AccountNumber />
                  <MyRewards labels={labels} view="all" {...props} />
                </PageHeadingWithLinks>
              </>
            ) : (
              this.renderGuestView(overViewLabels)
            )}
            <ViewWithSpacing spacingStyles={isUserLoggedIn ? 'margin-top-XXS' : 'margin-top-XXXS'}>
              {this.renderFooterLinks()}
            </ViewWithSpacing>
          </WalletLayout>
        </ScrollView>
      </View>
    );
  }
}

WalletView.propTypes = {
  labels: PropTypes.shape({
    placeRewards: PropTypes.shape({
      lbl_my_wallet_heading: PropTypes.string,
      lbl_my_rewards_program_details: PropTypes.string,
    }),
    common: PropTypes.shape({
      lbl_common_tnc: PropTypes.string,
    }),
  }),
  commonLabels: PropTypes.shape({}),
  overViewLabels: PropTypes.shape({}),
  navigation: PropTypes.func,
  isUserLoggedIn: PropTypes.string.isRequired,
  openApplyNowModal: PropTypes.func.isRequired,
};

WalletView.defaultProps = {
  labels: {
    placeRewards: {
      lbl_my_wallet_heading: '',
      lbl_my_rewards_program_details: '',
    },
    common: {
      lbl_common_tnc: '',
    },
  },
  commonLabels: {},
  overViewLabels: {},
  navigation: () => {},
};

export default WalletView;
