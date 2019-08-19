import React from 'react';
import PropTypes from 'prop-types';
import ProductTileWrapper from '../../CartItemTile/organisms/ProductTileWrapper/container/ProductTileWrapper.container';
import withStyles from '../../../../common/hoc/withStyles';
import Heading from '../../../../common/atoms/Heading';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import AddedToBagActions from '../../AddedToBagActions';
import CnCTemplate from '../../common/organism/CnCTemplate';

import styles, { addedToBagActionsStyles } from '../styles/BagPage.style';

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
      <CnCTemplate
        labels={labels}
        leftSection={() => <ProductTileWrapper bagLabels={labels} pageView={myBag} />}
        showLeftSection={isNoNEmptyBag}
        bagActions={() => (
          <AddedToBagActions
            labels={labels}
            showAddTobag={showAddTobag}
            inheritedStyles={addedToBagActionsStyles}
          />
        )}
      />
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
