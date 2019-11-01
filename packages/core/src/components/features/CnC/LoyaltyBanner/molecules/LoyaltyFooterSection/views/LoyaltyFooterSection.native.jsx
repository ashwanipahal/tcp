import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/LoyaltyFooterSection.style';
import { Anchor } from '../../../../../../common/atoms';
import { FooterLinksSection, LearnMoreWrapper } from '../styles/LoyaltyFooterSection.style.native';
import ModalNative from '../../../../../../common/molecules/Modal';
import LoginPageContainer from '../../../../../account/LoginPage';
import CreateAccount from '../../../../../account/CreateAccount';

class LoyaltyFooterSection extends PureComponent<Props> {
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

  toggleModal = ({ getComponentId }) => {
    this.setState(state => ({
      showModal: !state.showModal,
      getComponentId: getComponentId
        ? {
            login: getComponentId.login,
            createAccount: getComponentId.createAccount,
          }
        : '',
    }));
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

  renderApplyNowLink = labels => {
    return (
      <Anchor
        className="applyNow"
        fontSizeVariation="medium"
        anchorVariation="primary"
        text={labels.applyNow}
        underline
      />
    );
  };

  renderLearnMoreLink = labels => {
    return (
      <Anchor
        className="learnMore"
        fontSizeVariation="medium"
        anchorVariation="primary"
        text={labels.learnMore}
        underline
      />
    );
  };

  renderCreateAccountLink = labels => {
    return (
      <Anchor
        className="createAccount"
        fontSizeVariation="medium"
        anchorVariation="primary"
        text={labels.createMyPlaceRewardsAccount}
        underline
        onPress={e =>
          this.toggleModal({
            e,
            getComponentId: {
              login: false,
              createAccount: true,
            },
          })
        }
      />
    );
  };

  toggleLinks = toggleLogin => {
    toggleLogin();
  };

  renderLoginLink = labels => {
    return (
      <Anchor
        className="logIn"
        fontSizeVariation="medium"
        anchorVariation="primary"
        text={labels.logIn}
        underline
        onPress={e =>
          this.toggleModal({
            e,
            getComponentId: {
              login: true,
              createAccount: false,
            },
          })
        }
      />
    );
  };

  applyNowLearnMoreLinks = labels => {
    return (
      <FooterLinksSection>
        {this.renderApplyNowLink(labels)}
        <LearnMoreWrapper>{this.renderLearnMoreLink(labels)}</LearnMoreWrapper>
      </FooterLinksSection>
    );
  };

  LearnMoreLink = labels => {
    return <FooterLinksSection>{this.renderLearnMoreLink(labels)}</FooterLinksSection>;
  };

  createAccLogInLinks = labels => {
    return (
      <FooterLinksSection>
        {this.renderCreateAccountLink(labels)}
        <LearnMoreWrapper>{this.renderLoginLink(labels)}</LearnMoreWrapper>
      </FooterLinksSection>
    );
  };

  productDetailViewFooter = (labels, isProductDetailView, isGuest, isPlcc) => {
    return (
      <>
        {isProductDetailView && (
          <>
            {isGuest && this.createAccLogInLinks(labels)}
            {!isGuest && (
              <>
                {!isPlcc && this.applyNowLearnMoreLinks(labels)}
                {isPlcc && this.LearnMoreLink(labels)}
              </>
            )}
          </>
        )}
      </>
    );
  };

  addedToBagPageLinks = (labels, isGuest, isPlcc, earnedRewardAvailable) => {
    return (
      <>
        {isGuest && this.createAccLogInLinks(labels)}
        {!isGuest && (
          <>
            {!isPlcc && (
              <>
                {!earnedRewardAvailable && this.applyNowLearnMoreLinks(labels)}
                {earnedRewardAvailable && this.LearnMoreLink(labels)}
              </>
            )}
            {isPlcc && this.LearnMoreLink(labels)}
          </>
        )}
      </>
    );
  };

  renderConfirmationAndBagLinks = (
    labels,
    isConfirmationPage,
    isPlcc,
    isGuest,
    earnedRewardAvailable
  ) => {
    return (
      <>
        {!isConfirmationPage && (
          <>
            {!isPlcc && this.applyNowLearnMoreLinks(labels)}
            {isPlcc && this.LearnMoreLink(labels)}
          </>
        )}
        {isConfirmationPage && isGuest && earnedRewardAvailable && this.createAccLogInLinks(labels)}
      </>
    );
  };

  render() {
    const {
      labels,
      className,
      isProductDetailView,
      isGuest,
      isPlcc,
      isReviewPage,
      isConfirmationPage,
      isAddedToBagPage,
      earnedRewardAvailable,
      toggleLogin,
    } = this.props;
    const { showModal, getComponentId, modalHeaderLbl, horizontalBar } = this.state;
    return (
      <View className={`${className} footerWrapper`}>
        {isProductDetailView &&
          this.productDetailViewFooter(labels, isProductDetailView, isGuest, isPlcc)}
        {isAddedToBagPage &&
          this.addedToBagPageLinks(labels, isGuest, isPlcc, earnedRewardAvailable)}
        {!isProductDetailView && !isAddedToBagPage && (
          <>
            {!isReviewPage &&
              this.renderConfirmationAndBagLinks(
                labels,
                isConfirmationPage,
                isPlcc,
                isGuest,
                earnedRewardAvailable,
                toggleLogin
              )}
            {isReviewPage && isPlcc && this.LearnMoreLink(labels)}
          </>
        )}
        {showModal && (
          <ModalNative
            isOpen={showModal}
            onRequestClose={this.toggleModal}
            heading={modalHeaderLbl}
            headingFontFamily="secondary"
            fontSize="fs16"
            horizontalBar={horizontalBar}
          >
            <View>
              {this.renderComponent({
                getComponentId,
              })}
            </View>
          </ModalNative>
        )}
      </View>
    );
  }
}

LoyaltyFooterSection.propTypes = {
  labels: PropTypes.shape.isRequired,
  className: PropTypes.string,
  isPlcc: PropTypes.bool,
  isGuest: PropTypes.bool,
  isReviewPage: PropTypes.bool,
  isProductDetailView: PropTypes.bool,
  isConfirmationPage: PropTypes.bool,
  earnedRewardAvailable: PropTypes.bool,
  isAddedToBagPage: PropTypes.bool,
};

LoyaltyFooterSection.defaultProps = {
  className: '',
  isPlcc: false,
  isGuest: false,
  isReviewPage: false,
  isProductDetailView: false,
  isConfirmationPage: false,
  earnedRewardAvailable: false,
  isAddedToBagPage: false,
};

export default withStyles(LoyaltyFooterSection, Styles);
export { LoyaltyFooterSection as LoyaltyFooterSectionVanilla };
