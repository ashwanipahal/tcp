import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/BagPage.style';
import CartItemTile from '../../CartItemTile';
import Heading from '../../../../common/atoms/Heading';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import CouponAndPromos from '../../CouponAndPromos';

// @flow
// type Props = {
//   openState: Function,
//   onRequestClose: Function,
//   className: string,
//   addedToBagData: any,
//   labels: any,
//   quantity: number,
//   handleContinueShopping: Function,
// };

const AddedToBag = ({ className }: Props) => {
  return (
    <div className={className}>
      <Heading>Bag page</Heading>
      <section className="main-sec">
        <Row>
          <Col colSize={{ small: 4, medium: 4, large: 8 }} className="left-sec">
            <section className="row-ele">section 1</section>
            <section className="row-ele">section 2</section>
            <section className="row-ele">section 3</section>
            <section className="row-ele">section 4</section>
            <CartItemTile />
          </Col>
          <Col colSize={{ small: 4, medium: 4, large: 4 }} className="right-sec">
            <section className="row-ele">section 1</section>
            <section className="row-ele">section 2</section>
            <section className="row-ele">section 3</section>
            <section className="row-ele">
              <CouponAndPromos />
            </section>
          </Col>
        </Row>
      </section>
    </div>
  );
};
AddedToBag.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(AddedToBag, styles);
export { AddedToBag as AddedToBagVanilla };
