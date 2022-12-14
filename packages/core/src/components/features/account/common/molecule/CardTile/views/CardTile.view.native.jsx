import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import get from 'lodash/get';
import { View, Text } from 'react-native';
import RecaptchaModal from '@tcp/core/src/components/common/molecules/recaptcha/recaptchaModal.native';
import { getLabelValue } from '@tcp/core/src/utils/utils';
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
} from '../CardTile.style.native';
import { getIconCard } from '../../../../../../../utils/index.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import CustomButton from '../../../../../../common/atoms/Button';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';

class CardTile extends React.Component {
  static propTypes = {
    card: PropTypes.shape({}),
    labels: PropTypes.shape({}),
    setDefaultPaymentMethod: PropTypes.func,
    onGetBalanceCard: PropTypes.func,
    handleSubmit: PropTypes.func,
    toggleModal: PropTypes.func,
    openUpdateModal: PropTypes.func,
    setSelectedCard: PropTypes.func,
    checkbalanceValueInfo: PropTypes.instanceOf(Map),
  };

  static defaultProps = {
    card: {},
    labels: {},
    setDefaultPaymentMethod: () => {},
    onGetBalanceCard: () => {},
    handleSubmit: () => {},
    toggleModal: () => {},
    openUpdateModal: () => {},
    setSelectedCard: () => {},
    checkbalanceValueInfo: new Map(),
  };

