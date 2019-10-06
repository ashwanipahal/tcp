import React from 'react';
import { PropTypes } from 'prop-types';
import { STORE_SUMMARY_PROP_TYPES } from '../../../PickUpStoreModal.proptypes';
import { BodyCopy, Button, Image } from '../../../../../atoms';
import ReactTooltip from '../../../../../atoms/ReactToolTip';
import PickupRadioBtn from '../../../atoms/PickupRadioButton';
import { parseDate } from '../../../../../../../utils/parseDate';
import { getDateInformation, parseBoolean } from '../../../../../../../utils/badge.util';
import {
  STORE_DETAILS_LABELS,
  ITEM_AVAILABILITY_MESSAGES,
  BOPIS_ITEM_AVAILABILITY,
  PICKUP_CTA_LABELS,
  PICKUP_RADIO_BTN_NAME,
} from '../../../PickUpStoreModal.constants';
import { toTimeString, capitalize, getIconPath } from '../../../../../../../utils';
import withStyles from '../../../../../hoc/withStyles';
import styles from '../styles/PickupStoreListItem.style';

const getTooltipContent = (basicInfo, address, storeClosingTimeToday, storeClosingTimeTomorrow) => {
  const storeName = capitalize(basicInfo.storeName);
  const addressLine1 = capitalize(address.addressLine1);
  const city = capitalize(address.city);

  return (
    <div>
      <BodyCopy fontFamily="secondary" color="text.primary" fontWeight="semibold" fontSize="fs16">
        {storeName}
      </BodyCopy>
      <BodyCopy fontFamily="secondary" color="text.secondary" fontSize="fs12">
        {addressLine1}
      </BodyCopy>
      <BodyCopy fontFamily="secondary" color="text.secondary" fontSize="fs12">
        {city}
        {STORE_DETAILS_LABELS.COMMA_ONE}
        {STORE_DETAILS_LABELS.SPACE_ONE}
        {address.state}
        {STORE_DETAILS_LABELS.SPACE_ONE}
        {basicInfo.address.zipCode}
      </BodyCopy>
      <BodyCopy fontFamily="secondary" color="text.secondary" fontSize="fs12">
        {basicInfo.phone}
      </BodyCopy>
      <br />
      {storeClosingTimeToday ? (
        <BodyCopy fontFamily="secondary" color="text.secondary" fontSize="fs12">
          {STORE_DETAILS_LABELS.CLOSING_TODAY}
          {STORE_DETAILS_LABELS.SPACE_ONE}
          {storeClosingTimeToday}
        </BodyCopy>
      ) : (
        <BodyCopy fontFamily="secondary" color="text.secondary" fontSize="fs12">
          {STORE_DETAILS_LABELS.CLOSED_TODAY}
        </BodyCopy>
      )}

      {storeClosingTimeTomorrow ? (
        <BodyCopy fontFamily="secondary" color="text.secondary" fontSize="fs12">
          {STORE_DETAILS_LABELS.CLOSING_TOMORROW}
          {STORE_DETAILS_LABELS.SPACE_ONE}
          {storeClosingTimeTomorrow}
        </BodyCopy>
      ) : (
        <BodyCopy fontFamily="secondary" color="text.secondary" fontSize="fs12">
          {STORE_DETAILS_LABELS.CLOSED_TOMORROW}
        </BodyCopy>
      )}
    </div>
  );
};

const displayStoreDetailsAnchor = (
  basicInfo,
  address,
  storeClosingTimeToday,
  storeClosingTimeTomorrow
) => {
  const tooltipContent = getTooltipContent(
    basicInfo,
    address,
    storeClosingTimeToday,
    storeClosingTimeTomorrow
  );
  return (
    <ReactTooltip message={tooltipContent} aligned="right" minWidth="230px">
      <BodyCopy
        fontFamily="secondary"
        color="text.primary"
        fontSize="fs12"
        className="elem-mb-SM elem-mt-LRG StoreDetailsAnchor"
      >
        {STORE_DETAILS_LABELS.STORE_DETAILS}
      </BodyCopy>
    </ReactTooltip>
  );
};

