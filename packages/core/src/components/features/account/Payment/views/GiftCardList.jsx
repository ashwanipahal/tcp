import React from 'react';
import Heading from '../../../../common/atoms/Heading';
import EmptyCard from '../../common/molecule/EmptyCard/views/EmptyCard.view';
import Button from '../../../../common/atoms/Button';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/CardList.style';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';

// @flow

type Props = {
  labels: object,
  giftCardList: Array<object>,
  className: string,
};

const GiftCardList = ({ labels, giftCardList, className }: Props) => {
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
        </Col>
      </Row>
    </div>
  );
};

export default withStyles(GiftCardList, styles);
export { GiftCardList as GiftCardListVanilla };
