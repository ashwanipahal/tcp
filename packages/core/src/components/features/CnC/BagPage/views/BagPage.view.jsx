import React from 'react';
import PropTypes from 'prop-types';
import ProductTileWrapper from '../../CartItemTile/organisms/ProductTileWrapper/container/ProductTileWrapper.container';
import OrderLedgerContainer from '../organisms/OrderLedger';
import withStyles from '../../../../common/hoc/withStyles';
import styles, { addedToBagActionsStyles } from '../styles/BagPage.style';
import Heading from '../../../../common/atoms/Heading';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import AddedToBagActions from '../../AddedToBagActions';
import BonusPointsDays from '../../../../common/organisms/BonusPointsDays';
import CouponAndPromos from '../../common/organism/CouponAndPromos';

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

const BagPageView = ({ className, labels, totalCount, orderItemsCount }: Props) => {
  const showAddTobag = false;
  const myBag = 'myBag';
  const isNoNEmptyBag = orderItemsCount > 0;
  return (
    <div className={className}>
      <Row tagName="header">
        <Col colSize={{ small: 3, medium: 4, large: 6 }} className="left-sec">
          <Heading variant="h6" fontSize="fs16" color="text.primary" className="bag-header">
            {`${labels.bagHeading} (${totalCount})`}
          </Heading>
        </Col>
      </Row>
      <section className="main-sec">
        <Row>
          <Col
            colSize={{ small: 6, medium: isNoNEmptyBag ? 5 : 8, large: isNoNEmptyBag ? 8 : 12 }}
            className="left-sec"
          >
            <ProductTileWrapper bagLabels={labels} pageView={myBag} />
          </Col>
          {isNoNEmptyBag && (
            <Col colSize={{ small: 6, medium: 3, large: 4 }} className="right-sec">
              <OrderLedgerContainer />
              <AddedToBagActions
                labels={labels}
                showAddTobag={showAddTobag}
                inheritedStyles={addedToBagActionsStyles}
              />
              <BonusPointsDays />
              <CouponAndPromos />
            </Col>
          )}
        </Row>
      </section>
    </div>
  );
};
BagPageView.propTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
  orderItemsCount: PropTypes.number.isRequired,
};

export default withStyles(BagPageView, styles);
export { BagPageView as BagPageViewVanilla };
