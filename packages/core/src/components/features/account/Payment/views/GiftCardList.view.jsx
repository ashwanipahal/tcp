import React from 'react';
import Heading from '../../../../common/atoms/Heading';
import EmptyCard from '../../common/molecule/EmptyCard/views/EmptyCard.view';
import Button from '../../../../common/atoms/Button';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/CardList.style';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import CardTile from '../../common/molecule/CardTile/views/CardTile.view';

// @flow

type Props = {
  labels: object,
  giftCardList: Array<object>,
  className: string,
};

const GiftCardList = ({ labels, giftCardList, className }: Props) => {
  return (
    <div className={className}>
      <Heading variant="h6" className="cardList__heading">
        {labels.ACC_LBL_GC_HEADING}
      </Heading>
      {giftCardList.size === 0 && (
        <EmptyCard labels={labels} icon="gift-card" alt="gift card icon" prefix="GC" />
      )}
      <Row fullBleed>
        <Col
          colSize={{
            large: 3,
            medium: 3,
            small: 6,
          }}
        >
          <Button buttonVariation="fixed-width" fill="BLUE" dataLocator="payment-addagiftcard" className="cardList__ccAddCta">
            {giftCardList.size === 0 ? labels.ACC_LBL_GC_EMPTY_ADD_BTN : labels.ACC_LBL_ADD_BTN}
          </Button>
        </Col>
      </Row>
      <Row fullBleed>
        {giftCardList.size !== 0 && giftCardList.map((card, index) =>(
          <Col
            className="cardList__col"
            key={`container-${card.creditCardId}`}
            colSize={{ large: 4, medium: 4, small: 6 }}
            ignoreGutter={{
              large: (index + 1) % 3 === 0,
              medium: (index + 1) % 2 === 0,
              small: true,
            }}
          >
            <CardTile card={card} labels={labels} />
          </Col>
        ))
        }
      </Row>
    </div>
  );
};

export default withStyles(GiftCardList, styles);
export { GiftCardList as GiftCardListVanilla };
