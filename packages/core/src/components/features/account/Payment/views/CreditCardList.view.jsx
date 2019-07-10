import React from 'react';
import Heading from '../../../../common/atoms/Heading';
import EmptyCard from '../../common/molecule/EmptyCard/views/EmptyCard.view';
import Button from '../../../../common/atoms/Button';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/CardList.style';
import Col from '../../../../common/atoms/Col';
import Row from '../../../../common/atoms/Row';
import CardTile from '../../common/molecule/CardTile/views/CardTile.view';

// @flow

type Props = {
  labels: object,
  creditCardList: Array<object>,
  className: string,
  setDefaultPaymentMethod: Function,
};

const CreditCardList = ({ labels, creditCardList, className, setDefaultPaymentMethod }: Props) => {
  return (
    <div className={className}>
      <Heading variant="h6" className="cardList__heading" dataLocator="payment-creditcardtile">
        {labels.ACC_LBL_CC_HEADING}
      </Heading>
      {creditCardList.size === 0 && (
        <EmptyCard labels={labels} icon="credit-card" alt="card icon" prefix="CC" />
      )}
      <Row fullBleed>
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
            className="cardList__ccAddCta"
            dataLocator="payment-addcreditcard"
          >
            {creditCardList.size === 0 ? labels.ACC_LBL_CC_EMPTY_ADD_BTN : labels.ACC_LBL_ADD_BTN}
          </Button>
        </Col>
      </Row>
      <Row fullBleed>
        {creditCardList.size !== 0 &&
          creditCardList.map((card, index) => (
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
              <CardTile
                card={card}
                labels={labels}
                setDefaultPaymentMethod={setDefaultPaymentMethod}
              />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default withStyles(CreditCardList, styles);
export { CreditCardList as CreditCardListVanilla };
