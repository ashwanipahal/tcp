import React from 'react';
import PropTypes from 'prop-types';
import {
  BodyCopyWithSpacing,
  ViewWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';
import { Image, Button, BodyCopy } from '@tcp/core/src/components/common/atoms';
import { cardIconMapping } from '@tcp/core/src/components/features/account/common/molecule/CardTile/views/CardTile.utils';
import { UrlHandler } from '@tcp/core/src/utils/utils.app';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { getIconCard } from '@tcp/core/src/utils/index.native';
import externalEndpoints from '../../../externalEndpoints';
import ApplyNowWrapper from '../../../../../../common/molecules/ApplyNowPLCCModal';

import {
  UnderlineStyle,
  TileContainer,
  RowContainer,
  CardDetailContainer,
} from './MyPlaceRewardsCreditCardTile.style.native';

const getAddYourCardToLabels = labels => {
  return Object.keys(labels).filter(labelKey => /lbl_overview_addYourCardToPoint/.test(labelKey));
};

class MyPlaceRewardsCreditCardTile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { applyCard: false };
  }

  toggleApplyNowModal = () => {
    const { applyCard } = this.state;
    this.setState({
      applyCard: !applyCard,
    });
  };

  render() {
    const { labels, myPlaceRewardCard, handleComponentChange } = this.props;
    const cardEnrolled = myPlaceRewardCard && myPlaceRewardCard.ccType;
    const { applyCard } = this.state;
    const addYourCardLabelKeys = getAddYourCardToLabels(labels);
    return (
      <TileContainer>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs16"
          text={getLabelValue(labels, 'lbl_overview_myPlaceRewardsCardHeading')}
          color="black"
          fontWeight="extrabold"
        />
        <UnderlineStyle />

        {cardEnrolled ? (
          <>
            <CardDetailContainer spacingStyles="margin-top-XS">
              <Image
                source={getIconCard(cardIconMapping[myPlaceRewardCard.ccBrand])}
                width={50}
                height={30}
              />
              <BodyCopyWithSpacing
                fontFamily="secondary"
                fontSize="fs12"
                fontWeight="extrabold"
                spacingStyles="padding-left-XS"
                text={`${getLabelValue(
                  labels,
                  'lbl_overview_card_ending'
                )} ${myPlaceRewardCard.accountNo.slice(-4)}`}
              />
            </CardDetailContainer>
            <RowContainer spacingStyles="margin-top-LRG">
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs14"
                fontWeight="extrabold"
                text={getLabelValue(labels, 'lbl_overview_25Off')}
              />
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs14"
                text={getLabelValue(labels, 'lbl_overview_yourKidsBirthdays')}
              />
            </RowContainer>
            <RowContainer spacingStyles="margin-top-LRG">
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs14"
                fontWeight="extrabold"
                text={getLabelValue(labels, 'lbl_overview_earnDoublePoints')}
              />
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs14"
                text={getLabelValue(labels, 'lbl_overview_whenYouCheckout')}
              />
            </RowContainer>
            <ViewWithSpacing spacingStyles="margin-bottom-LRG">
              <BodyCopyWithSpacing
                fontFamily="secondary"
                fontSize="fs14"
                fontWeight="extrabold"
                spacingStyles="margin-top-LRG"
                text={getLabelValue(labels, 'lbl_overview_exclusiveBonusEvents')}
              />
              <BodyCopyWithSpacing
                fontFamily="secondary"
                fontSize="fs14"
                spacingStyles="margin-top-XXXS margin-bottom-XXXL"
                text={getLabelValue(labels, 'lbl_overview_tripePointsDoubleRewards')}
              />
            </ViewWithSpacing>
          </>
        ) : (
          <>
            <BodyCopyWithSpacing
              fontFamily="secondary"
              fontSize="fs14"
              text={getLabelValue(labels, 'lbl_overview_addYourCardTo')}
            />
            <ViewWithSpacing spacingStyles="margin-top-LRG">
              {addYourCardLabelKeys.map(labelKey => {
                return (
                  <BodyCopy
                    fontFamily="secondary"
                    fontSize="fs14"
                    text={`\u2022 ${labels[labelKey]}`}
                  />
                );
              })}
            </ViewWithSpacing>
            <ViewWithSpacing spacingStyles="margin-top-LRG margin-bottom-XXXL">
              <Button
                fill="WHITE"
                color="gray"
                onPress={() => handleComponentChange('paymentGiftCardsPageMobile')}
                data-locator="orders-shop-now-btn"
                text={getLabelValue(labels, 'lbl_overview_addYourCard')}
              />
            </ViewWithSpacing>
            <BodyCopyWithSpacing
              fontFamily="secondary"
              fontSize="fs14"
              fontWeight="extrabold"
              spacingStyles="margin-top-XXXL"
              text={getLabelValue(labels, 'lbl_overview_dontHaveMyPlaceCard')}
            />
          </>
        )}
        <ViewWithSpacing spacingStyles="margin-top-LRG margin-bottom-XXS">
          <Button
            text={
              cardEnrolled
                ? getLabelValue(labels, 'lbl_overview_manageYourCard')
                : getLabelValue(labels, 'lbl_overview_applyOrAcceptOffer')
            }
            fill="BLUE"
            onPress={
              cardEnrolled
                ? () => UrlHandler(externalEndpoints.managePlaceCardPage)
                : this.toggleApplyNowModal
            }
          />
        </ViewWithSpacing>
        <ApplyNowWrapper toggleModalWrapper={this.toggleApplyNowModal} applyNow={applyCard} />
      </TileContainer>
    );
  }
}

MyPlaceRewardsCreditCardTile.propTypes = {
  labels: PropTypes.shape({
    lbl_overview_paymentHeading: PropTypes.string,
    lbl_overview_paymentCTA: PropTypes.string,
  }),
  myPlaceRewardCard: PropTypes.shape({}),
  handleComponentChange: PropTypes.func.isRequired,
};

MyPlaceRewardsCreditCardTile.defaultProps = {
  labels: {
    lbl_overview_paymentHeading: '',
    lbl_overview_paymentCTA: '',
  },
  myPlaceRewardCard: {},
};

export default MyPlaceRewardsCreditCardTile;
