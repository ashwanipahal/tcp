import React from 'react';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import CardTile from './CardTile.view';

// @flow

type Props = {
  labels: {},
  className: string,
  setDeleteModalMountState: Function,
  setSelectedGiftCard: Function,
  giftCardList: Array<object>,
  onGetBalanceCard: Function,
  checkbalanceValueInfo: any,
}; // giftCards comment for time being
export const CardList = ({
  setSelectedGiftCard,
  className,
  setDeleteModalMountState,
  giftCardList,
  onGetBalanceCard,
  checkbalanceValueInfo,
}: Props) => {
  return (
    <div>
      {giftCardList.map(giftcard => (
        <Row key={giftcard.creditCardId} fullBleed className={className}>
          <Col className="giftcardList__col" colSize={{ large: 4, medium: 4, small: 6 }}>
            <CardTile
              giftcard={giftcard}
              setSelectedGiftCard={setSelectedGiftCard}
              setDeleteModalMountState={setDeleteModalMountState}
              onGetBalanceCard={onGetBalanceCard}
              checkbalanceValueInfo={checkbalanceValueInfo}
              key={giftcard.creditCardId}
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};
export default CardList;
