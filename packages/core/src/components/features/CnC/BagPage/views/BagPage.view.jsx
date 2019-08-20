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

class BagPageView extends React.PureComponent {
  renderLeftSection = () => {
    const { labels } = this.props;
    const myBag = 'myBag';
    return <ProductTileWrapper bagLabels={labels} pageView={myBag} />;
  };

  renderActions = () => {
    const { labels } = this.props;
    const showAddTobag = false;

    return (
      <AddedToBagActions
        labels={labels}
        showAddTobag={showAddTobag}
        inheritedStyles={addedToBagActionsStyles}
      />
    );
  };

  render() {
    const { className, labels, totalCount, orderItemsCount } = this.props;
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
          leftSection={this.renderLeftSection}
          showLeftSection={isNoNEmptyBag}
          bagActions={this.renderActions}
        />
      </div>
    );
  }
}

BagPageView.propTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
  orderItemsCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default withStyles(BagPageView, styles);
export { BagPageView as BagPageViewVanilla };
