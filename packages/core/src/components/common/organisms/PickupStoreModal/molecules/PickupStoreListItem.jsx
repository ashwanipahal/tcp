import React from 'react';
import { PropTypes } from 'prop-types';
import { StoreTitle } from '../../../atoms/StoreSummaryComponents';
import { STORE_SUMMARY_PROP_TYPES } from '../PickUpStoreModal.proptypes';
import PickUpCTA from '../atoms/PickupCTA';
// import {ButtonTooltip} from 'views/components/tooltip/ButtonTooltip.jsx';
import { parseDate } from '../../../../../utils/parseDate';
import { getDateInformation, parseBoolean } from '../../../../../utils/badge.util';
import cssClassName from '../../../../../utils/cssClassName';
import {
  STORE_DETAILS_LABELS,
  ITEM_AVAILABILITY_MESSAGES,
  BOPIS_ITEM_AVAILABILITY,
} from '../PickUpStoreModal.constants';
import { toTimeString, capitalize } from '../../../../../utils';
import BodyCopy from '../../../atoms/BodyCopy';

const displayStoreUnavailable = (showBopisCTA, showBossCTA) => {
  const { STORE_UNAVAILABLE } = STORE_DETAILS_LABELS;
  return !showBopisCTA && !showBossCTA ? (
    <BodyCopy className="store-unavailable-text">{STORE_UNAVAILABLE}</BodyCopy>
  ) : null;
};

const displayStoreAddress = address => {
  return address && address.addressLine1 ? (
    <BodyCopy className="store-address-one">{capitalize(address.addressLine1)}</BodyCopy>
  ) : null;
};

const displayDistance = (isShowDistance, distance) => {
  return isShowDistance && distance ? (
    <BodyCopy className="store-distance">
      {distance}
      mi.
    </BodyCopy>
  ) : null;
};

class PickupStoreListItem extends React.Component {
  static propTypes = {
    /** Error message when add to cart */
    addToCartError: PropTypes.string.isRequired,
    /** The whole information of the store. */
    store: PropTypes.shape({
      ...STORE_SUMMARY_PROP_TYPES,
      /** the availability status of the searched for cart item in this store */
      basicInfo: PropTypes.shape({
        /** store id identifier */
        id: PropTypes.string,
      }),
      productAvailability: PropTypes.shape({
        status: PropTypes.oneOf(
          Object.keys(BOPIS_ITEM_AVAILABILITY).map(key => BOPIS_ITEM_AVAILABILITY[key])
        ).isRequired,
      }).isRequired,
    }).isRequired,

    /** flag which describes wheter the item add to bag will be disabled or not */
    isBopisAvailable: PropTypes.bool.isRequired,
    /**
     * Function to call when a store is selected. The called function will
     * receive one parameter, the id of the clicked store.
     */
    onStoreSelect: PropTypes.func.isRequired,

    /** carries the boss information of the store */
    storeBossInfo: PropTypes.shape({
      isBossEligible: PropTypes.string,
    }).isRequired,

    /** boolean values of boss availability */
    isBossAvailable: PropTypes.bool.isRequired,

    sameStore: PropTypes.bool.isRequired,

    /** boolean values to check BOPIS selection */
    isBopisSelected: PropTypes.bool.isRequired,

    /** boolean values to check BOSS selection */
    isBossSelected: PropTypes.bool.isRequired,
    /** store id that was selected */
    selectedStoreId: PropTypes.number.isRequired,

    isGiftCard: PropTypes.bool.isRequired,
    isBopisCtaEnabled: PropTypes.bool.isRequired,
    isBossCtaEnabled: PropTypes.bool.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    isShowDistance: PropTypes.bool.isRequired,
    updateCartItemStore: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleStoreSelect = this.handleStoreSelect.bind(this);
  }

  getStoreCloseTime() {
    const {
      store: { hours },
    } = this.props;
    const storeClosingTimeToday =
      hours &&
      hours.regularHours[0] &&
      !hours.regularHours[0].isClosed &&
      hours.regularHours[0].openIntervals[0]
        ? toTimeString(parseDate(hours.regularHours[0].openIntervals[0].toHour))
        : '';
    const storeClosingTimeTomorrow =
      hours &&
      hours.regularHours[1] &&
      !hours.regularHours[1].isClosed &&
      hours.regularHours[1].openIntervals[0]
        ? toTimeString(parseDate(hours.regularHours[1].openIntervals[0].toHour))
        : '';
    return {
      storeClosingTimeToday,
      storeClosingTimeTomorrow,
    };
  }

