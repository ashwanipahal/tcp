import React from 'react';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import GiftCardTile from './GiftCardTile.view';

// @flow

type Props = {
  labels: {},
  className: string,
  setDeleteModalMountState: Function,
  setSelectedGiftCard: Function,
  giftCards: Object,
}; //giftCards comment for time being
export const GiftCardList = ({
  setSelectedGiftCard,
  className,
  setDeleteModalMountState,
}: Props) => {
  const giftCards = [
    {
      accountNo: '***************2525',
      billingAddressId: null,
      addressDetails: null,
      ccBrand: 'GC',
      ccType: 'GiftCard',
      creditCardId: 915621,
      defaultInd: false,
      expMonth: '11',
      expYear: '2037',
      nameOnAccount: '.',
      properties: null,
    },
    {
      accountNo: '***************2521',
      billingAddressId: null,
      addressDetails: null,
      ccBrand: 'GC',
      ccType: 'GiftCard',
      creditCardId: 915622,
      defaultInd: false,
      expMonth: '11',
      expYear: '2037',
      nameOnAccount: '.',
      properties: null,
    },
  ];

  return (
    <Row fullBleed className={className}>
      {giftCards.map((giftcard, index) => (
        <Col className="giftcardList__col" colSize={{ large: 4, medium: 4, small: 6 }}>
          <GiftCardTile
            giftcard={giftcard}
            setSelectedGiftCard={setSelectedGiftCard}
            setDeleteModalMountState={setDeleteModalMountState}
          />
        </Col>
      ))}
    </Row>
  );
};
export default GiftCardList;
