import React from 'react';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import GiftardTile from './GiftCardTile.view';

// @flow

type Props = {
  labels: {},
  className: string,
  setDeleteModalMountState: Function,
};
export const GiftCardList = ({ className, setDeleteModalMountState }: Props) => {
  return (
    <Row fullBleed className={className}>
      <Col className="giftcardList__col" colSize={{ large: 4, medium: 4, small: 6 }}>
        <GiftardTile setDeleteModalMountState={setDeleteModalMountState} />
      </Col>
    </Row>
  );
};
export default GiftCardList;
