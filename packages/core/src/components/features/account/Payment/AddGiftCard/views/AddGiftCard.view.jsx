import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@tcp/core/styles/themes/TCP/typotheme';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import withStyles from '../../../../../common/hoc/withStyles';
import styles from '../styles/AddGiftCard.style';
import Anchor from '../../../../../common/atoms/Anchor';
import AddGiftCardForm from '../../../../../common/organisms/AddGiftCardForm/AddGiftCardForm';

// @flow
// type Props = {
//   className: String,
//   onAddGiftCardClick: Function,
//   addGiftCardResponse: String,
//   goBackToPayment: Function,
//   labels: Object,
//   formErrorMessage: Object,
// };

class AddGiftCard extends React.PureComponent<Props> {
  static propTypes = {
    className: PropTypes.string.isRequired,
    onAddGiftCardClick: PropTypes.func.isRequired,
    addGiftCardResponse: PropTypes.shape({}).isRequired,
    goBackToPayment: PropTypes.func.isRequired,
    labels: PropTypes.shape({}).isRequired,
    formErrorMessage: PropTypes.bool.isRequired,
    showNotification: PropTypes.bool.isRequired,
  };

  render() {
    const {
      onAddGiftCardClick,
      className,
      addGiftCardResponse,
      labels,
      goBackToPayment,
      formErrorMessage,
      showNotification,
    } = this.props;
    return (
      <div className={className}>
        <Anchor
          fontSizeVariation="xlarge"
          anchorVariation="secondary"
          to="/account?id=payment"
          dataLocator="gift-card-addcardbacklink"
          asPath="/account/payment"
        >
          {getLabelValue(labels, 'lbl_common_backLink', 'common')}
        </Anchor>
        <Heading
          fontFamily="primaryFontFamily"
          HeadingLarge="six"
          tag="h4"
          className="card__separator"
          dataLocator="gift-card-addcardheader"
        >
          {getLabelValue(labels, 'lbl_payment_addGiftCard', 'paymentGC')}
        </Heading>
        {addGiftCardResponse && showNotification && (
          <Notification
            status="error"
            colSize={{ large: 12, medium: 8, small: 6 }}
            message={addGiftCardResponse}
          />
        )}
        <AddGiftCardForm
          onAddGiftCardClick={onAddGiftCardClick}
          labels={labels && labels.paymentGC}
          goBackToPayment={goBackToPayment}
          formErrorMessage={formErrorMessage}
          isRecapchaEnabled
        />
      </div>
    );
  }
}

AddGiftCard.defaultProps = {
  className: '',
  onAddGiftCardClick: null,
  addGiftCardResponse: '',
  goBackToPayment: null,
  labels: {},
  formErrorMessage: {},
};

AddGiftCard.propTypes = {
  className: PropTypes.string,
  onAddGiftCardClick: PropTypes.func,
  addGiftCardResponse: PropTypes.string,
  goBackToPayment: PropTypes.func,
  labels: PropTypes.shape([]),
  formErrorMessage: PropTypes.shape([]),
};

export default withStyles(AddGiftCard, styles);
export { AddGiftCard as AddGiftCardVanilla };
