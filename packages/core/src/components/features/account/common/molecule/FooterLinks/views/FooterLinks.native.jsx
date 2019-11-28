/* eslint-disable max-lines */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import ImageComp from '@tcp/core/src/components/common/atoms/Image';
import CustomIcon from '@tcp/core/src/components/common/atoms/Icon';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import {
  ICON_NAME,
  ICON_FONT_CLASS,
} from '@tcp/core/src/components/common/atoms/Icon/Icon.constants';
import Panel from '@tcp/core/src/components/common/molecules/Panel';
import { getLabelValue } from '@tcp/core/src/utils';
import { ModalViewWrapper } from '@tcp/core/src/components/features/account/LoginPage/molecules/LoginForm/LoginForm.style.native';
import { LogoutWrapper } from '@tcp/core/src/components/features/account/Logout/styles/LoginOut.style.native';
import CreateAccount from '@tcp/core/src/components/features/account/CreateAccount';
import LoginPageContainer from '@tcp/core/src/components/features/account/LoginPage';
import LogOutPageContainer from '@tcp/core/src/components/features/account/Logout/container/LogOut.container';
import WebViewModal from '@tcp/core/src/components/common/molecules/WebViewModal';
import {
  UnderlineStyle,
  TextWrapper,
  StyledImage,
  RightArrowImageContainer,
  ImageContainer,
  FavoritesWrapper,
  TouchabelContainer,
  FavImageWrapper,
  FavtWrapper,
  AnchorStyles,
} from '../styles/FooterLinks.style.native';

const favIcon = require('../../../../../../../../../mobileapp/src/assets/images/filled-heart.png');
const cardIcon = require('../../../../../../../../../mobileapp/src/assets/images/tcp-cc.png');
const rightIcon = require('../../../../../../../../../mobileapp/src/assets/images/carrot-right.png');

class FooterLinks extends PureComponent {
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
      toggleViewModal: false,
      webUrl: '',
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

  componentDidUpdate() {
    const { changePassword } = this.state;
    if (!changePassword) this.navigateToChangePassword();
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
          updateHeader={this.updateHeader}
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

  showSettingsModal = () => {
    const { navigation, isUserLoggedIn } = this.props;
    navigation.navigate('AppSettings', {
      handleToggle: this.toggleModal,
      noHeader: true,
      isUserLoggedIn,
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

  openWebViewModal = (webUri = '') => {
    this.setState(state => ({
      toggleViewModal: !state.toggleViewModal,
      webUrl: webUri,
    }));
  };

  renderLinks = () => {
    const { getComponentId, toggleViewModal, webUrl } = this.state;
    const {
      isUserLoggedIn,
      labels,
      handleComponentChange,
      navigation,
      footerLinks,
      showDivider,
    } = this.props;
    this.getModalHeader(getComponentId, labels);

    /* eslint-disable-next-line complexity, sonarjs/cognitive-complexity */
    return footerLinks.map((link, index) => {
      let linkMarkup = null;
      const { leafLink } = link;
      if (leafLink.url.includes('favorite')) {
        linkMarkup = !isUserLoggedIn ? (
          <FavtWrapper>
            <BodyCopy
              color="gray.900"
              fontFamily="secondary"
              fontSize="fs13"
              textAlign="left"
              fontWeight="regular"
              text={leafLink.text}
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
        ) : (
          <TouchabelContainer onPress={() => handleComponentChange('myFavoritePageMobile')}>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs13"
              fontWeight="regular"
              text={leafLink.text}
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
        );
      } else if (leafLink.url.includes('plcc')) {
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
            <RightArrowImageContainer>
              <ImageComp source={rightIcon} width={6} height={10} />
            </RightArrowImageContainer>
          </TouchabelContainer>
        );
      } else if (leafLink.url.includes('gift-card')) {
        linkMarkup = (
          <TouchabelContainer
            onPress={() => {
              navigation.navigate('GiftCardPage', {
                title: leafLink.title,
                pdpUrl: leafLink.title,
              });
            }}
          >
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs13"
              fontWeight="regular"
              text={leafLink.text}
              color="gray.900"
            />
            <RightArrowImageContainer>
              <ImageComp source={rightIcon} width={6} height={10} />
            </RightArrowImageContainer>
          </TouchabelContainer>
        );
      } else if (leafLink.url.includes('track-order') && !isUserLoggedIn) {
        linkMarkup = (
          <Panel
            title={leafLink.text}
            isVariationTypeLink
            handleComponentChange={this.showTrackOrderModal}
          />
        );
      } else if (leafLink.url.includes('settings')) {
        linkMarkup = (
          <Panel
            title={leafLink.text}
            isVariationTypeLink
            key
            handleComponentChange={this.showSettingsModal}
          />
        );
      } else if (leafLink.url.includes('messages')) {
        linkMarkup = <Panel title={leafLink.text} isVariationTypeLink key="" />;
      } else if (leafLink.url.includes('store-locator')) {
        linkMarkup = (
          <Panel
            title={leafLink.text}
            isVariationTypeLink
            handleComponentChange={() => {
              navigation.navigate('StoreLanding', {
                title: getLabelValue(labels, 'lbl_header_storeDefaultTitle').toUpperCase(),
              });
            }}
          />
        );
      } else if (leafLink.url.includes('logout')) {
        linkMarkup = (
          <LogoutWrapper>{isUserLoggedIn && <LogOutPageContainer labels={labels} />}</LogoutWrapper>
        );
      } else if (!leafLink.url.includes('track-order')) {
        linkMarkup = (
          <Anchor
            {...(leafLink.target === '_self'
              ? { onPress: () => this.openWebViewModal(leafLink.url) }
              : { url: leafLink.url })}
            customStyle={AnchorStyles}
          >
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs13"
              fontWeight="regular"
              text={leafLink.text}
              color="gray.900"
            />
            <RightArrowImageContainer>
              <ImageComp source={rightIcon} width={6} height={10} />
            </RightArrowImageContainer>
          </Anchor>
        );
      }
      return (
        <>
          {linkMarkup}
          {(index === 0 || index === 2 || index === 5) && showDivider ? <UnderlineStyle /> : null}
          {toggleViewModal && (
            <WebViewModal
              openState={toggleViewModal}
              toggleModalHandler={this.openWebViewModal}
              webViewProps={{
                source: {
                  uri: webUrl,
                },
              }}
            />
          )}
        </>
      );
    });
  };

  render() {
    const { isUserLoggedIn, labels, navigation } = this.props;
    const { showModal, getComponentId, modalHeaderLbl, horizontalBar } = this.state;
    this.getModalHeader(getComponentId, labels);
    return (
      <>
        {this.renderLinks()}
        <React.Fragment>
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
      </>
    );
  }
}

FooterLinks.propTypes = {
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  handleComponentChange: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  openApplyNowModal: PropTypes.func.isRequired,
  footerLinks: PropTypes.shape([]),
  showDivider: PropTypes.bool,
};

FooterLinks.defaultProps = {
  labels: {},
  footerLinks: [],
  showDivider: false,
};

export default FooterLinks;
