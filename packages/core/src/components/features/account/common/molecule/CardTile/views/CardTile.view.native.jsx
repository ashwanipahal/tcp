/* eslint-disable*/

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { get } from 'lodash';
import { View, Text } from 'react-native';
import RecaptchaModal from '@tcp/core/src/components/common/molecules/recaptcha/recaptchaModal.native';
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

var tokenflag = true;

// @flow

type Props = {};

class CardTile extends React.Component<Props> {
  static propTypes = {
    card: PropTypes.shape({}),
    labels: PropTypes.shape({}),
    setDefaultPaymentMethod: PropTypes.func,
    onGetBalanceCard: PropTypes.func,
    change: PropTypes.func,
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
    change: () => {},
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

  constructor(props) {
    super(props);
    this.state = {
      setRecaptchaModalMountedState: false,
      recaptchaToken: '',
    };
  }

  getCardName = ({ card, labels }) => {
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

  setRecaptchaModalMountState = () => {
    const { setRecaptchaModalMountedState } = this.state;
    this.setState({
      setRecaptchaModalMountedState: !setRecaptchaModalMountedState,
    });
  };

  /**
   * Get the gift card balance
   * @param {*} key
   * @param {*} checkbalanceValueInfo
   */
  getGiftCardBalance = (key, checkbalanceValueInfo) => {
    return checkbalanceValueInfo && checkbalanceValueInfo.get(key);
  };

  componentDidUpdate() {
    const {
      change,
      toggleRecaptchaModal,
      card,
      onGetBalanceCard,
      checkbalanceValueInfo,
    } = this.props;
    const { recaptchaToken } = this.state;
    debugger;
    // if (recaptchaToken) {
    //   const formData = { recaptchaToken };
    //   this.setRecaptchaModalMountState();
    //   onGetBalanceCard({ formData, card });

    // }
  }

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
        onPress={e => this.handleDefaultLinkClick(e, card, setDefaultPaymentMethod)}
        text={labels.common.lbl_common_makeDefault}
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
    const cardNum = `${labels.paymentGC.lbl_payment_cardNum}${card.accountNo.slice(-4)}`;
    const expDate = `${labels.paymentGC.lbl_payment_expDate}${card.expMonth.trim()}/${
      card.expYear
    }`;
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

  onClose = () => {
    this.setDeleteModalMountState({
      setDeleteModalMountedState: false,
      setUpdateModalMountedState: false,
    });
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

  // recaptchaModal = e => {
  //   const { toggleRecaptchaModal, change } = this.props;
  //   debugger
  //   e.preventDefault();
  //   toggleRecaptchaModal({ state: true });
  //   tokenflag = true;
  // };

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
          <>
            <CustomButton
              color="white"
              fill="BLUE"
              text="check balance captcha"
              buttonVariation="variable-width"
              onPress={e => this.setRecaptchaModalMountState(e)}
            />
          </>
        )}

        <CardCtaLinks>
          {!isVenmo && !isGiftCard && (
            <Anchor
              fontSizeVariation="large"
              underline
              anchorVariation="primary"
              data-locator={`payment-${dataLocatorPrefix}editlink`}
              text={labels.common.lbl_common_edit}
              onPress={e => this.onUpdateCardClick(e)}
            />
          )}
          <CardCtaLinkMargin />
          <Anchor
            fontSizeVariation="large"
            underline
            anchorVariation="primary"
            data-locator={`payment-${dataLocatorPrefix}deletelink`}
            text={labels.common.lbl_common_delete}
            onPress={e => this.onDeleteCardClick(e)}
          />
        </CardCtaLinks>
      </CardCtaRow>
    );
  };

  render() {
    const {
      card,
      labels,
      setDefaultPaymentMethod,
      checkbalanceValueInfo,
      onGetBalanceCard,
      recaptchaToken,
      handleSubmit,
      change,
    } = this.props;
    console.log('recaptchaToken==========================================', recaptchaToken);
    const onMessage = event => {
      if (event && event.nativeEvent.data) {
        const value = get(event, 'nativeEvent.data', '');
        if (value) {
          const formData = { recaptchaToken: value };
          debugger;
          this.setRecaptchaModalMountState();
          onGetBalanceCard({ formData, card });
        }
      }
    };

    const isCreditCard = card.ccType !== 'GiftCard' && card.ccType !== 'VENMO';
    const isVenmo = card.ccType === 'VENMO';
    const isGiftCard = card.ccType === 'GiftCard';
    const balance = this.getGiftCardBalance(card.accountNo, checkbalanceValueInfo);
    const cardName = this.getCardName({ card, labels });
    const cardIcon = getIconCard(this.cardIconMapping[card.ccBrand]);
    const dataLocatorPrefix = this.getDataLocatorPrefix({ card });
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
              text={labels.paymentGC.lbl_payment_remainingBalance}
            />
          </CardCtaRow>
        )}
        {isGiftCard && (balance === undefined || balance === null) && (
          <View>
            <React.Fragment>
              {this.state.setRecaptchaModalMountedState && (
                <RecaptchaModal
                  onMessage={onMessage}
                  labels={labels}
                  setRecaptchaModalMountedState={this.state.setRecaptchaModalMountedState}
                  toggleRecaptchaModal={this.setRecaptchaModalMountState}
                  onClose={this.onClose}
                />
              )}
            </React.Fragment>
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
