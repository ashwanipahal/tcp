import React from 'react';
import PropTypes from 'prop-types';
import { getLocator, getIconPath } from '@tcp/core/src/utils';
import { BodyCopy, LabeledRadioButton, Image, Anchor } from '@tcp/core/src/components/common/atoms';
import withStyles from '../../../../../../common/hoc/withStyles';
import style from '../styles/CartItemRadioButtons.style';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';

class CartItemRadioButtons extends React.Component {
  showBoss = (isBossOrder, isBossEnabled) => isBossOrder || isBossEnabled;

  showBopis = (isBopisOrder, isBopisEnabled) => isBopisOrder || isBopisEnabled;

  renderBossBanner = (isBossItem, onlineClearanceMessage) => {
    const { labels } = this.props;
    return isBossItem && !onlineClearanceMessage ? (
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
    ) : null;
  };

  renderBossDates = isBossItem => {
    const {
      labels,
      productDetail: {
        miscInfo: { bossStartDate, bossEndDate },
      },
    } = this.props;
    return isBossItem ? (
      <>
        {labels.by}
        <BodyCopy
          className="elem-pl-XS"
          fontWeight="semibold"
          component="span"
          fontFamily="secondary"
          fontSize="fs10"
        >
          {`${bossStartDate.get('day')}. ${bossStartDate.get('month')} ${bossStartDate.get(
            'date'
          )} - ${bossEndDate.get('day')}. ${bossEndDate.get('month')} ${bossEndDate.get('date')}`}
        </BodyCopy>
      </>
    ) : null;
  };

  hideChangeStore = isBossItem => {
    const {
      isBossEnabled,
      isBopisEnabled,
      productDetail: {
        miscInfo: { isBossEligible, isBopisEligible, availability },
      },
    } = this.props;

    if (isBossItem) {
      return !(
        !isBossEnabled ||
        !isBossEligible ||
        availability !== CARTPAGE_CONSTANTS.AVAILABILITY.OK
      );
    }
    return !(!isBopisEnabled || !isBopisEligible);
  };

  renderChangeStore = (disabled, isBossItem) => {
    const { labels } = this.props;
    return !disabled || this.hideChangeStore(isBossItem) ? (
      <Anchor
        className="elem-pl-LRG"
        fontSizeVariation="small"
        underline
        anchorVariation="primary"
        fontSize="fs12"
        fontFamily="secondary"
      >
        {labels.changeStore}
      </Anchor>
    ) : null;
  };

  renderRadioItem = ({
    isSelected,
    onlineClearanceMessage,
    store,
    disabled,
    radioText,
    isBossItem,
    isEcomItem,
    labels,
  }) => {
    return (
      <div className={`main-container ${disabled ? 'disabled' : ''}`}>
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

          {this.renderBossBanner(isBossItem, onlineClearanceMessage)}

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
        {!isEcomItem && isSelected && !onlineClearanceMessage && (
          <BodyCopy component="div" className="subtitle-container elem-mt-XS">
            <BodyCopy component="div" color="gray.800" fontFamily="secondary" fontSize="fs10">
              {labels.at}
              <BodyCopy
                className="elem-pl-XXS elem-pr-XXS"
                fontWeight="semibold"
                component="span"
                fontFamily="secondary"
                fontSize="fs10"
              >
                {store}
              </BodyCopy>
              {this.renderBossDates(isBossItem)}
            </BodyCopy>
            {this.renderChangeStore(disabled, isBossItem)}
          </BodyCopy>
        )}
      </div>
    );
  };

  render() {
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
            checked={isBOSSOrder}
            disabled={bossDisabled}
            data-locator={getLocator('cart_item_no_rush_radio_button')}
          >
            {this.renderRadioItem({
              isSelected: isBOSSOrder,
              onlineClearanceMessage: noBossMessage,
              store,
              disabled: bossDisabled,
              radioText: labels.bossPickUp,
              isBossItem: true,
              isEcomItem: false,
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
            checked={isBOPISOrder}
            disabled={bopisDisabled}
            data-locator={getLocator('cart_item_pickup_radio_today_button')}
          >
            {this.renderRadioItem({
              isSelected: isBOPISOrder,
              onlineClearanceMessage: noBopisMessage,
              store,
              disabled: bopisDisabled,
              radioText: labels.bopisPickUp,
              isBossItem: false,
              isEcomItem: false,
              labels,
            })}
          </LabeledRadioButton>
        )}
        <LabeledRadioButton
          className={[
            'normal-select-box',
            commonSelectBox,
            isECOMOrder && selectedMethod,
            isEcomSoldout && 'disabled',
          ].join(' ')}
          name={radioGroupName}
          checked={isECOMOrder}
          disabled={isEcomSoldout}
          data-locator={getLocator('cart_item_ship_to_home_radio_button')}
        >
          {this.renderRadioItem({
            isSelected: isECOMOrder,
            onlineClearanceMessage: false,
            store,
            disabled: isEcomSoldout,
            radioText: labels.ecomShipping,
            isBossItem: false,
            isEcomItem: true,
            labels,
          })}
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
