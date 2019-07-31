import React from 'react';
import { View, Text } from 'react-native';
import Anchor from '../../../../../../common/atoms/Anchor';
import {
  CardTileWrapper,
  CardTileHeading,
  CardTileContext,
  VenmoCardTileHeading,
  CardTileExpiry,
  CardTileDefaultSection,
  CardTileImgWrapper,
  CardTileImg,
  DefaultBadgeWrapper,
  BadgeContent,
  CardAddress,
  CardCtaLinkLeftMargin,
  CardCtaLinks,
} from '../CardTile.style.native';
import { getIconCard } from '../../../../../../../utils';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

// @flow
type Props = {
  card: object,
  labels: object,
  setDefaultPaymentMethod: Function,
};

const getCardName = ({ card, labels }) => {
  switch (card.ccType) {
    case 'GiftCard':
      return labels.ACC_LBL_GIFT_CARD;
    case 'PLACE CARD':
      return labels.ACC_LBL_PLCC_CARD;
    case 'VENMO':
      return labels.ACC_LBL_VENMO_ACCOUNT;
    default:
      return labels.ACC_LBL_DEFAULT_CARD_NAME;
  }
};

const getDataLocatorPrefix = ({ card }) => {
  switch (card.ccType) {
    case 'GiftCard':
      return 'giftcard';
    case 'VENMO':
      return 'venmo';
    default:
      return 'creditdebit';
  }
};

const handleDefaultLinkClick = (e, card, setDefaultPaymentMethod) => {
  e.preventDefault();
  setDefaultPaymentMethod(card);
};

type MakeDefaultProps = {
  card: object,
  labels: object,
  setDefaultPaymentMethod: Function,
};

const getMakeDefaultBadge = ({ card, labels, setDefaultPaymentMethod }: MakeDefaultProps) => {
  return card.defaultInd ? (
    <DefaultBadgeWrapper>
      <BadgeContent>
        <BodyCopy
          mobilefontFamily={['secondary']}
          fontWeight="semibold"
          fontSize="fs10"
          text={labels.ACC_LBL_DEFAULT_PAYMENT}
        />
      </BadgeContent>
    </DefaultBadgeWrapper>
  ) : (
    <Anchor
      fontSizeVariation="small"
      underline
      to="/#"
      anchorVariation="primary"
      data-locator="payment-makedefault"
      onPress={e => handleDefaultLinkClick(e, card, setDefaultPaymentMethod)}
      text={labels.ACC_LBL_MAKE_DEFAULT}
    />
  );
};

const cardIconMapping = {
  DISC: 'disc-small',
  MC: 'mc-small',
  Amex: 'amex-small',
  Visa: 'visa-small',
  GC: 'gift-card-small',
  'PLACE CARD': 'place-card-small',
  VENMO: 'venmo-blue-acceptance-mark',
};

const getVenmoUserName = ({ card }) => {
  return (
    card.properties && (
      <VenmoCardTileHeading dataLocator="payment-venmoid">
        <BodyCopy fontSize="fs14" fontWeight="extrabold" text={card.properties.venmoUserId} />
      </VenmoCardTileHeading>
    )
  );
};

type GetCardDetailsProps = {
  dataLocatorPrefix: string,
  card: object,
  labels: object,
};

const getCardDetails = ({ dataLocatorPrefix, card, labels }: GetCardDetailsProps) => {
  const cardNum = `${labels.ACC_LBL_CARD_NUM}${card.accountNo.slice(-4)}`;
  const expDate = `${labels.ACC_LBL_EXP_DATE}${card.expMonth.trim()}/${card.expYear}`;
  return (
    <View>
      <BodyCopy
        fontSize="fs14"
        fontWeight="black"
        dataLocator={`payment-${dataLocatorPrefix}endingtext`}
        text={cardNum}
      />
      {card.ccType !== 'PLACE CARD' && (
        <CardTileExpiry>
          <BodyCopy
            fontSize="fs14"
            fontWeight="semibold"
            dataLocator={`payment-${dataLocatorPrefix}expiretext`}
            text={expDate}
          />
        </CardTileExpiry>
      )}
    </View>
  );
};

const getAddressDetails = ({ card }) => {
  const { addressDetails } = card;
  return (
    addressDetails && (
      <CardAddress>
        <Text>{`${addressDetails.firstName} ${addressDetails.lastName}`}</Text>
        <Text>{addressDetails.addressLine1}</Text>
        {addressDetails.addressLine2 ? <Text>{addressDetails.addressLine2}</Text> : null}
        <Text>{`${addressDetails.city}, ${addressDetails.state} ${addressDetails.zipCode}`}</Text>
      </CardAddress>
    )
  );
};

const CardTile = ({ card, labels, setDefaultPaymentMethod }: Props) => {
  const isCreditCard = card.ccType !== 'GiftCard' && card.ccType !== 'VENMO';
  const isVenmo = card.ccType === 'VENMO';
  const cardName = getCardName({ card, labels });
  const cardIcon = getIconCard(cardIconMapping[card.ccBrand]);
  const dataLocatorPrefix = getDataLocatorPrefix({ card });
  return (
    <CardTileWrapper card={card}>
      <CardTileContext defaultPayment={card.defaultInd}>
        <CardTileHeading>
          <BodyCopy
            fontSize="fs16"
            mobilefontFamily={['secondary']}
            fontWeight="regular"
            dataLocator={`payment-${dataLocatorPrefix}nametitle`}
            text={cardName}
          />
        </CardTileHeading>
        {isCreditCard ? getMakeDefaultBadge({ card, labels, setDefaultPaymentMethod }) : null}
      </CardTileContext>
      <CardTileDefaultSection isVenmo>
        {isVenmo ? getVenmoUserName({ card }) : getCardDetails({ dataLocatorPrefix, card, labels })}
        <CardTileImgWrapper card={card}>
          <CardTileImg
            className="cardTile__img"
            alt={card.ccBrand}
            source={cardIcon}
            data-locator="payment-cardImage"
          />
        </CardTileImgWrapper>
      </CardTileDefaultSection>
      {isCreditCard ? getAddressDetails({ card }) : null}
      <CardCtaLinks>
        <CardCtaLinkLeftMargin>
          {!isVenmo && (
            <Anchor
              fontSizeVariation="large"
              underline
              to="/#"
              anchorVariation="primary"
              data-locator={`payment-${dataLocatorPrefix}editlink`}
              text={labels.ACC_LBL_EDIT}
            />
          )}
        </CardCtaLinkLeftMargin>
        <Anchor
          fontSizeVariation="large"
          underline
          to="/#"
          anchorVariation="primary"
          data-locator={`payment-${dataLocatorPrefix}deletelink`}
          text={labels.ACC_LBL_DELETE}
        />
      </CardCtaLinks>
    </CardTileWrapper>
  );
};

export default CardTile;
