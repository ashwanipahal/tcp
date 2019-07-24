import React from 'react';
import { Heading } from '@tcp/core/styles/themes/TCP/typotheme';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import withStyles from '../../../../../common/hoc/withStyles';
import styles from '../styles/AddGiftCard.style';
import Anchor from '../../../../../common/atoms/Anchor';
import AddGiftCardForm from './AddGiftCardForm';

// @flow
type Props = {
  className: String,
  onAddGiftCardClick: Function,
  addGiftCardResponse: String,
  goBackToPayment: Function,
  labels: Object,
};

class AddGiftCard extends React.PureComponent<Props> {
  render() {
    const {
      onAddGiftCardClick,
      className,
      addGiftCardResponse,
      labels,
      goBackToPayment,
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
          {labels.ACC_LBL_BACK}
        </Anchor>
        <Heading
          fontFamily="primaryFontFamily"
          HeadingLarge="six"
          tag="h4"
          className="card__separator"
          dataLocator="gift-card-addcardheader"
        >
          {labels.ACC_LBL_ADD_GIFT_CARD}
        </Heading>
        {addGiftCardResponse && (
          <Notification
            status={addGiftCardResponse}
            colSize={{ large: 12, medium: 8, small: 6 }}
            message={
              addGiftCardResponse === 'success'
                ? labels.ACC_LBL_OP_SUCCESS
                : labels.ACC_LBL_OP_FAILURE
            }
          />
        )}
        <AddGiftCardForm
          onAddGiftCardClick={onAddGiftCardClick}
          labels={labels}
          goBackToPayment={goBackToPayment}
        />
      </div>
    );
  }
}

export default withStyles(AddGiftCard, styles);
export { AddGiftCard as AddGiftCardVanilla };