  cardIconMapping = {
    DISC: 'disc-small',
    MC: 'mc-small',
    Amex: 'amex-small',
    Visa: 'visa-small',
    GC: 'gift-card-small',
    'PLACE CARD': 'place-card-small',
    VENMO: 'venmo-blue-acceptance-mark',
  };

  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      setRecaptchaModalMountedState: false,
    };
  }

  getCardName = ({ card, labels }) => {
    switch (card.ccType) {
      case 'GiftCard':
        return getLabelValue(labels, 'lbl_payment_giftCard', 'paymentGC');
      case 'PLACE CARD':
        return getLabelValue(labels, 'lbl_payment_plccCard', 'paymentGC');
      case 'VENMO':
        return getLabelValue(labels, 'lbl_payment_venmoAccount', 'paymentGC');
      default:
        return getLabelValue(labels, 'lbl_payment_defaultCardName', 'paymentGC');
    }
  };

  setRecaptchaModalMountState = () => {
    const { setRecaptchaModalMountedState } = this.state;
    this.setState({
      setRecaptchaModalMountedState: !setRecaptchaModalMountedState,
    });
  };

  onClose = () => {
    this.setDeleteModalMountState({
      setDeleteModalMountedState: false,
      setUpdateModalMountedState: false,
    });
  };

  /**
   * Get the gift card balances
   * @param {*} key
   * @param {*} checkbalanceValueInfo
   */
  getGiftCardBalance = (key, checkbalanceValueInfo) => {
    return checkbalanceValueInfo && checkbalanceValueInfo.get(key);
  };

  getDataLocatorPrefix = ({ card }) => {
    switch (card.ccType) {
      case 'GiftCard':
        return 'giftcard';
      case 'VENMO':
        return 'venmo';
      default:
        return 'creditdebit';
    }
  };

  handleDefaultLinkClick = (e, card, setDefaultPaymentMethod) => {
    e.preventDefault();
    setDefaultPaymentMethod(card);
  };

  getMakeDefaultBadge = ({ card, labels, setDefaultPaymentMethod }) => {
    return card.defaultInd ? (
      <DefaultBadgeWrapper>
        <BadgeContent>
          <BodyCopy
            mobilefontFamily={['secondary']}
            fontWeight="semibold"
            fontSize="fs10"
            text={getLabelValue(labels, 'lbl_payment_defaultPayment', 'paymentGC')}
          />
        </BadgeContent>
      </DefaultBadgeWrapper>
    ) : (
      <Anchor
        fontSizeVariation="small"
        underline
        to="/#"
        anchorVariation="primary"
        dataLocator="payment-makedefault"
        onPress={e => this.handleDefaultLinkClick(e, card, setDefaultPaymentMethod)}
        text={getLabelValue(labels, 'lbl_common_makeDefault', 'common')}
      />
    );
  };

  getVenmoUserName = ({ card }) => {
    return (
      card.properties && (
        <VenmoCardTileHeading dataLocator="payment-venmoid">
          <BodyCopy fontSize="fs14" fontWeight="extrabold" text={card.properties.venmoUserId} />
        </VenmoCardTileHeading>
      )
    );
  };

  getCardDetails = ({ dataLocatorPrefix, card, labels }) => {
    const cardNum = `${getLabelValue(
      labels,
      'lbl_payment_cardNum',
      'paymentGC'
    )}${card.accountNo.slice(-4)}`;
    const expDate = `${getLabelValue(
      labels,
      'lbl_payment_expDate',
      'paymentGC'
    )}${card.expMonth.trim()}/${card.expYear}`;
    return (
      <View>
        <BodyCopy
          fontSize="fs14"
          fontWeight="black"
          dataLocator={`payment-${dataLocatorPrefix}endingtext`}
          text={cardNum}
        />
        {card.ccType !== 'PLACE CARD' && card.ccType !== 'GiftCard' && (
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

  getAddressDetails = ({ card }) => {
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

  handleGetGiftCardBalanceClick = (formData, card, onGetBalanceCard) => {
    onGetBalanceCard({ formData, card });
  };

  onDeleteCardClick = e => {
    e.preventDefault();
    const { card, toggleModal, setSelectedCard } = this.props;
    setSelectedCard(card);
    toggleModal({ state: true });
  };

  onUpdateCardClick = e => {
    e.preventDefault();
    const { card, openUpdateModal, setSelectedCard } = this.props;
    setSelectedCard(card);
    openUpdateModal(false);
  };

  getCtaRow = (
    isGiftCard,
    isVenmo,
    balance,
    labels,
    dataLocatorPrefix
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
            text={getLabelValue(labels, 'lbl_payment_checkBalance', 'paymentGC')}
            buttonVariation="fixed-width"
            onPress={e => this.setRecaptchaModalMountState(e)}
          />
        )}

        <CardCtaLinks>
          {!isVenmo && !isGiftCard && (
            <Anchor
              fontSizeVariation="large"
              underline
              anchorVariation="primary"
              dataLocator={`payment-${dataLocatorPrefix}editlink`}
              text={getLabelValue(labels, 'lbl_common_edit', 'common')}
              onPress={e => this.onUpdateCardClick(e)}
            />
          )}
          <CardCtaLinkMargin />
          <Anchor
            fontSizeVariation="large"
            underline
            anchorVariation="primary"
            dataLocator={`payment-${dataLocatorPrefix}deletelink`}
            text={getLabelValue(labels, 'lbl_common_delete', 'common')}
            onPress={e => this.onDeleteCardClick(e)}
          />
        </CardCtaLinks>
      </CardCtaRow>
    );
  };

  recaptchaRender({ setRecaptchaModalMountedState, onMessage }) {
    return (
      <React.Fragment>
        {setRecaptchaModalMountedState && (
          <RecaptchaModal
            onMessage={onMessage}
            setRecaptchaModalMountedState={setRecaptchaModalMountedState}
            toggleRecaptchaModal={this.setRecaptchaModalMountState}
            onClose={this.onClose}
          />
        )}
      </React.Fragment>
    );
  }

  render() {
    const {
      card,
      labels,
      setDefaultPaymentMethod,
      checkbalanceValueInfo,
      onGetBalanceCard,
      handleSubmit,
    } = this.props;
    const { setRecaptchaModalMountedState } = this.state;

    const isCreditCard = card.ccType !== 'GiftCard' && card.ccType !== 'VENMO';
    const isVenmo = card.ccType === 'VENMO';
    const isGiftCard = card.ccType === 'GiftCard';
    const balance = this.getGiftCardBalance(card.accountNo, checkbalanceValueInfo);
    const cardName = this.getCardName({ card, labels });
    const cardIcon = getIconCard(this.cardIconMapping[card.ccBrand]);
    const dataLocatorPrefix = this.getDataLocatorPrefix({ card });
    const onMessage = event => {
      if (event && event.nativeEvent.data) {
        const value = get(event, 'nativeEvent.data', '');
        if (value) {
          const formData = { recaptchaToken: value };
          this.setRecaptchaModalMountState();
          onGetBalanceCard({ formData, card });
        }
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
          {isCreditCard
            ? this.getMakeDefaultBadge({
                card,
                labels,
                setDefaultPaymentMethod,
              })
            : null}
        </CardTileContext>
        <CardTileDefaultSection isVenmo={isVenmo} isGiftCard={isGiftCard}>
          {isVenmo
            ? this.getVenmoUserName({ card })
            : this.getCardDetails({ dataLocatorPrefix, card, labels })}
          <CardTileImgWrapper card={card}>
            <CardTileImg
              className="cardTile__img"
              alt={card.ccBrand}
              source={cardIcon}
              data-locator="payment-cardImage"
            />
          </CardTileImgWrapper>
        </CardTileDefaultSection>
        {isCreditCard ? this.getAddressDetails({ card }) : null}

        {isGiftCard && balance && (
          <CardCtaRow>
            <BodyCopy
              mobilefontFamily={['secondary']}
              fontSize="fs14"
              color="gray.900"
              text={getLabelValue(labels, 'lbl_payment_remainingBalance', 'paymentGC')}
            />
          </CardCtaRow>
        )}
        {isGiftCard && (balance === undefined || balance === null) && (
          <View>
            {this.recaptchaRender({
              labels,
              onMessage,
              setRecaptchaModalMountedState,
            })}
            {/* <Field
              label=""
              component={TextBox}
              title=""
              type="hidden"
              name="recaptchaToken"
              id="recaptchaToken"
              data-locator="gift-card-recaptchcb"
              className="visibility-recaptcha"
            /> */}
          </View>
        )}
        {this.getCtaRow(
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
  }
}

const validateMethod = createValidateMethod(getStandardConfig(['recaptchaToken']));

export default reduxForm({
  form: 'CardTileForm', // a unique identifier for this form
  ...validateMethod,
  enableReinitialize: true,
})(CardTile);

export { CardTile as CardTileVanilla };
