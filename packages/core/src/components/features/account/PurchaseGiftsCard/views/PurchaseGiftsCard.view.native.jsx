import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils';
import { UrlHandler } from '@tcp/core/src/utils/utils.app';
import ImageComp from '../../../../common/atoms/Image';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import {
  TouchabelContainer,
  RightArrowImageContainer,
} from '../styles/PurchaseGiftsCard.view.style.native';

const rightIcon = require('../../../../../../../mobileapp/src/assets/images/carrot-small-right.png');

export const PurchaseGiftsCard = ({ labels, navigation }) => {
  return (
    <>
      <TouchabelContainer
        onPress={() => {
          UrlHandler(
            getLabelValue(labels, 'lbl_purchaseGiftsCard_animatedGiftCardsLinkUrl', 'common')
          );
        }}
      >
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs13"
          fontWeight="regular"
          text={getLabelValue(labels, 'lbl_purchaseGiftsCard_animatedGiftCards', 'common')}
          color="gray.900"
        />
        <RightArrowImageContainer>
          <ImageComp source={rightIcon} width={7} height={10} />
        </RightArrowImageContainer>
      </TouchabelContainer>

      <TouchabelContainer
        onPress={() => {
          UrlHandler(getLabelValue(labels, 'lbl_purchaseGiftsCard_eGiftCardLinkUrl', 'common'));
        }}
      >
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs13"
          fontWeight="regular"
          text={getLabelValue(labels, 'lbl_purchaseGiftsCard_eGiftCard', 'common')}
          color="gray.900"
        />
        <RightArrowImageContainer>
          <ImageComp source={rightIcon} width={7} height={10} />
        </RightArrowImageContainer>
      </TouchabelContainer>

      <TouchabelContainer
        onPress={() => {
          navigation.navigate('ProductDetail', {
            title: getLabelValue(
              labels,
              'lbl_purchaseGiftsCard_physicalGiftCardPageTitle',
              'common'
            ),
            pdpUrl: 'Gift Card',
          });
        }}
      >
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs13"
          fontWeight="regular"
          text={getLabelValue(labels, 'lbl_purchaseGiftsCard_physicalGiftCard', 'common')}
          color="gray.900"
        />
        <RightArrowImageContainer>
          <ImageComp source={rightIcon} width={7} height={10} />
        </RightArrowImageContainer>
      </TouchabelContainer>
    </>
  );
};

PurchaseGiftsCard.propTypes = {
  labels: PropTypes.shape({}),
  navigation: PropTypes.func.isRequired,
};

PurchaseGiftsCard.defaultProps = {
  labels: {},
};

export default PurchaseGiftsCard;