  /**
   * @method handleStoreSelect
   * @description this method sets the selected store
   */
  handleStoreSelect() {
    // TODO - const {  isBoss = false } = e.target.something;
    const isBoss = false;
    // Fetch isBoss from component instead of a new Arrow funct.
    const { onStoreSelect, store } = this.props;
    return onStoreSelect(store.basicInfo.id, isBoss);
  }

  displayStoreDetails({
    basicInfo,
    address,
    distance,
    showBopisCTA,
    showBossCTA,
    isBopisSelected,
    isBossSelected,
    BossCtaProps,
    BopisCtaProps,
    buttonLabel,
    isShowDistance,
    addToCartError,
    updateCartItemStore,
    isGiftCard,
  }) {
    const { FAVORITE_STORE } = STORE_DETAILS_LABELS;
    return (
      <React.Fragment>
        <div className="store-info">
          {!!basicInfo.isDefault && (
            <BodyCopy className="favorite-store__label">{FAVORITE_STORE}</BodyCopy>
          )}
          <StoreTitle basicInfo={basicInfo} />
          {displayDistance(isShowDistance, distance)}
          {displayStoreAddress(address)}
        </div>
        <div className="store-actions">
          {showBossCTA && (
            <React.Fragment>
              <PickUpCTA
                isSelected={isBossSelected}
                isBoss
                {...BossCtaProps}
                handleClick={this.handleStoreSelect}
                storeId={basicInfo.id}
                buttonLabel={buttonLabel}
                updateCartItemStore={updateCartItemStore}
                isGiftCard={isGiftCard}
              />
              {addToCartError && isBossSelected && (
                <span className="pickup-error">{addToCartError}</span>
              )}
            </React.Fragment>
          )}
          {showBopisCTA && (
            <React.Fragment>
              <PickUpCTA
                isSelected={isBopisSelected}
                isBopis
                {...BopisCtaProps}
                handleClick={this.handleStoreSelect}
                storeId={basicInfo.id}
                buttonLabel={buttonLabel}
                updateCartItemStore={updateCartItemStore}
                isGiftCard={isGiftCard}
              />
              {addToCartError && isBopisSelected && (
                <span className="pickup-error">{addToCartError}</span>
              )}
            </React.Fragment>
          )}

          {displayStoreUnavailable(showBopisCTA, showBossCTA)}
        </div>
      </React.Fragment>
    );
  }

  render() {
    const {
      store: {
        basicInfo,
        distance,
        productAvailability: { status },
        pickupType,
      },
      isBopisAvailable,
      storeBossInfo,
      isBossAvailable,
      sameStore,
      isBopisSelected,
      isBossSelected,
      addToCartError,
      selectedStoreId,
      isBopisCtaEnabled,
      isBossCtaEnabled,
      buttonLabel,
      isShowDistance,
      updateCartItemStore,
      isGiftCard,
    } = this.props;
    // 'selected' class is removed for avoiding extra stylings for favorite store items
    const className = cssClassName('bopis-store-item-info ', {
      'favorite-store': basicInfo.isDefault,
    });
    const BopisCtaProps = {
      status: ITEM_AVAILABILITY_MESSAGES[status],
      ...getDateInformation(),
    };
    const BossCtaProps = {
      startDate: { ...getDateInformation(storeBossInfo.startDate, true) },
      endDate: { ...getDateInformation(storeBossInfo.endDate, true) },
    };
    const tooltipTarget = <BodyCopy className="store-details-link">Store Details</BodyCopy>;
    // checking if there is sameStore then both CTAs should be disabled
    const pickupTypeBOPIS = !sameStore ? pickupType.isStoreBopisSelected : true;
    const pickupTypeBOSS = !sameStore ? pickupType.isStoreBossSelected : true;

    const showBopisCTA = isBopisAvailable && pickupTypeBOPIS && isBopisCtaEnabled;
    const showBossCTA = parseBoolean(isBossAvailable) && pickupTypeBOSS && isBossCtaEnabled;
    const { storeClosingTimeToday, storeClosingTimeTomorrow } = this.getStoreCloseTime();

    return (
      <React.Fragment>
        <div className={className} itemScope itemType="http://schema.org/ClothingStore">
          {this.displayStoreDetails({
            basicInfo,
            address: basicInfo.address,
            distance,
            tooltipTarget,
            storeClosingTimeToday,
            storeClosingTimeTomorrow,
            isBossAvailable,
            pickupTypeBOSS,
            isBopisSelected,
            isBossSelected,
            BossCtaProps,
            BopisCtaProps,
            showBopisCTA,
            showBossCTA,
            buttonLabel,
            isShowDistance,
            addToCartError,
            selectedStoreId,
            updateCartItemStore,
            isGiftCard,
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default PickupStoreListItem;