const displayFavoriteStore = (basicInfo, label) => {
  return basicInfo.isDefault ? (
    <div className="favStore elem-mt-SM elem-mb-SM">
      <Image
        alt="Favorite Store"
        className="marker-icon elem-pr-XXXS"
        src={getIconPath('marker-icon')}
      />
      <BodyCopy
        fontFamily="secondary"
        fontWeight="extrabold"
        color="text.secondary"
        fontSize="fs12"
      >
        {label}
      </BodyCopy>
    </div>
  ) : null;
};

const displayAddToCartError = addToCartError => (
  <BodyCopy className="addToCartError" fontFamily="secondary" color="red.500" fontSize="fs10">
    {addToCartError}
  </BodyCopy>
);

const displayStoreUnavailable = (showBopisCTA, showBossCTA) => {
  const { STORE_UNAVAILABLE } = STORE_DETAILS_LABELS;
  return !showBopisCTA && !showBossCTA ? (
    <div className="storeUnavailable">
      <BodyCopy fontFamily="secondary" color="text.primary" fontSize="fs14">
        {STORE_UNAVAILABLE}
      </BodyCopy>
    </div>
  ) : null;
};

const displayStoreAddress = address => {
  return address && address.addressLine1 ? (
    <BodyCopy fontFamily="secondary" color="text.primary" fontSize="fs12">
      {capitalize(address.addressLine1)}
    </BodyCopy>
  ) : null;
};

const displayDistance = distance => {
  return distance ? (
    <BodyCopy fontFamily="secondary" color="text.primary" fontSize="fs12">
      {distance}
      mi.
    </BodyCopy>
  ) : null;
};

