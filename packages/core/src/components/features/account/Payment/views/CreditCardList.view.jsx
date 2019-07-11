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
      <Heading variant="h6" className="cardList__heading" dataLocator="payment-creditcardtile">
        {labels.ACC_LBL_CC_HEADING}
      </Heading>
      {creditCardList.size === 0 && (
        <EmptyCard labels={labels} icon="credit-card" alt="card icon" prefix="CC" />
      )}
      <Col
        colSize={{
          large: 3,
          medium: 3,
          small: 6,
        }}
      >
        <Button
          buttonVariation="fixed-width"
          fill="BLUE"
          className="creditCardList__ccAddCta"
          dataLocator="payment-addcreditcard"
        >
          {creditCardList.size === 0 ? labels.ACC_LBL_CC_EMPTY_ADD_BTN : labels.ACC_LBL_ADD_BTN}
        </Button>
      </Col>
    </div>
  );
};

export default withStyles(CreditCardList, styles);
export { CreditCardList as CreditCardListVanilla };
