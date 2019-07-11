import React from 'react';
import { Heading } from '@tcp/core/styles/themes/TCP/typotheme';
import withStyles from '../../../../../common/hoc/withStyles';
import styles from '../styles/AddGiftCard.style';
import Anchor from '../../../../../common/atoms/Anchor';
import AddGiftCardForm from './AddGiftCardForm';
import labels from '../container/AddGiftCard.labels';

// @flow
type Props = {
  className: String,
};

class AddGiftCard extends React.PureComponent<Props> {
  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <Anchor
          fontSizeVariation="xlarge"
          anchorVariation="secondary"
          to="/account/payment/"
          dataLocator="gift-card-addcardbacklink"
        >
          Back
        </Anchor>
        <Heading
          fontFamily="secondaryFontFamily"
          HeadingLarge="six"
          tag="h4"
          className="addGiftCard__separator"
          dataLocator="gift-card-addcardheader"
        >
          {labels.ACC_LBL_ADD_GIFT_CARD}
        </Heading>
        <AddGiftCardForm />
      </div>
    );
  }
}

export default withStyles(AddGiftCard, styles);
export { AddGiftCard as AddGiftCardVanilla };
