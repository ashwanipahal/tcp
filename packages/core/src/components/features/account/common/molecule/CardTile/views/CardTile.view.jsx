import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Badge from '../../../../../../common/atoms/Badge';
import Anchor from '../../../../../../common/atoms/Anchor';
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
    this.state = { isTokenDirty: false, HideCaptchaBtn: false, balance: null };
    this.handleCheckBalanceClick = this.handleCheckBalanceClick.bind(this);
  }

  componentWillUnmount() {
    const { form, dispatch } = this.props;
    dispatch(reset(form));
  }

  getMakeDefaultBadge = () => {
    const { card, labels } = this.props;
    return card.defaultInd ? (
      <Badge showCheckmark dataLocator="payment-carddefaultpaymentbadge">
        {labels.ACC_LBL_DEFAULT_PAYMENT}
      </Badge>
    ) : (
      <Anchor
        fontSizeVariation="small"
        underline
        to="/#"
        anchorVariation="primary"
        data-locator="payment-makedefault"
        onClick={this.handleDefaultLinkClick}
      >
        {labels.ACC_LBL_MAKE_DEFAULT}
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
          dataLocator="payment-venmoid"
        >
          {card.properties.venmoUserId}
        </BodyCopy>
      )
    );
  };

  getCardDetails = dataLocatorPrefix => {
    const { card, labels } = this.props;
    const cardNum = `${labels.ACC_LBL_CARD_NUM}${card.accountNo.slice(-4)}`;
    const expDate = `${labels.ACC_LBL_EXP_DATE}${card.expMonth.trim()}/${card.expYear}`;
    return (
      <React.Fragment>
        <BodyCopy
          tag="span"
          fontSize="fs14"
          fontFamily="secondary"
          fontWeight="black"
          className="cardTile__number"
          lineHeights="lh107"
          dataLocator={`payment-${dataLocatorPrefix}endingtext`}
        >
          {cardNum}
        </BodyCopy>
        {card.ccType !== 'PLACE CARD' && (
          <BodyCopy
            tag="span"
            fontSize="fs14"
            fontFamily="secondary"
            fontWeight="semibold"
            className="cardTile__expiry"
            lineHeights="lh115"
            dataLocator={`payment-${dataLocatorPrefix}expiretext`}
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

  static getDerivedStateFromProps(prevProps) {
    if (
      prevProps.checkbalanceValueInfo &&
      prevProps.card.accountNo === prevProps.checkbalanceValueInfo.giftCardNbr
    ) {
      return { balance: prevProps.checkbalanceValueInfo.giftCardAuthorizedAmt };
    }
    return null;
  }

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

  renderBalance = ({ HideCaptchaBtn, balance, labels }) => {
    const { card, checkbalanceValueInfo } = this.props;
    const isCreditCard = card.ccType !== 'GiftCard' && card.ccType !== 'VENMO';
    const isVenmo = card.ccType === 'VENMO';
    return (
      <React.Fragment>
        {HideCaptchaBtn && (
          <BodyCopy
            tag="span"
            fontSize="fs28"
            fontFamily="secondary"
            fontWeight="extrabold"
            className=""
            lineHeights="lh115"
          >
            {balance}
          </BodyCopy>
        )}
        {!HideCaptchaBtn && !isVenmo && !isCreditCard && (
          <Button
            onClick={this.handleCheckBalanceClick}
            buttonVariation="variable-width"
            type="submit"
            data-locator="gift-card-recaptchcb"
            fill="BLUE"
            disabled={HideCaptchaBtn && !checkbalanceValueInfo.giftCardNbr}
          >
            {labels.ACC_LBL_CHECK_BALANCE}
          </Button>
        )}
      </React.Fragment>
    );
  };

  remainBalance = () => {
    const { card, checkbalanceValueInfo, labels } = this.props;
    const { HideCaptchaBtn, balance } = this.state;
    return (
      <React.Fragment>
        {HideCaptchaBtn && !checkbalanceValueInfo.giftCardNbr && (
          <BodyCopy
            tag="span"
            fontSize="fs24"
            fontFamily="secondary"
            fontWeight="extrabold"
            className=""
            lineHeights="lh115"
          >
            {labels.ACC_LBL_LOADING}
          </BodyCopy>
        )}
        {HideCaptchaBtn && checkbalanceValueInfo.giftCardNbr === card.accountNo && (
          <BodyCopy
            tag="span"
            fontSize="fs14"
            fontFamily="secondary"
            fontWeight="semibold"
            className=""
            lineHeights="lh115"
          >
            {balance && labels.ACC_LBL_REMAINING_BALANCE}
          </BodyCopy>
        )}
        {this.renderBalance({ HideCaptchaBtn, balance, labels })}
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
      this.setState({ HideCaptchaBtn: true });
    })();
  };

  handleDefaultLinkClick = event => {
    const { card, setDefaultPaymentMethod } = this.props;
    event.preventDefault();
    setDefaultPaymentMethod(card);
  };

  renderCtaLinks = ({ isCreditCard, dataLocatorPrefix }) => {
    const { labels } = this.props;
    return (
      <div className="cardTile__ctaLinks">
        {isCreditCard && (
          <Anchor
            fontSizeVariation="large"
            underline
            to="/#"
            anchorVariation="primary"
            data-locator={`payment-${dataLocatorPrefix}editlink`}
            className="cardTile__anchor"
          >
            {labels.ACC_LBL_EDIT}
          </Anchor>
        )}
        <Anchor
          className="cardTile__anchor"
          fontSizeVariation="large"
          underline
          to="/#"
          anchorVariation="primary"
          data-locator={`payment-${dataLocatorPrefix}deletelink`}
          onClick={e => this.onDeletegiftardClick(e)}
        >
          {labels.ACC_LBL_DELETE}
        </Anchor>
      </div>
    );
  };

  renderRecaptcha = ({ className, HideCaptchaBtn }) => {
    const { card, checkbalanceValueInfo, labels } = this.props;
    const isCreditCard = card.ccType !== 'GiftCard' && card.ccType !== 'VENMO';
    const isVenmo = card.ccType === 'VENMO';
    return (
      <form name={className} onSubmit={this.handleSubmit} autoComplete="off" noValidate>
        <div className="giftcardTile__row">
          {!HideCaptchaBtn && !isCreditCard && (
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
          />
          {this.remainBalance()}
          {!HideCaptchaBtn && !isVenmo && !isCreditCard && (
            <Button
              onClick={this.handleCheckBalanceClick}
              buttonVariation="variable-width"
              type="submit"
              data-locator="cardtile-checkbalance"
              fill="BLUE"
              disabled={HideCaptchaBtn && !checkbalanceValueInfo.giftCardNbr}
            >
              {labels.ACC_LBL_CHECK_BALANCE}
            </Button>
          )}
        </div>
      </form>
    );
  };

  render() {
    const { card, className, showNotificationCaptcha, labels, form } = this.props;
    const { HideCaptchaBtn } = this.state;
    const isCreditCard = card.ccType !== 'GiftCard' && card.ccType !== 'VENMO';
    const isVenmo = card.ccType === 'VENMO';
    const cardName = getCardName({ card, labels });
    const cardIcon = getIconPath(cardIconMapping[card.ccBrand]);
    const dataLocatorPrefix = getDataLocatorPrefix({ card });
    const { balance } = this.state;
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
          <div className="cardTile__cardDetails">
            <BodyCopy
              tag="span"
              fontSize="fs16"
              fontFamily="secondary"
              fontWeight="normal"
              className="cardTile__heading"
              dataLocator={`payment-${dataLocatorPrefix}nametitle`}
            >
              {cardName}
            </BodyCopy>
            {isVenmo ? this.getVenmoUserName() : this.getCardDetails(dataLocatorPrefix)}
            {isCreditCard ? getAddressDetails({ card }) : null}
          </div>
          <div className="cardTile__defaultSection">
            {isCreditCard ? this.getMakeDefaultBadge() : null}
            <div className="cardTile__img_wrapper">
              <img className="cardTile__img" alt="" src={cardIcon} />
            </div>
          </div>
        </div>
        {card.ccType === 'GiftCard' && (
          <div className="giftcardTile__wrapper">
            <form name={form} onSubmit={this.handleSubmit} autoComplete="off" noValidate>
              <div className="giftcardTile__row">
                {!HideCaptchaBtn && !isVenmo && !isCreditCard && (
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
                />
                {loading(labels, HideCaptchaBtn, balance)}
                {this.remainBalance()}
              </div>
            </form>
          </div>
        )}
        {this.renderCtaLinks({ isCreditCard, dataLocatorPrefix })}
      </div>
    );
  }
}
const validateMethod = createValidateMethod(getStandardConfig(['recaptchaToken']));
export default reduxForm({ destroyOnUnmount: false, enableReinitialize: true, ...validateMethod })(
  withStyles(CardTile, styles)
);
export { CardTile as CardTileVanilla };
