import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { Row, Col, BodyCopy } from '../../../../../../common/atoms';
import OrdersListItem from '../../OrdersListItem';

/**
 * This component will render PastOrders component
 * @param { string, string, object }
 */
class PastOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
    };
  }

  /**
   * This function will toggle the show more link
   * @param {object} - event
   */
  toggleShow = event => {
    event.preventDefault();
    this.setState(prevState => ({
      showMore: !prevState.showMore,
    }));
  };

  render() {
    const { className, labels, ordersListItems } = this.props;
    const { showMore } = this.state;
    const buttonText =
      showMore === true
        ? getLabelValue(labels, 'lbl_orders_show-less', 'orders')
        : getLabelValue(labels, 'lbl_orders_show-more', 'orders');
    const ordersListItemsFilter = showMore === true ? ordersListItems : ordersListItems.slice(0, 2);

    return (
      <BodyCopy className={className}>
        <BodyCopy
          dataLocator="past-order_heading"
          fontFamily="secondary"
          fontSize="fs16"
          component="h3"
          fontWeight="semibold"
          className="elem-mt-XL"
        >
          {getLabelValue(labels, 'lbl_orders_past-orders', 'orders')}
        </BodyCopy>
        <Row fullBleed className="hide-on-mobile">
          <Col colSize={{ large: 5, medium: 3, small: 6 }}>
            <Row fullBleed className="elem-pb-MED elem-pt-MED">
              <Col colSize={{ large: 6, medium: 4, small: 2 }}>
                <BodyCopy
                  data-locator="order-date-header"
                  fontFamily="secondary"
                  className="list-fontsizes"
                  fontWeight="extrabold"
                  fontSize="fs14"
                >
                  {getLabelValue(labels, 'lbl_orders_order-date', 'orders')}
                </BodyCopy>
              </Col>
              <Col colSize={{ large: 6, medium: 4, small: 4 }}>
                <BodyCopy
                  data-locator="order-number-header"
                  fontFamily="secondary"
                  className="list-fontsizes"
                  fontWeight="extrabold"
                  fontSize="fs14"
                >
                  {getLabelValue(labels, 'lbl_orders_order-number', 'orders')}
                </BodyCopy>
              </Col>
            </Row>
          </Col>
          <Col colSize={{ large: 7, medium: 5, small: 6 }} ignoreGutter={{ small: true }}>
            <Row fullBleed className="elem-pb-MED elem-pt-MED">
              <Col colSize={{ large: 4, medium: 3, small: 2 }}>
                <BodyCopy
                  data-locator="order-type-header"
                  fontFamily="secondary"
                  fontWeight="extrabold"
                  fontSize="fs14"
                >
                  {getLabelValue(labels, 'lbl_orders_order-type', 'orders')}
                </BodyCopy>
              </Col>
              <Col colSize={{ large: 4, medium: 3, small: 2 }}>
                <BodyCopy
                  data-locator="order-status-header"
                  fontFamily="secondary"
                  fontWeight="extrabold"
                  fontSize="fs14"
                >
                  {getLabelValue(labels, 'lbl_orders_order-status', 'orders')}
                </BodyCopy>
              </Col>
              <Col colSize={{ large: 4, medium: 2, small: 2 }}>
                <BodyCopy
                  data-locator="order-total-header"
                  fontFamily="secondary"
                  className="list-fontsizes"
                  fontWeight="extrabold"
                  fontSize="fs14"
                  textAlign="right"
                >
                  {getLabelValue(labels, 'lbl_orders_order-total', 'orders')}
                </BodyCopy>
              </Col>
            </Row>
          </Col>
        </Row>
        {ordersListItemsFilter &&
          ordersListItemsFilter.map(item => (
            <OrdersListItem labels={labels} key={item.orderNumber} hideHeader orderItem={item} />
          ))}
        {ordersListItems.length >= 2 && (
          <Anchor
            fontSizeVariation="large"
            underline
            anchorVariation="primary"
            fontSize="fs14"
            dataLocator={showMore === true ? 'orderShowMoreButton' : 'orderShowLessButton'}
            onClick={this.toggleShow}
            fontFamily="secondary"
          >
            {buttonText}
          </Anchor>
        )}
      </BodyCopy>
    );
  }
}

PastOrders.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  ordersListItems: PropTypes.shape([]).isRequired,
};

PastOrders.defaultProps = {
  className: '',
};

export default PastOrders;
