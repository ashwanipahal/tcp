import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import ImageComp from '@tcp/core/src/components/common/atoms/Image';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { BodyCopyWithSpacing, ViewWithSpacing } from '../../../atoms/styledWrapper';
import ModalNative from '../../../molecules/Modal';
import config from './config';
import { Row, EarnedMessage, Points } from '../styles/social.style.native';
import FacebookEnableIcon from '../../../../../../../mobileapp/src/assets/images/facebook.png';
import InstagramEnableIcon from '../../../../../../../mobileapp/src/assets/images/instagram.png';
import FacebookDisableIcon from '../../../../../../../mobileapp/src/assets/images/facebook_fade.png';
import InstagramDisableIcon from '../../../../../../../mobileapp/src/assets/images/instagram_fade.png';
import CloseIcon from '../../../../../../../mobileapp/src/assets/images/close.png';
import PlusIcon from '../../../../../../../mobileapp/src/assets/images/plus.png';

class Socialview extends React.PureComponent {
  static propTypes = {
    socialLoad: PropTypes.shape({}).isRequired,
    saveSocialAcc: PropTypes.shape({}).isRequired,
    getSocialAcc: PropTypes.shape({}).isRequired,
    labels: PropTypes.shape({}).isRequired,
    pointModalClose: PropTypes.func.isRequired,
    setPointsModal: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.socialAccounts = [];
    this.pointsInformation = {};
    this.icons = {
      FacebookEnable: FacebookEnableIcon,
      InstagramEnable: InstagramEnableIcon,
      FacebookDisable: FacebookDisableIcon,
      InstagramDisable: InstagramDisableIcon,
      Connected: CloseIcon,
      Disconnected: PlusIcon,
    };
  }

  onClose = () => {
    const { pointModalClose } = this.props;
    pointModalClose({ state: false });
  };

  viewAll = () => {};

  /**
   * @function renderAccountsInformation Render the social plugins layouts
   * @param {accounts} accounts list of accounts
   * @param {labels} labels component labels
   */
  renderAccountsInformation = (accounts, labels) => {
    const { setPointsModal } = this.props;
    const { points } = this.pointsInformation;
    const rewardPoints = ` ${points} `;

    return accounts.map(elem => {
      const isSocialAccount =
        config && config.SOCIAL_ACCOUNTS[elem.socialAccount.toLocaleLowerCase()];
      const socialIcon = `${isSocialAccount}${elem.isConnected ? 'Enable' : 'Disable'}`;
      const icon = `${elem.isConnected ? 'Connected' : 'Disconnected'}`;
      return (
        <ViewWithSpacing spacingStyles="margin-bottom-XL margin-left-XXS margin-right-XXS">
          <Row>
            <ImageComp source={this.icons[socialIcon]} width={50} height={50} />
            <BodyCopyWithSpacing
              fontSize="fs16"
              spacingStyles="margin-left-MED margin-right-LRG"
              text={
                elem.isConnected
                  ? `${config.SOCIAL_ACCOUNTS[elem.socialAccount]} ${
                      labels.lbl_prefrence_connected
                    }`
                  : `${labels.lbl_prefrence_connectTo} ${
                      config.SOCIAL_ACCOUNTS[elem.socialAccount]
                    }`
              }
            />
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="button"
              onPress={() => this.handleSocialNetwork(isSocialAccount, elem.isConnected)}
            >
              <ImageComp source={this.icons[icon]} width={15} height={15} />
            </TouchableOpacity>
          </Row>
          {setPointsModal && this.pointsInformation.points > 0 && (
            <ModalNative
              visible={setPointsModal}
              onRequestClose={this.onClose}
              heading=" "
              horizontalBar={false}
            >
              <BodyCopy
                fontSize="fs22"
                fontFamily="secondary"
                textAlign="center"
                fontWeight="black"
                text={getLabelValue(labels, 'lbl_prefrence_social_points_heading')}
              />
              <ViewWithSpacing spacingStyles="margin-left-XXXL margin-right-XXXL">
                <EarnedMessage>
                  <BodyCopyWithSpacing
                    fontSize="fs14"
                    textAlign="center"
                    spacingStyles="margin-top-LRG"
                    text={getLabelValue(labels, 'lbl_prefrence_social_points_text_1')}
                  />
                  <Points>{rewardPoints}</Points>
                  <BodyCopy
                    fontSize="fs14"
                    textAlign="center"
                    text={getLabelValue(labels, 'lbl_prefrence_social_points_text_2')}
                  />
                </EarnedMessage>

                <BodyCopyWithSpacing
                  fontSize="fs14"
                  textAlign="center"
                  spacingStyles="margin-top-LRG"
                  text={getLabelValue(labels, 'lbl_prefrence_social_points_text_3')}
                />

                <BodyCopyWithSpacing
                  fontSize="fs14"
                  textAlign="center"
                  spacingStyles="margin-top-LRG"
                  text={getLabelValue(labels, 'lbl_prefrence_social_points_text_4')}
                />

                <BodyCopy
                  fontSize="fs14"
                  textAlign="center"
                  text={getLabelValue(labels, 'lbl_prefrence_social_points_text_5')}
                />
              </ViewWithSpacing>
              <ViewWithSpacing spacingStyles="margin-top-XXXL margin-left-XXXL margin-right-XXXL">
                <Button
                  buttonVariation="variable-width"
                  color="white"
                  fill="BLUE"
                  type="submit"
                  onPress={this.viewAll}
                  text={getLabelValue(labels, 'lbl_prefrence_social_points_modal_viewall_btn')}
                />

                <ViewWithSpacing spacingStyles="margin-top-LRG">
                  <Button
                    buttonVariation="variable-width"
                    fill="WHITE"
                    color="black"
                    type="submit"
                    onPress={this.onClose}
                    text={getLabelValue(labels, 'lbl_prefrence_social_points_modal_close_btn')}
                  />
                </ViewWithSpacing>
              </ViewWithSpacing>
            </ModalNative>
          )}
        </ViewWithSpacing>
      );
    });
  };

