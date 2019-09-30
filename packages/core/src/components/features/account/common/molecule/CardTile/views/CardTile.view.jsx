import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Badge from '../../../../../../common/atoms/Badge';
import Anchor from '../../../../../../common/atoms/Anchor';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../CardTile.style';
import { getIconPath } from '../../../../../../../utils';
import PAYMENT_CONSTANTS from '../../../../Payment/Payment.constants';
import Recaptcha from '../../../../../../common/molecules/recaptcha/recaptcha';
import TextBox from '../../../../../../common/atoms/TextBox';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import {
  getDataLocatorPrefix,
  getCardName,
  cardIconMapping,
  getAddressDetails,
  loading,
} from './CardTile.utils';
import Button from '../../../../../../common/atoms/Button';
// @flow
type Props = {
  card: object,
  className: string,
  labels: object,
  setDefaultPaymentMethod: Function,
  setDeleteModalMountState: Function,
  setSelectedGiftCard: Function,
  change: any,
  handleSubmit: any,
  onGetBalanceCard: Function,
  checkbalanceValueInfo: any,
  showNotificationCaptcha: any,
  form: any,
  dispatch: Function,
};
class CardTile extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.paymentMethodId = PAYMENT_CONSTANTS.CREDIT_CARDS_PAYMETHODID;
    this.state = {
      isTokenDirty: false,
    };
    this.handleCheckBalanceClick = this.handleCheckBalanceClick.bind(this);
  }

  componentWillUnmount() {
    const { form, dispatch } = this.props;
    dispatch(reset(form));
  }

  getIfGiftCardBalanceRequested = key => {
    const { checkbalanceValueInfo } = this.props;
    return checkbalanceValueInfo && checkbalanceValueInfo.has(key);
  };

  getGiftCardBalance = key => {
    const { checkbalanceValueInfo } = this.props;
    const balance = checkbalanceValueInfo && checkbalanceValueInfo.get(key);
    return typeof balance === 'number' ? balance.toString() : balance;
  };

  getMakeDefaultBadge = () => {
    const { card, labels } = this.props;
    return card.defaultInd ? (
      <Badge showCheckmark dataLocator="payment-carddefaultpaymentbadge" noMargin>
        {labels.paymentGC.lbl_payment_defaultPayment}
      </Badge>
    ) : (
      <Anchor
        fontSizeVariation="small"
        underline
        to="/#"
        anchorVariation="primary"
        dataLocator="payment-makedefault"
        onClick={this.handleDefaultLinkClick}
      >
        {labels.common.lbl_common_makeDefault}
      </Anchor>
    );
  };

  getVenmoUserName = () => {
    const { card } = this.props;
    return (
      card.properties && (
        <BodyCopy
          tag="span"
          fontSize="fs14"
          fontFamily="secondary"
          fontWeight="extrabold"
          className="cardTile__heading"
          lineHeights="lh107"
          data-locator="payment-venmoid"
        >
          {card.properties.venmoUserId}
        </BodyCopy>
      )
    );
  };

  getCardDetails = dataLocatorPrefix => {
    const { card, labels } = this.props;
    const cardNum = `${labels.paymentGC.lbl_payment_cardNum}${card.accountNo.slice(-4)}`;
    const expDate = `${labels.paymentGC.lbl_payment_expDate}${card.expMonth.trim()}/${
      card.expYear
    }`;
    return (
      <React.Fragment>
        <BodyCopy
          component="span"
          fontSize="fs14"
          fontFamily="secondary"
          fontWeight="bold"
          className="cardTile__number"
          lineHeights="lh107"
          data-locator={`payment-${dataLocatorPrefix}endingtext`}
        >
          {cardNum}
        </BodyCopy>
        {card.ccType !== 'PLACE CARD' && card.ccType !== 'GiftCard' && (
          <BodyCopy
            tag="span"
            fontSize="fs14"
            fontFamily="secondary"
            fontWeight="semibold"
            className="cardTile__expiry"
            lineHeights="lh115"
            data-locator={`payment-${dataLocatorPrefix}expiretext`}
          >
            {expDate}
          </BodyCopy>
        )}
      </React.Fragment>
    );
  };

  onDeletegiftardClick = e => {
    const { card, setDeleteModalMountState, setSelectedGiftCard } = this.props;
    e.preventDefault();
    setSelectedGiftCard(card);
    setDeleteModalMountState({ state: true });
  };

  handleRecaptchaVerify = token => {
    const { change } = this.props;
    change('recaptchaToken', token);
    this.setState({ isTokenDirty: false });
  };

  handleRecaptchaExpired = () => {
    const { change } = this.props;
    change('recaptchaToken', '');
  };

  attachReCaptchaRef = ref => {
    this.recaptcha = ref;
  };

  renderBalance = ({ labels, balance, isGiftCardBalanceRequested }) => {
    return (
      <React.Fragment>
        {balance && (
          <BodyCopy
            tag="span"
            fontSize="fs28"
            fontFamily="secondary"
            fontWeight="extrabold"
            className=""
            lineHeights="lh115"
          >
            {`$${balance}`}
          </BodyCopy>
        )}
        {!isGiftCardBalanceRequested && (
          <Button
            onClick={this.handleCheckBalanceClick}
            buttonVariation="variable-width"
            type="submit"
            data-locator="gift-card-checkbalance-btn"
            fill="BLUE"
          >
            {labels.paymentGC.lbl_payment_checkBalance}
          </Button>
        )}
      </React.Fragment>
    );
  };

  remainBalance = (isGiftCardBalanceRequested, balance) => {
    const { labels } = this.props;
    return (
      <React.Fragment>
        {balance && (
          <BodyCopy
            tag="span"
            fontSize="fs14"
            fontFamily="secondary"
            fontWeight="semibold"
            className=""
            lineHeights="lh115"
          >
            {balance && labels.paymentGC.lbl_payment_remainingBalance}
          </BodyCopy>
        )}
        {this.renderBalance({ balance, isGiftCardBalanceRequested, labels })}
      </React.Fragment>
    );
  };

  handleCheckBalanceClick = e => {
    const { isTokenDirty } = this.state;
    const { change, handleSubmit, card } = this.props;
    e.preventDefault();
    if (isTokenDirty) {
      change('recaptchaToken', '');
      this.setState({
        isTokenDirty: false,
      });
      return;
    }

    handleSubmit(formData => {
      const { onGetBalanceCard } = this.props;
      onGetBalanceCard({ formData, card });
    })();
  };

  handleDefaultLinkClick = event => {
    const { card, setDefaultPaymentMethod } = this.props;
    event.preventDefault();
    setDefaultPaymentMethod(card);
  };

  renderCtaLinks = ({ isCreditCard, dataLocatorPrefix, creditCardId }) => {
    const { labels } = this.props;
    return (
      <div className="cardTile__ctaLinks">
        {isCreditCard && (
          <Anchor
            fontSizeVariation="large"
            underline
            to={`/account?id=edit-credit-card&creditCardId=${creditCardId}`}
            asPath={`/account/address-book/edit-credit-card/${creditCardId}`}
            anchorVariation="primary"
            dataLocator={`payment-${dataLocatorPrefix}editlink`}
            className="cardTile__anchor"
          >
            {labels.common.lbl_common_edit}
          </Anchor>
        )}
        <Anchor
          className="cardTile__anchor"
          fontSizeVariation="large"
          underline
          to="/#"
          anchorVariation="primary"
          dataLocator={`payment-${dataLocatorPrefix}deletelink`}
          onClick={e => this.onDeletegiftardClick(e)}
        >
          {labels.common.lbl_common_delete}
        </Anchor>
      </div>
    );
  };

  getCardImage = ({ card, cardIcon }) => {
    let cardTopMargin = 'elem-mt-XL';
    if (card.defaultInd) {
      cardTopMargin = 'elem-mt-XS';
    } else if (card.ccType !== 'GiftCard' && card.ccType !== 'VENMO') {
      cardTopMargin = 'elem-mt-MED';
    }
    return (
      <div className={`cardTile__img_wrapper ${cardTopMargin}`}>
        <img
          className="cardTile__img"
          data-locator={card.ccBrand}
          alt={card.ccType}
          src={cardIcon}
        />
      </div>
    );
  };

  render() {
    const { card, className, showNotificationCaptcha, labels, form } = this.props;
    const isCreditCard = card.ccType !== 'GiftCard' && card.ccType !== 'VENMO';
    const isVenmo = card.ccType === 'VENMO';
    const cardName = getCardName({ card, labels });
    const cardIcon = getIconPath(cardIconMapping[card.ccBrand]);
    const dataLocatorPrefix = getDataLocatorPrefix({ card });
    const { creditCardId } = card;

    const isGiftCardBalanceRequested = this.getIfGiftCardBalanceRequested(card.accountNo);
    const balance = this.getGiftCardBalance(card.accountNo);
    return (
      <div className={className}>
        {showNotificationCaptcha && (
          <Notification
            status="error"
            colSize={{ large: 12, medium: 8, small: 6 }}
            message="INVLAID CAPTCHA"
          />
        )}
        <div className="cardTile">
          <Row fullBleed>
            <Col
              colSize={{
                small: 3,
                large: 7,
                medium: 4,
              }}
            >
              <div className="cardTile__cardDetails">
                <BodyCopy
                  tag="span"
                  fontSize="fs16"
                  fontFamily="secondary"
                  fontWeight="normal"
                  className="cardTile__heading"
                  data-locator={`payment-${dataLocatorPrefix}nametitle`}
                >
                  {cardName}
                </BodyCopy>
                {isVenmo ? this.getVenmoUserName() : this.getCardDetails(dataLocatorPrefix)}
                {isCreditCard ? getAddressDetails({ card }) : null}
              </div>
            </Col>
            <Col
              colSize={{
                small: 3,
                large: 5,
                medium: 4,
              }}
            >
              <div className="cardTile__defaultSection">
                {isCreditCard ? this.getMakeDefaultBadge() : null}
                {this.getCardImage({ card, cardIcon })}
              </div>
            </Col>
          </Row>
        </div>
        {card.ccType === 'GiftCard' && (
          <div className="giftcardTile__wrapper">
            <form name={form} onSubmit={this.handleSubmit} autoComplete="off" noValidate>
              <div className="giftcardTile__row">
                {!isGiftCardBalanceRequested && (
                  <Recaptcha
                    ref={this.attachReCaptchaRef}
                    onloadCallback={this.handleRecaptchaOnload}
                    verifyCallback={this.handleRecaptchaVerify}
                    expiredCallback={this.handleRecaptchaExpired}
                  />
                )}
                <Field
                  component={TextBox}
                  title=""
                  type="hidden"
                  placeholder="recaptcha value"
                  name="recaptchaToken"
                  id="recaptchaToken"
                  data-locator="gift-card-recaptchcb"
                />

                {loading(isGiftCardBalanceRequested, labels, balance)}
                {this.remainBalance(isGiftCardBalanceRequested, balance)}
              </div>
            </form>
          </div>
        )}
        {this.renderCtaLinks({ isCreditCard, dataLocatorPrefix, creditCardId })}
      </div>
    );
  }
}
const validateMethod = createValidateMethod(getStandardConfig(['recaptchaToken']));

export default reduxForm({ destroyOnUnmount: false, enableReinitialize: true, ...validateMethod })(
  withStyles(CardTile, styles)
);
export { CardTile as CardTileVanilla };
