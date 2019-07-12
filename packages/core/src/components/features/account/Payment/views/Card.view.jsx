import React from 'react';
import DeleteCardModal from './DeleteCardModal';
import { CardList } from './CardList.view';

// @flow

type Props = {
  labels: object,
  setDeleteModalMountState: Function,
  deleteModalMountedState: false,
  onDeleteCard: Function,
  showUpdatedNotificationOnModal: any,
  giftCardList: Array<object>,
  onGetBalanceCard: Function,
  checkbalanceValueInfo: any,
  showNotification: boolean,
  showNotificationCaptcha: boolean,
  className: string,
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
      labels,
      setDeleteModalMountState,
      deleteModalMountedState,
      onDeleteCard,
      giftCardList,
      onGetBalanceCard,
      checkbalanceValueInfo,
      showUpdatedNotificationOnModal,
      showNotification,
      showNotificationCaptcha,
      className,
    } = this.props;
    const { selectedGiftCard } = this.state;
    return (
      <div className={className}>
        <CardList
          deleteModalMountedState={deleteModalMountedState}
          setDeleteModalMountState={setDeleteModalMountState}
          setSelectedGiftCard={this.setSelectedGiftCard}
          giftCardList={giftCardList}
          onGetBalanceCard={onGetBalanceCard}
          checkbalanceValueInfo={checkbalanceValueInfo}
          labels={labels}
          showNotification={showNotification}
          showNotificationCaptcha={showNotificationCaptcha}
        />
        <DeleteCardModal
          openState={deleteModalMountedState}
          data={{
            heading: labels.ACC_LBL_MODAL_GC_HEADING,
            description: selectedGiftCard,
            buttons: {
              cancel: labels.ACC_LBL_MODAL_GC_CANCEL,
              confirm: labels.ACC_LBL_MODAL_GC_CONFIRM,
            },
            cardText: {
              cardEnd: labels.ACC_LBL_MODAL_GC_CARDEND,
              expire: labels.ACC_LBL_MODAL_GC_EXPIRE,
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
export default CardView;
