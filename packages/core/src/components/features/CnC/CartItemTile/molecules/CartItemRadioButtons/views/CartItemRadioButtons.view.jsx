import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import style from '../styles/CartItemRadioButtons.style';
import { BodyCopy, LabeledRadioButton } from '../../../../../../common/atoms';
import { getLocator } from '../../../../../../../utils';

class CartItemRadioButtons extends React.Component {
  constructor(props) {
    super(props);
    this.selectedOrder = 'ECOM';
    if (props.productDetail.miscInfo.orderItemType === 'BOPIS') {
      this.selectedOrder = 'BOPIS';
    } else if (props.productDetail.miscInfo.orderItemType === 'BOSS') {
      this.selectedOrder = 'BOSS';
    }
    this.state = {
      selectedOrder: this.selectedOrder,
    };
  }

  handleToggle = (e, orderType) => {
    this.setState({ selectedOrder: orderType });
  };

  render() {
    const { selectedOrder } = this.state;
    const { className, labels, productDetail } = this.props;
    const { bossStartDate, bossEndDate } = productDetail.miscInfo;
    const radioGroupName = `ship-it-${productDetail.itemInfo.itemId}`;
    const commonSelectBox = 'common-select-box-css';
    const selectedMethod = 'selected-method';
    const cmsLabel = '5%'; /* value come from cms */
    return (
      <div className={className}>
        <LabeledRadioButton
          className={[
            'select-box-1',
            commonSelectBox,
            selectedOrder === 'BOSS' && selectedMethod,
          ].join(' ')}
          name={radioGroupName}
          onChange={e => this.handleToggle(e, 'BOSS')}
          checked={selectedOrder === 'BOSS'}
          disabled
          data-locator={getLocator('cart_item_no_rush_radio_button')}
        >
          <div className="main-content-banner">
            <BodyCopy
              dataLocator={getLocator('cart_item_cartNoRush')}
              color="gray.900"
              fontSize="fs14"
              fontFamily="secondary"
            >
              {labels.bossPickUp}
            </BodyCopy>
            <div className="banner-wrapper">
              <div className="triangle-left" />
              <div className="promo-wrapper">
                <BodyCopy fontSize="fs10" fontFamily="primary" fontWeight="black">
                  {`${labels.extra} ${cmsLabel}`}
                </BodyCopy>
                <BodyCopy className="off-label" fontSize="fs10" fontFamily="primary">
                  {labels.off}
                </BodyCopy>
              </div>
            </div>
          </div>
          {productDetail.miscInfo.store && selectedOrder === 'BOSS' && (
            <BodyCopy
              className="padding-top-10"
              color="gray.800"
              fontFamily="secondary"
              fontSize="fs10"
            >
              At
              <BodyCopy
                className="padding-horizontal-5"
                fontWeight="semibold"
                component="span"
                fontFamily="secondary"
                fontSize="fs10"
              >
                {productDetail.miscInfo.store}
              </BodyCopy>
              by
              <BodyCopy
                className="padding-left-5"
                fontWeight="semibold"
                component="span"
                fontFamily="secondary"
                fontSize="fs10"
              >
                {` ${bossStartDate.get('day')}. ${bossStartDate.get('month')} ${bossStartDate.get(
                  'date'
                )} - ${bossEndDate.get('day')}. ${bossEndDate.get('month')} ${bossEndDate.get(
                  'date'
                )}`}
              </BodyCopy>
            </BodyCopy>
          )}
        </LabeledRadioButton>
        <LabeledRadioButton
          className={[
            'normal-select-box',
            commonSelectBox,
            selectedOrder === 'BOPIS' && selectedMethod,
          ].join(' ')}
          name={radioGroupName}
          onChange={e => this.handleToggle(e, 'BOPIS')}
          checked={selectedOrder === 'BOPIS'}
          disabled
          data-locator={getLocator('cart_item_pickup_radio_today_button')}
        >
          <BodyCopy
            dataLocator={getLocator('cart_item_pickup_today')}
            color="gray.900"
            fontSize="fs14"
            fontFamily="secondary"
          >
            {labels.bopisPickUp}
          </BodyCopy>

          {productDetail.miscInfo.store && selectedOrder === 'BOPIS' && (
            <BodyCopy
              className="padding-top-10"
              color="gray.800"
              fontFamily="secondary"
              fontSize="fs10"
            >
              At
              <BodyCopy
                className="padding-left-5"
                fontWeight="semibold"
                component="span"
                fontFamily="secondary"
                fontSize="fs10"
              >
                {productDetail.miscInfo.store}
              </BodyCopy>
            </BodyCopy>
          )}
        </LabeledRadioButton>
        <LabeledRadioButton
          className={[
            'normal-select-box',
            commonSelectBox,
            selectedOrder === 'ECOM' && selectedMethod,
          ].join(' ')}
          name={radioGroupName}
          onChange={e => this.handleToggle(e, 'ECOM')}
          checked={selectedOrder === 'ECOM'}
          disabled={false}
          data-locator={getLocator('cart_item_ship_to_home_radio_button')}
        >
          <BodyCopy
            dataLocator={getLocator('cart_item_ship_to_home')}
            color="gray.900"
            fontSize="fs14"
            fontFamily="secondary"
          >
            {labels.ecomShipping}
          </BodyCopy>
        </LabeledRadioButton>
      </div>
    );
  }
}

CartItemRadioButtons.propTypes = {
  productDetail: PropTypes.shape({
    miscInfo: {},
  }).isRequired,
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
};

export default withStyles(CartItemRadioButtons, style);
export { CartItemRadioButtons as CartItemRadioButtonsVanilla };
