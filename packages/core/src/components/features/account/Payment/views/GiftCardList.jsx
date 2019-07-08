import React from 'react';
import Heading from '../../../../common/atoms/Heading';
import EmptyCard from '../../common/molecule/EmptyCard/views/EmptyCard.view';
import Button from '../../../../common/atoms/Button';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/CardList.style';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import { CardView } from './Card.view';
// @flow

type Props = {
  labels: object,
  giftCardList: Array<object>,
  className: string,
  setDeleteModalMountState: Function,
  deleteModalMountedState: false,
  onDeleteCard: Function,
  showUpdatedNotificationOnModal: any,
};

const GiftCardList = ({
  labels,
  giftCardList,
  className,
  setDeleteModalMountState,
  deleteModalMountedState,
  onDeleteCard,
  showUpdatedNotificationOnModal,
}: Props) => {
  return (
    <div className={className}>
      <Heading variant="h6" className="creditCardList__heading">
        {labels.giftCardHeading}
      </Heading>
      {giftCardList.size === 0 && (
        <EmptyCard
          heading={labels.emptyCardHeading}
          description={labels.emptyCardDesc}
          icon="gift-card"
          alt="gift card icon"
        />
      )}
      <Row fullBleed>
        <Col
          colSize={{
            large: 3,
            medium: 3,
            small: 6,
          }}
        >
          <Button buttonVariation="fixed-width" fill="BLUE">
            {giftCardList.size === 0 ? labels.giftCardCta : labels.ccAddCta}
          </Button>

          <CardView
            labels={labels}
            deleteModalMountedState={deleteModalMountedState}
            setDeleteModalMountState={setDeleteModalMountState}
            onDeleteCard={onDeleteCard}
            showUpdatedNotificationOnModal={showUpdatedNotificationOnModal}
          />
        </Col>
      </Row>
    </div>
  );
};

export default withStyles(GiftCardList, styles);
export { GiftCardList as GiftCardListVanilla };
