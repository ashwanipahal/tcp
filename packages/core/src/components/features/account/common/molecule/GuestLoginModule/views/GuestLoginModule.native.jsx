/* eslint-disable max-lines */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import CustomButton from '@tcp/core/src/components/common/atoms/Button';
import { getLabelValue } from '@tcp/core/src/utils';
import { ModalViewWrapper } from '@tcp/core/src/components/features/account/LoginPage/molecules/LoginForm/LoginForm.style.native';
import {
  LoggedinWrapper,
  LoggedinTextWrapper,
} from '@tcp/core/src/components/features/account/Logout/styles/LoginOut.style.native';
import CreateAccount from '@tcp/core/src/components/features/account/CreateAccount';
import LoginPageContainer from '@tcp/core/src/components/features/account/LoginPage';

class GuestLoginOverview extends PureComponent {
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
    const { isUserLoggedIn, labels, navigation } = this.props;
    const { showModal, getComponentId, modalHeaderLbl, horizontalBar } = this.state;
    this.getModalHeader(getComponentId, labels);
    const colorPallete = createThemeColorPalette();
    return (
      <>
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
          </React.Fragment>
        )}
      </>
    );
  }
}

GuestLoginOverview.propTypes = {
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  isUserLoggedIn: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

GuestLoginOverview.defaultProps = {
  labels: {},
};

export default GuestLoginOverview;
