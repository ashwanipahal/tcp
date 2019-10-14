import React from 'react';
import PropTypes from 'prop-types';
import { getLocator, getIconPath } from '@tcp/core/src/utils';
import { BodyCopy, LabeledRadioButton, Image, Anchor } from '@tcp/core/src/components/common/atoms';
import withStyles from '../../../../../../common/hoc/withStyles';
import style from '../styles/CartItemRadioButtons.style';

class CartItemRadioButtons extends React.Component {
  handleToggle = (e, orderType) => {
    console.log(orderType);
  };

  showBoss = (isBossOrder, isBossEnabled) => isBossOrder || isBossEnabled;

  showBopis = (isBopisOrder, isBopisEnabled) => isBopisOrder || isBopisEnabled;

  renderBossBanner = () => {
    const { labels } = this.props;
    return (
      <div className="banner-wrapper">
        <div className="triangle-left" />
        <div className="promo-wrapper">
          <BodyCopy fontSize="fs10" fontFamily="primary" fontWeight="black">
            {`${labels.extra} ${labels.bossOffValue || '5%'}`}
          </BodyCopy>
          <BodyCopy className="off-label" fontSize="fs10" fontFamily="primary">
            {labels.off}
          </BodyCopy>
        </div>
      </div>
    );
  };

  renderBossDates = () => {
    const {
      labels,
      productDetail: {
        miscInfo: { bossStartDate, bossEndDate },
      },
    } = this.props;
    return (
      <>
        {labels.by}
        <BodyCopy
          className="elem-pl-XS"
          fontWeight="semibold"
          component="span"
          fontFamily="secondary"
          fontSize="fs10"
        >
          {` ${bossStartDate.get('day')}. ${bossStartDate.get('month')} ${bossStartDate.get(
            'date'
          )} - ${bossEndDate.get('day')}. ${bossEndDate.get('month')} ${bossEndDate.get('date')}`}
        </BodyCopy>
      </>
    );
  };

  renderChangeStore = disabled => {
    const { isNotAvailable } = this.props;
    return !disabled || (disabled && isNotAvailable) ? (
      <BodyCopy component="div">
        <Anchor fontSizeVariation="large" anchorVariation="secondary" underline target="_blank">
          Change Store
        </Anchor>
      </BodyCopy>
    ) : null;
  };

  renderBossBopisItem = ({
    isSelected,
    onlineClearanceMessage,
    store,
    disabled,
    radioText,
    isBossItem,
    labels,
  }) => {
    return (
      <div className="main-container">
        {isSelected && disabled && (
          <Image
            alt="disabled"
            className="disabled-icon"
            src={getIconPath('alert-triangle')}
            width="15px"
            height="15px"
          />
        )}
        <BodyCopy component="div" className="title-container">
          <BodyCopy
            dataLocator={getLocator(`cart_item_${isBossItem ? 'cartNoRush' : 'pickup_today'}`)}
            color={disabled ? 'gray.800' : 'gray.900'}
            fontSize="fs14"
            fontFamily="secondary"
          >
            {radioText}
          </BodyCopy>

          {isBossItem && !onlineClearanceMessage && this.renderBossBanner()}

          {onlineClearanceMessage && (
            <BodyCopy
              className="elem-pl-MED"
              component="span"
              fontFamily="secondary"
              fontSize="fs12"
              color="gray[800]"
            >
              {onlineClearanceMessage}
            </BodyCopy>
          )}
        </BodyCopy>
        {isSelected && (
          <BodyCopy component="div" className="subtitle-container elem-mt-XS">
            <BodyCopy component="div" color="gray.800" fontFamily="secondary" fontSize="fs10">
              {labels.at}
              <BodyCopy
                className="elem-pl-XXS"
                fontWeight="semibold"
                component="span"
                fontFamily="secondary"
                fontSize="fs10"
              >
                {store}
              </BodyCopy>
              {isBossItem && this.renderBossDates()}
            </BodyCopy>
            {this.renderChangeStore(disabled)}
          </BodyCopy>
        )}
      </div>
    );
  };

  render() {
    // const { selectedOrder } = this.state;
    const {
      className,
      labels,
      productDetail,
      isBossEnabled,
      isBopisEnabled,
      isEcomSoldout,
      isECOMOrder,
      isBOPISOrder,
      isBOSSOrder,
      noBopisMessage,
      noBossMessage,
      bossDisabled,
      bopisDisabled,
    } = this.props;
    const { store } = productDetail.miscInfo;
    const radioGroupName = `ship-it-${productDetail.itemInfo.itemId}`;
    const commonSelectBox = 'common-select-box-css';
    const selectedMethod = 'selected-method';

    return (
      <div className={className}>
        {this.showBoss(isBOSSOrder, isBossEnabled) && (
          <LabeledRadioButton
            className={[
              'select-box-1',
              commonSelectBox,
              isBOSSOrder && selectedMethod,
              bossDisabled && 'disabled',
            ].join(' ')}
            name={radioGroupName}
            onChange={e => this.handleToggle(e, 'BOSS')}
            checked={isBOSSOrder}
            disabled={bossDisabled}
            data-locator={getLocator('cart_item_no_rush_radio_button')}
          >
            {this.renderBossBopisItem({
              isSelected: isBOSSOrder,
              onlineClearanceMessage: noBossMessage,
              store,
              disabled: bossDisabled,
              radioText: labels.bossPickUp,
              isBossItem: true,
              labels,
            })}
          </LabeledRadioButton>
        )}
        {this.showBopis(isBOPISOrder, isBopisEnabled) && (
          <LabeledRadioButton
            className={[
              'normal-select-box',
              commonSelectBox,
              isBOPISOrder && selectedMethod,
              bopisDisabled && 'disabled',
            ].join(' ')}
            name={radioGroupName}
            onChange={e => this.handleToggle(e, 'BOPIS')}
            checked={isBOPISOrder}
            disabled={bopisDisabled}
            data-locator={getLocator('cart_item_pickup_radio_today_button')}
          >
            {this.renderBossBopisItem({
              isSelected: isBOPISOrder,
              onlineClearanceMessage: noBopisMessage,
              store,
              disabled: bopisDisabled,
              radioText: labels.bopisPickUp,
              isBossItem: false,
              labels,
            })}
          </LabeledRadioButton>
        )}
        <LabeledRadioButton
          className={['normal-select-box', commonSelectBox, isECOMOrder && selectedMethod].join(
            ' '
          )}
          name={radioGroupName}
          onChange={e => this.handleToggle(e, 'ECOM')}
          checked={isECOMOrder}
          disabled={isEcomSoldout}
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
  isBossEnabled: PropTypes.bool.isRequired,
  isBopisEnabled: PropTypes.bool.isRequired,
  isEcomSoldout: PropTypes.bool.isRequired,
  isNotAvailable: PropTypes.bool.isRequired,
  isECOMOrder: PropTypes.bool.isRequired,
  isBOPISOrder: PropTypes.bool.isRequired,
  isBOSSOrder: PropTypes.bool.isRequired,
  noBopisMessage: PropTypes.string.isRequired,
  noBossMessage: PropTypes.string.isRequired,
  bossDisabled: PropTypes.bool.isRequired,
  bopisDisabled: PropTypes.bool.isRequired,
};

export default withStyles(CartItemRadioButtons, style);
export { CartItemRadioButtons as CartItemRadioButtonsVanilla };
