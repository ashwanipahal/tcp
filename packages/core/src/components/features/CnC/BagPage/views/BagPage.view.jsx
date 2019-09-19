import React from 'react';
import PropTypes from 'prop-types';
import ProductTileWrapper from '../../CartItemTile/organisms/ProductTileWrapper/container/ProductTileWrapper.container';
import withStyles from '../../../../common/hoc/withStyles';
import Heading from '../../../../common/atoms/Heading';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import BodyCopy from '../../../../common/atoms/BodyCopy';
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

class BagPageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: 'BAG',
    };
  }

  renderLeftSection = () => {
    const { labels, sflItems } = this.props;
    const { activeSection } = this.state;
    const myBag = 'myBag';
    return (
      <React.Fragment>
        <div
          className={`bag-section ${activeSection === 'BAG' ? 'activeSection' : 'inActiveSection'}`}
        >
          <ProductTileWrapper bagLabels={labels} pageView={myBag} />
        </div>
        <div
          className={`save-for-later-section ${
            activeSection === 'SFL' ? 'activeSection' : 'inActiveSection'
          }`}
        >
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight={['semibold']}
            className="elem-mt-XXL save-for-later-section-heading"
          >
            {`${labels.savedForLaterText} (${sflItems.size})`}
          </BodyCopy>
          <ProductTileWrapper
            bagLabels={labels}
            pageView={myBag}
            sflItems={sflItems}
            isBagPageSflSection
          />
        </div>
      </React.Fragment>
    );
  };

  renderActions = () => {
    const { labels, showAddTobag, handleCartCheckout } = this.props;

    return (
      <AddedToBagActions
        labels={labels}
        showAddTobag={showAddTobag}
        inheritedStyles={addedToBagActionsStyles}
        handleCartCheckout={handleCartCheckout}
      />
    );
  };

  handleChangeActiveSection = sectionName => {
    this.setState({
      activeSection: sectionName,
    });
  };

  render() {
    const {
      className,
      labels,
      totalCount,
      orderItemsCount,
      isUserLoggedIn,
      isGuest,
      sflItems,
    } = this.props;
    const { activeSection } = this.state;
    const isNoNEmptyBag = orderItemsCount > 0;
    return (
      <div className={className}>
        <Row tagName="header">
          <Col
            colSize={{ small: 3, medium: 4, large: 6 }}
            className="left-sec"
            onClick={() => {
              this.handleChangeActiveSection('BAG');
            }}
          >
            <Heading
              variant="h6"
              fontSize="fs16"
              color="text.primary"
              className={`bag-header ${activeSection === 'BAG' ? 'activeHeader' : ''}`}
            >
              {`${labels.bagHeading} (${totalCount})`}
            </Heading>
          </Col>
          <Col
            colSize={{ small: 3, medium: 4, large: 6 }}
            className="left-sec"
            onClick={() => {
              this.handleChangeActiveSection('SFL');
            }}
          >
            <Heading
              variant="h6"
              fontSize="fs16"
              color="text.primary"
              className={`bag-header bag-header-sfl ${
                activeSection === 'SFL' ? 'activeHeader' : ''
              }`}
            >
              {`${labels.savedLaterButton} (${sflItems.size})`}
            </Heading>
          </Col>
        </Row>
        <CnCTemplate
          leftSection={this.renderLeftSection}
          showLeftSection={isNoNEmptyBag}
          bagActions={this.renderActions}
          isUserLoggedIn={isUserLoggedIn}
          isGuest={isGuest}
          showAccordian={false}
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
  showAddTobag: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  isGuest: PropTypes.bool.isRequired,
  handleCartCheckout: PropTypes.func.isRequired,
  sflItems: PropTypes.shape([]).isRequired,
};

export default withStyles(BagPageView, styles);
export { BagPageView as BagPageViewVanilla };