const displayStoreTitle = basicInfo => {
  return (
    <BodyCopy fontFamily="secondary" fontWeight="semibold" fontSize="fs16" className="elem-mb-XXS">
      {basicInfo.storeName}
    </BodyCopy>
  );
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
    // eslint-disable-next-line react/no-unused-prop-types
    isBopisSelected: PropTypes.bool.isRequired,

    /** boolean values to check BOSS selection */
    // eslint-disable-next-line react/no-unused-prop-types
    isBossSelected: PropTypes.bool.isRequired,
    /** store id that was selected */
    selectedStoreId: PropTypes.number.isRequired,

    isBopisCtaEnabled: PropTypes.bool.isRequired,
    onPickupRadioBtnToggle: PropTypes.func.isRequired,
    isBossCtaEnabled: PropTypes.bool.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  constructor(props) {
    super(props);
    this.handleStoreSelect = this.handleStoreSelect.bind(this);
    this.handlePickupRadioBtn = this.handlePickupRadioBtn.bind(this);
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
    const isBoss = this.isBossSelected;
    // Fetch isBoss from component instead of a new Arrow funct.
    const { onStoreSelect, store } = this.props;
    return onStoreSelect(store.basicInfo.id, isBoss);
  }

  /**
   * @method handlePickupRadioBtn
   * @description this method sets the pickup mode for store
   */
  handlePickupRadioBtn(isBossSelected) {
    const { onPickupRadioBtnToggle, store } = this.props;
    this.isBossSelected = isBossSelected;
    return onPickupRadioBtnToggle(store.basicInfo.id, isBossSelected);
  }

  displayPickupCTA(showBopisCTA, showBossCTA, buttonLabel) {
    const { isBossSelected, isBopisSelected } = this.props;
    return showBopisCTA || showBossCTA ? (
      <div className="pickupCTAWrapper elem-mt-SM">
        <Button
          buttonVariation="fixed-width"
          onClick={this.handleStoreSelect}
          fill="BLACK"
          disabled={!isBossSelected && !isBopisSelected}
        >
          {buttonLabel}
        </Button>
      </div>
    ) : null;
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
    addToCartError,
    storeClosingTimeToday,
    storeClosingTimeTomorrow,
  }) {
    const { FAVORITE_STORE } = STORE_DETAILS_LABELS;
    return (
      <div className="elem-mt-XXS storeListItemWrapper">
        <div className="storeInfoWrapper">
          {displayFavoriteStore(basicInfo, FAVORITE_STORE)}
          <div className="storeAddressWrapper">
            {displayStoreTitle(basicInfo)}
            {displayDistance(distance)}
            {displayStoreAddress(address)}
            {displayStoreDetailsAnchor(
              basicInfo,
              address,
              storeClosingTimeToday,
              storeClosingTimeTomorrow
            )}
          </div>
        </div>
        <div colSize={{ large: 7, medium: 5, small: 3.2 }} className="pickupButtonsWrapper">
          {showBossCTA && (
            <React.Fragment>
              <PickupRadioBtn
                className="PickupRadioBtn"
                radioGroupName={PICKUP_RADIO_BTN_NAME}
                isSelected={isBossSelected}
                isBossPickupButton
                handleClick={this.handlePickupRadioBtn}
                BossCtaProps={BossCtaProps}
              />
              {addToCartError && isBossSelected && displayAddToCartError(addToCartError)}
            </React.Fragment>
          )}
          {showBossCTA && showBopisCTA && (
            <div className="hide-on-mobile elem-mt-SM pickupBtnDivider" />
          )}
          {showBopisCTA && (
            <React.Fragment>
              <PickupRadioBtn
                className="PickupRadioBtn"
                radioGroupName={PICKUP_RADIO_BTN_NAME}
                isSelected={isBopisSelected}
                BopisCtaProps={BopisCtaProps}
                handleClick={this.handlePickupRadioBtn}
              />
              {addToCartError && isBopisSelected && displayAddToCartError(addToCartError)}
            </React.Fragment>
          )}

          {this.displayPickupCTA(showBopisCTA, showBossCTA, buttonLabel)}
          {displayStoreUnavailable(showBopisCTA, showBossCTA)}
        </div>
      </div>
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
      addToCartError,
      selectedStoreId,
      isBopisCtaEnabled,
      isBossCtaEnabled,
      buttonLabel,
      className,
      isBopisSelected,
      isBossSelected,
    } = this.props;

    const BopisCtaProps = {
      buttonLabel: PICKUP_CTA_LABELS.bopis,
      status:
        status === BOPIS_ITEM_AVAILABILITY.LIMITED ? ITEM_AVAILABILITY_MESSAGES.LIMITED : null,
      pickupDate: { ...getDateInformation() },
    };
    const BossCtaProps = {
      buttonLabel: PICKUP_CTA_LABELS.boss,
      pickupLabel: ITEM_AVAILABILITY_MESSAGES.GET_IT_BY,
      startDate: { ...getDateInformation(storeBossInfo.startDate, true) },
      endDate: { ...getDateInformation(storeBossInfo.endDate, true) },
    };
    // checking if there is sameStore then both CTAs should be disabled
    const pickupTypeBOPIS = !sameStore ? pickupType.isStoreBopisSelected : true;
    const pickupTypeBOSS = !sameStore ? pickupType.isStoreBossSelected : true;

    const showBopisCTA = parseBoolean(isBopisAvailable) && pickupTypeBOPIS && isBopisCtaEnabled;
    const showBossCTA = parseBoolean(isBossAvailable) && pickupTypeBOSS && isBossCtaEnabled;
    const { storeClosingTimeToday, storeClosingTimeTomorrow } = this.getStoreCloseTime();

    return (
      <div className={className}>
        {this.displayStoreDetails({
          basicInfo,
          address: basicInfo.address,
          distance,
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
          addToCartError,
          selectedStoreId,
        })}
      </div>
    );
  }
}

export default withStyles(PickupStoreListItem, styles);
export { PickupStoreListItem as PickupStoreListItemVanilla };
