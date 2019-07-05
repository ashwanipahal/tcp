import React from 'react';
import Heading from '../../../../common/atoms/Heading';
import EmptyCard from '../../common/molecule/EmptyCard/views/EmptyCard.view';
import Button from '../../../../common/atoms/Button';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/CardList.style';
import Col from '../../../../common/atoms/Col';

// @flow

type Props = {
  labels: object,
  creditCardList: Array<object>,
  className: string,
};

const CreditCardList = ({ labels, creditCardList, className }: Props) => {
  return (
    <div className={className}>
      <Heading variant="h6" className="creditCardList__heading">
        {labels.creditCardHeading}
      </Heading>
      {creditCardList.size === 0 && (
        <EmptyCard
          heading={labels.emptyCardHeading}
          description={labels.emptyCardDesc}
          icon="credit-card"
          alt="card icon"
        />
      )}
      <Col
        colSize={{
          large: 3,
          medium: 3,
          small: 6,
        }}
      >
        <Button buttonVariation="fixed-width" fill="BLUE" className="creditCardList__ccAddCta">
          {creditCardList.size === 0 ? labels.emptyCCAddCta : labels.ccAddCta}
        </Button>
      </Col>
    </div>
  );
};

export default withStyles(CreditCardList, styles);