  refactorSocialDetails = accounts => {
    const accountsInfo = [];
    Object.keys(accounts).forEach(prop => {
      if (prop === 'facebook' || prop === 'instagram') {
        accountsInfo.push({
          socialAccount: config.SOCIAL_ACCOUNTS_INFO[prop],
          isConnected: accounts[prop].accessToken,
          hasUserId: accounts[prop].userId,
        });
      }
      if (prop === 'pointsAwarded') {
        this.pointsInformation = {
          activity: accounts[prop].activity,
          id: accounts[prop].id,
          points: accounts[prop].points,
        };
      }
    });
    this.socialAccounts = accountsInfo;
  };

  /**
   * @function Handling of social plugins - facebook login/log out
   * @param {*} isSocialAccount what type of social account - Facebook/Instagram/Twitter
   * @param {*} isConnected - Status to check whether user is connected with social sites
   */
  handleSocialNetwork(isSocialAccount, isConnected) {
    const { saveSocialAcc } = this.props;
    switch (isSocialAccount) {
      case 'Facebook':
        if (!isConnected) {
          // Attempt a login using the Facebook login dialog asking for default permissions.
          return LoginManager.logInWithReadPermissions(['public_profile']).then(result => {
            if (result.isCancelled) {
              // do nothing
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                const socialAccInfo = {
                  facebook: 'facebook',
                  accessToken: data.accessToken,
                  userId: data.userID,
                  isconnected: false,
                };
                saveSocialAcc({ socialAccInfo });
              });
            }
          });
        }
        return null;
      case 'Instagram':
        return null;
      default:
        return null;
    }
  }

  render() {
    const { getSocialAcc, labels } = this.props;
    if (Object.keys(getSocialAcc).length) {
      this.refactorSocialDetails(getSocialAcc);
    }
    return (
      <View>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs16"
          fontWeight="extrabold"
          text={getLabelValue(labels, 'lbl_prefrence_social_account')}
        />
        <BodyCopyWithSpacing
          spacingStyles="margin-bottom-XXL margin-left-XXS margin-top-SM"
          fontSize="fs16"
          text={getLabelValue(labels, 'lbl_prefrence_social_text')}
        />
        {this.renderAccountsInformation(this.socialAccounts, labels)}
      </View>
    );
  }
}

export default Socialview;
export { Socialview as SocialviewVanilla };
