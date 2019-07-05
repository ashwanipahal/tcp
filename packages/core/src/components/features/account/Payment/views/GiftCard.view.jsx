import React from 'react';
import { List } from 'immutable';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/Payment.style';
import DeleteGiftCardModal from './DeleteGiftCardModal.view';
import { GiftCardList } from './GiftCardList.view';

// @flow

type Props = {
  className: string,
  labels: object,
  setDeleteModalMountState: Function,
  deleteModalMountedState: false,
  giftCards: List<{}>,
  onDeleteAddress: Function,
};

export class GiftCardView extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedGiftCard: {},
    };
  }

  setSelectedGiftCard = giftCard => {
    this.setState({ selectedGiftCard: giftCard });
  };

  render() {
    const {
      className,
      labels,
      setDeleteModalMountState,
      deleteModalMountedState,
      onDeleteCard,
      giftCards,
    } = this.props;
    const { selectedGiftCard } = this.state;
    return (
      <div className={className}>
        <GiftCardList
          deleteModalMountedState={deleteModalMountedState}
          setDeleteModalMountState={setDeleteModalMountState}
          setSelectedGiftCard={this.setSelectedGiftCard}
        />
        <DeleteGiftCardModal
          openState={deleteModalMountedState}
          data={{
            heading: labels.giftCard.heading,
            description: selectedGiftCard,
            buttons: {
              cancel: labels.giftCard.cancel,
              confirm: labels.giftCard.confirm,
            },
          }}
          labels={labels}
          onDeleteCard={onDeleteCard}
          setDeleteModalMountState={setDeleteModalMountState}
        />
      </div>
    );
  }
}
export default withStyles(GiftCardView, styles);
