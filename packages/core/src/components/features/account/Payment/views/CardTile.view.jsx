import React from 'react';
import { Field, reduxForm } from 'redux-form';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Anchor from '../../../../common/atoms/Anchor';
import Recaptcha from '../../../../common/molecules/recaptcha/recaptcha';
import TextBox from '../../../../common/atoms/TextBox';
import { required } from '../../../../../utils/FormValidation';
import styles from '../styles/CardTile.style';
// @flow

type Props = {
  className: string,
  setDeleteModalMountState: Function,
  setSelectedGiftCard: Function,
  giftcard: Object,
  change: any,
  handleSubmit: any,
  onGetBalanceCard: Function,
  checkbalanceValueInfo: any,
};

class CardTile extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isTokenDirty: false,
      HideCaptchaBtn: false,
    };
    this.handleCheckBalanceClick = this.handleCheckBalanceClick.bind(this);
  }

  onDeletegiftardClick = e => {
    const { giftcard, setDeleteModalMountState, setSelectedGiftCard } = this.props;
    e.preventDefault();
    setSelectedGiftCard(giftcard);
    setDeleteModalMountState({ state: true });
  };

  handleRecaptchaVerify = token => {
    const { change } = this.props;

    change('recaptchaToken', token);

    this.setState({
      isTokenDirty: false,
    });
  };

  handleRecaptchaExpired = () => {
    const { change } = this.props;
    change('recaptchaToken', '');
  };

  attachReCaptchaRef = ref => {
    this.recaptcha = ref;
  };

  handleCheckBalanceClick(e) {
    const { isTokenDirty } = this.state;
    const { change, handleSubmit, giftcard } = this.props;
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

      onGetBalanceCard({ formData, giftcard });
      this.setState({
        HideCaptchaBtn: true,
      });
    })();
  }

  render() {
    const { className, checkbalanceValueInfo } = this.props;
    const { HideCaptchaBtn } = this.state;
    return (
      <div className={className}>
        <form
          Form={checkbalanceValueInfo.giftCardNbr}
          onSubmit={this.handleSubmit}
          autoComplete="off"
        >
          <div className="giftardTile__row">
            {!HideCaptchaBtn && (
              <Recaptcha
                ref={this.attachReCaptchaRef}
                onloadCallback={this.handleRecaptchaOnload}
                verifyCallback={this.handleRecaptchaVerify}
                expiredCallback={this.handleRecaptchaExpired}
              />
            )}
            {HideCaptchaBtn && (
              <div>
                <span>{checkbalanceValueInfo.giftCardAuthorizedAmt}</span>
                <span>{checkbalanceValueInfo.giftCardNbr}</span>
              </div>
            )}

            <Field
              component={TextBox}
              title=""
              type="hidden"
              placeholder="recaptcha value"
              validate={[required]}
              name="recaptchaToken"
            />
            {!HideCaptchaBtn && (
              <button
                type="submit"
                onClick={this.handleCheckBalanceClick}
                className="gift-card-balance button-tertiary"
              >
                Check Balance
              </button>
            )}
            <Anchor
              fontSizeVariation="large"
              underline
              to="/#"
              anchorVariation="primary"
              onClick={e => this.onDeletegiftardClick(e)}
            >
              delete
            </Anchor>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(
  reduxForm({
    form: 'CardTile', // a unique identifier for this form
  })(CardTile),
  styles
);

// export default withStyles(CardTile, styles);
// export { CardTile as CardTileTileVanilla };
