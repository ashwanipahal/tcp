import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import RewardsPoints from '@tcp/core/src/components/features/account/common/organism/RewardsPoints';
import { getLabelValue } from '@tcp/core/src/utils';
import {
  WalletLayout,
  TouchabelContainer,
  FavoritesWrapper,
  ImageContainer,
  StyledImage,
  TextWrapper,
} from '../styles/Wallet.style.native';
import MyRewards from '../../common/organism/MyRewards';
import AccountNumber from '../../common/organism/AccountNumber';
import PageHeadingWithLinks from '../../common/molecule/PageHeadingWithLinks';
import Panel from '../../../../common/molecules/Panel';
import ApplyNowWrapper from '../../../../common/molecules/ApplyNowPLCCModal';
import CustomIcon from '../../../../common/atoms/Icon';
import { ICON_NAME } from '../../../../common/atoms/Icon/Icon.constants';
import BodyCopy from '../../../../common/atoms/BodyCopy';

const cardIcon = require('../../../../../../../mobileapp/src/assets/images/tcp-cc.png');

class WalletView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      applyCard: false,
    };
  }

  toggleApplyNowModal = () => {
    const { applyCard } = this.state;
    this.setState({
      applyCard: !applyCard,
    });
  };

  renderFooterLinks = overViewLabels => {
    const { navigation } = this.props;
    const { applyCard } = this.state;
    return (
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
                text={getLabelValue(overViewLabels, 'lbl_overview_apply_today')}
                color="gray.900"
                textAlign="center"
              />
            </TextWrapper>
          </FavoritesWrapper>
          <CustomIcon name={ICON_NAME.chevronRight} size="fs12" color="gray.600" isButton />
        </TouchabelContainer>

        <ApplyNowWrapper toggleModalWrapper={this.toggleApplyNowModal} applyNow={applyCard} />
        <Panel
          title={getLabelValue(overViewLabels, 'lbl_overview_manage_creditCard')}
          isVariationTypeLink
        />
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
              text={getLabelValue(overViewLabels, 'lbl_overview_purchase_giftCards')}
              color="gray.900"
            />
          </FavoritesWrapper>

          <CustomIcon name={ICON_NAME.chevronRight} size="fs12" color="gray.600" isButton />
        </TouchabelContainer>
        <Panel
          title={getLabelValue(overViewLabels, 'lbl_overview_refer_friend')}
          isVariationTypeLink
        />
      </>
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
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {isUserLoggedIn && (
            <WalletLayout>
              <RewardsPoints tableView />
              <PageHeadingWithLinks
                heading={getLabelValue(labels, 'lbl_my_wallet_heading', 'placeRewards')}
                programDetailsCta={getLabelValue(
                  labels,
                  'lbl_my_rewards_program_details',
                  'placeRewards'
                )}
                termsConditionCta={getLabelValue(commonLabels, 'lbl_common_tnc')}
              >
                <AccountNumber />
                <MyRewards labels={labels} view="all" {...props} />
              </PageHeadingWithLinks>
              {this.renderFooterLinks(overViewLabels)}
            </WalletLayout>
          )}
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
