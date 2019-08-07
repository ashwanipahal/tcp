import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { get } from 'lodash';
import { View, Text } from 'react-native';
import Recaptcha from '@tcp/core/src/components/common/molecules/recaptcha/recaptcha.native';
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
  CardCtaLinkMargin,
  CardCtaLinks,
  CardCtaRow,
  RecaptchaContainer,
} from '../CardTile.style.native';
import { getIconCard } from '../../../../../../../utils/index.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import CustomButton from '../../../../../../common/atoms/Button';
import TextBox from '../../../../../../common/atoms/TextBox';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';

// @flow
type Props = {
  card: object,
  labels: object,
  setDefaultPaymentMethod: Function,
  onGetBalanceCard: Function,
  checkbalanceValueInfo: any,
  change: Function,
  handleSubmit: Function,
};

const getCardName = ({ card, labels }) => {
  switch (card.ccType) {
    case 'GiftCard':
      return labels.paymentGC.lbl_payment_giftCard;
    case 'PLACE CARD':
      return labels.paymentGC.lbl_payment_plccCard;
    case 'VENMO':
      return labels.paymentGC.lbl_payment_venmoAccount;
    default:
      return labels.paymentGC.lbl_payment_defaultCardName;
  }
};

/**
 * Get the gift card balance
 * @param {*} key
 * @param {*} checkbalanceValueInfo
 */
const getGiftCardBalance = (key, checkbalanceValueInfo) => {
  return checkbalanceValueInfo && checkbalanceValueInfo.get(key);
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
          text={labels.paymentGC.lbl_payment_defaultPayment}
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
      text={labels.common.lbl_common_makeDefault}
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
  const cardNum = `${labels.paymentGC.lbl_payment_cardNum}${card.accountNo.slice(-4)}`;
  const expDate = `${labels.paymentGC.lbl_payment_expDate}${card.expMonth.trim()}/${card.expYear}`;
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

const handleGetGiftCardBalanceClick = (formData, card, onGetBalanceCard) => {
  onGetBalanceCard({ formData, card });
};

const getCtaRow = (
  isGiftCard,
  isVenmo,
  balance,
  labels,
  dataLocatorPrefix,
  card,
  onGetBalanceCard,
  handleSubmit
  // eslint-disable-next-line max-params
) => {
  return (
    <CardCtaRow>
      {isGiftCard && balance && (
        <BodyCopy
          mobilefontFamily={['secondary']}
          fontSize="fs28"
          color="gray.900"
          fontWeight="black"
          text={`$${balance}`}
        />
      )}

      {isGiftCard && balance == null && (
        <CustomButton
          color="white"
          fill="BLUE"
          text={labels.ACC_LBL_CHECK_BALANCE}
          buttonVariation="variable-width"
          onPress={handleSubmit(formData =>
            handleGetGiftCardBalanceClick(formData, card, onGetBalanceCard)
          )}
        />
      )}

      <CardCtaLinks>
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
        <CardCtaLinkMargin />
        <Anchor
          fontSizeVariation="large"
          underline
          to="/#"
          anchorVariation="primary"
          data-locator={`payment-${dataLocatorPrefix}deletelink`}
          text={labels.ACC_LBL_DELETE}
        />
      </CardCtaLinks>
    </CardCtaRow>
  );
};

const CardTile = ({
  card,
  labels,
  setDefaultPaymentMethod,
  checkbalanceValueInfo,
  onGetBalanceCard,
  change,
  handleSubmit,
}: Props) => {
  const isCreditCard = card.ccType !== 'GiftCard' && card.ccType !== 'VENMO';
  const isVenmo = card.ccType === 'VENMO';
  const isGiftCard = card.ccType === 'GiftCard';
  const balance = getGiftCardBalance(card.accountNo, checkbalanceValueInfo);
  const cardName = getCardName({ card, labels });
  const cardIcon = getIconCard(cardIconMapping[card.ccBrand]);
  const dataLocatorPrefix = getDataLocatorPrefix({ card });
  const onMessage = event => {
    if (event && event.nativeEvent.data) {
      const value = get(event, 'nativeEvent.data', '');
      change('recaptchaToken', value);
    }
  };
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
      <CardTileDefaultSection isVenmo={isVenmo} isGiftCard={isGiftCard}>
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

      {isGiftCard && balance && (
        <CardCtaRow>
          <BodyCopy
            mobilefontFamily={['secondary']}
            fontSize="fs14"
            color="gray.900"
            text={labels.ACC_LBL_REMAINING_BALANCE}
          />
        </CardCtaRow>
      )}
      {isGiftCard && (balance === undefined || balance === null) && (
        <View>
          <RecaptchaContainer>
            <Recaptcha onMessage={onMessage} />
          </RecaptchaContainer>
          <Field
            label=""
            component={TextBox}
            title=""
            type="hidden"
            name="recaptchaToken"
            id="recaptchaToken"
            data-locator="gift-card-recaptchcb"
            className="visibility-recaptcha"
          />
        </View>
      )}
      {getCtaRow(
        isGiftCard,
        isVenmo,
        balance,
        labels,
        dataLocatorPrefix,
        card,
        onGetBalanceCard,
        handleSubmit
      )}
    </CardTileWrapper>
  );
};

const validateMethod = createValidateMethod(getStandardConfig(['recaptchaToken']));

export default reduxForm({
  form: 'CardTileForm', // a unique identifier for this form
  ...validateMethod,
  enableReinitialize: true,
})(CardTile);

export { CardTile as CardTileVanilla };
