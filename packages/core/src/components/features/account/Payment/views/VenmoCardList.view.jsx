import React from 'react';
import CardTile from '../../common/molecule/CardTile/views/CardTile.view';
import Col from '../../../../common/atoms/Col';
import Row from '../../../../common/atoms/Row';
import Heading from '../../../../common/atoms/Heading';
import styles from '../styles/CardList.style';
import withStyles from '../../../../common/hoc/withStyles';

// @flow
type Props = {
  labels: object,
  venmoCardList: object,
  className: string,
};

const VenmoCardList = ({ labels, venmoCardList, className }: Props) => {
  return (
    <div className={className}>
      <Heading variant="h6" className="cardList__heading" dataLocator="payment-venmocardtile">
        {labels.ACC_LBL_VENMO_HEADING}
      </Heading>
      <Row fullBleed>
        {venmoCardList.map((card, index) => (
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
        ))}
      </Row>
    </div>
  );
};

export default withStyles(VenmoCardList, styles);
export { VenmoCardList as VenmoCardListVanilla };
