import React from 'react';
// import { List } from 'immutable'; we will use this once we remove mock
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/Payment.style';
import DeleteCardModal from './DeleteCardModal';
import { CardList } from './CardList.view';

// @flow

type Props = {
  className: string,
  labels: object,
  setDeleteModalMountState: Function,
  deleteModalMountedState: false,
  // giftCards: List<{}>, we will use this once we remove mock
  onDeleteCard: Function,
  showUpdatedNotificationOnModal: any,
};

export class CardView extends React.PureComponent<Props> {
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
      // giftCards, = we need this when we use real api instead of mock
      showUpdatedNotificationOnModal,
    } = this.props;
    const { selectedGiftCard } = this.state;
    return (
      <div className={className}>
        <CardList
          deleteModalMountedState={deleteModalMountedState}
          setDeleteModalMountState={setDeleteModalMountState}
          setSelectedGiftCard={this.setSelectedGiftCard}
        />
        <DeleteCardModal
          openState={deleteModalMountedState}
          data={{
            heading: labels.giftCard.heading,
            description: selectedGiftCard,
            buttons: {
              cancel: labels.giftCard.cancel,
              confirm: labels.giftCard.confirm,
            },
            cardText: {
              cardEnd: labels.giftCard.cardEnd,
              expire: labels.giftCard.expire,
            },
          }}
          labels={labels}
          onDeleteCard={onDeleteCard}
          setDeleteModalMountState={setDeleteModalMountState}
          showUpdatedNotificationOnModal={showUpdatedNotificationOnModal}
        />
      </div>
    );
  }
}
export default withStyles(CardView, styles);
