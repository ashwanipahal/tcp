import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/LoyaltyFooterSection.style';
import { Anchor, BodyCopy } from '../../../../../../common/atoms';
import {
  FooterLinksSection,
  SizeBetweenWrapper,
} from '../styles/LoyaltyFooterSection.style.native';
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

  renderApplyNowLink = text => {
    return (
      <Anchor
        className="applyNow"
        fontSizeVariation="medium"
        anchorVariation="primary"
        text={text}
        underline
      />
    );
  };

  renderLearnMoreLink = text => {
    return (
      <Anchor
        className="learnMore"
        fontSizeVariation="medium"
        anchorVariation="primary"
        text={text}
        underline
      />
    );
  };

  renderCreateAccountLink = text => {
    return (
      <Anchor
        className="createAccount"
        fontSizeVariation="medium"
        anchorVariation="primary"
        text={text}
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

  renderLoginLink = text => {
    return (
      <Anchor
        className="logIn"
        fontSizeVariation="medium"
        anchorVariation="primary"
        text={text}
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

  getLinkWithName = (props, action, text) => {
    let returnLink;
    switch (action) {
      case 'ApplyNowAction':
        returnLink = this.renderApplyNowLink(text);
        break;
      case 'LearnMoreAction':
        returnLink = this.renderLearnMoreLink(text);
        break;
      case 'CreateAccountAction':
        returnLink = this.renderCreateAccountLink(text);
        break;
      case 'loginAction':
        returnLink = this.renderLoginLink(text);
        break;
      default:
        break;
    }
    return returnLink;
  };

  render() {
    const { className, footerLabels } = this.props;
    const { showModal, getComponentId, modalHeaderLbl, horizontalBar } = this.state;
    return (
      <View className={`${className} footer-wrapper`}>
        <FooterLinksSection>
          {!!footerLabels.link1Prefix && (
            <BodyCopy
              fontWeight="regular"
              mobileFontFamily="secondary"
              fontSize="fs9"
              text={footerLabels.link1Prefix}
              color="text.primary"
            />
          )}
          {!!footerLabels.link1Action &&
            this.getLinkWithName(this.props, footerLabels.link1Action, footerLabels.link1Text)}
          {!!footerLabels.link1Action && footerLabels.link2Action && <SizeBetweenWrapper />}
          {!!footerLabels.link2Prefix && (
            <BodyCopy
              fontWeight="regular"
              mobileFontFamily="secondary"
              fontSize="fs9"
              text={footerLabels.link2Prefix}
              color="text.primary"
            />
          )}
          {!!footerLabels.link2Action &&
            this.getLinkWithName(this.props, footerLabels.link2Action, footerLabels.link2Text)}
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
        </FooterLinksSection>
      </View>
    );
  }
}

LoyaltyFooterSection.propTypes = {
  className: PropTypes.string,
};

LoyaltyFooterSection.defaultProps = {
  className: '',
};

export default withStyles(LoyaltyFooterSection, Styles);
export { LoyaltyFooterSection as LoyaltyFooterSectionVanilla };
