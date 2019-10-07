import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import { STORE_SUMMARY_PROP_TYPES } from '@tcp/core/src/components/common/organisms/PickupStoreModal/PickUpStoreModal.proptypes';
import { BodyCopy, Button } from '@tcp/core/src/components/common/atoms';
import ReactTooltip from '@tcp/core/src/components/common/atoms/ReactToolTip';
import PickupRadioBtn from '@tcp/core/src/components/common/organisms/PickupStoreModal/atoms/PickupRadioButton';
import { parseDate } from '@tcp/core/src/utils/parseDate';
import { getDateInformation, parseBoolean } from '@tcp/core/src/utils/badge.util';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import {
  STORE_DETAILS_LABELS,
  ITEM_AVAILABILITY_MESSAGES,
  BOPIS_ITEM_AVAILABILITY,
  PICKUP_CTA_LABELS,
  PICKUP_RADIO_BTN_NAME,
} from '../../../PickUpStoreModal.constants';
import { toTimeString, capitalize } from '../../../../../../../utils';
import {
  FavStoreLabel,
  FavStoreIcon,
  StoreInfoWrapper,
  StoreListItemWrapper,
  PickupButtonsWrapper,
  StoreUnavailable,
  PickupCTAWrapper,
  PickupRadioBtnWrapper,
  StoreDetailsAnchorWrapper,
  TooltipContentWrapper,
  TooltipWrapper,
  addToCartErrorStyle,
} from '../styles/PickupStoreListItem.style.native';
import CustomIcon from '../../../../../atoms/Icon';
import { ICON_NAME, ICON_FONT_CLASS } from '../../../../../atoms/Icon/Icon.constants';
import { BodyCopyWithSpacing } from '../../../../../atoms/styledWrapper';

const getTooltipContent = (basicInfo, address, storeClosingTimeToday, storeClosingTimeTomorrow) => {
  const storeName = capitalize(basicInfo.storeName);
  const addressLine1 = capitalize(address.addressLine1);
  const city = capitalize(address.city);
  const { CLOSED_TODAY, CLOSING_TODAY, CLOSING_TOMORROW, CLOSED_TOMORROW } = STORE_DETAILS_LABELS;

  return (
    <TooltipContentWrapper>
      <BodyCopy
        fontFamily="secondary"
        color="text.primary"
        fontWeight="semibold"
        fontSize="fs16"
        text={storeName}
      />
      <BodyCopy
        fontFamily="secondary"
        color="text.secondary"
        fontSize="fs12"
        text={`${addressLine1} `}
      />
      <BodyCopy
        fontFamily="secondary"
        color="text.secondary"
        fontSize="fs12"
        text={`${city}, ${address.state} ${basicInfo.address.zipCode}`}
      />
      <BodyCopy
        fontFamily="secondary"
        color="text.secondary"
        fontSize="fs12"
        text={`${basicInfo.phone} \n`}
      />
      {storeClosingTimeToday ? (
        <BodyCopy
          fontFamily="secondary"
          color="text.secondary"
          fontSize="fs12"
          text={`${CLOSING_TODAY} ${storeClosingTimeToday}`}
        />
      ) : (
        <BodyCopy
          fontFamily="secondary"
          color="text.secondary"
          fontSize="fs12"
          text={CLOSED_TODAY}
        />
      )}

      {storeClosingTimeTomorrow ? (
        <BodyCopy
          fontFamily="secondary"
          color="text.secondary"
          fontSize="fs12"
          text={`${CLOSING_TOMORROW} ${storeClosingTimeTomorrow}`}
        />
      ) : (
        <BodyCopy
          fontFamily="secondary"
          color="text.secondary"
          fontSize="fs12"
          text={CLOSED_TOMORROW}
        />
      )}
    </TooltipContentWrapper>
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
  const StoreDetailsAnchorStyled = withStyles(BodyCopyWithSpacing, StoreDetailsAnchorWrapper);

  const StoreDetailsAnchor = (
    <StoreDetailsAnchorStyled
      fontFamily="secondary"
      color="text.primary"
      fontSize="fs12"
      text={STORE_DETAILS_LABELS.STORE_DETAILS}
    />
  );
  return (
    <TooltipWrapper>
      <ReactTooltip withOverlay={false} popover={tooltipContent} width={227} height={170}>
        {StoreDetailsAnchor}
      </ReactTooltip>
    </TooltipWrapper>
  );
};

const displayFavoriteStore = (basicInfo, label) => {
  return basicInfo.isDefault ? (
    <FavStoreLabel>
      <FavStoreIcon>
        <CustomIcon
          className="marker-icon elem-pr-XXXS"
          iconFontName={ICON_FONT_CLASS.Icomoon}
          name={ICON_NAME.markerIcon}
          size="fs14"
          color="gray.900"
        />
      </FavStoreIcon>
      <BodyCopy
        fontFamily="secondary"
        color="text.secondary"
        fontWeight="extrabold"
        fontSize="fs12"
        text={`${label} `}
      />
    </FavStoreLabel>
  ) : null;
};

const displayAddToCartError = addToCartError => {
  const AddToCartErrorStyled = withStyles(BodyCopyWithSpacing, addToCartErrorStyle);
  return (
    <AddToCartErrorStyled
      fontFamily="secondary"
      fontSize="fs10"
      text={addToCartError}
      color="red.500"
    />
  );
};

const displayStoreUnavailable = (showBopisCTA, showBossCTA) => {
  const { STORE_UNAVAILABLE } = STORE_DETAILS_LABELS;
  return !showBopisCTA && !showBossCTA ? (
    <StoreUnavailable>
      <BodyCopy
        fontFamily="secondary"
        color="text.primary"
        fontSize="fs14"
        text={STORE_UNAVAILABLE}
      />
    </StoreUnavailable>
  ) : null;
};

const displayStoreAddress = address => {
  return address && address.addressLine1 ? (
    <BodyCopy
      fontFamily="secondary"
      color="text.primary"
      fontSize="fs12"
      text={capitalize(address.addressLine1)}
    />
  ) : null;
};

const displayDistance = distance => {
  return distance ? (
    <BodyCopy
      fontFamily="secondary"
      color="text.primary"
      fontSize="fs12"
      text={`${distance} mi.`}
    />
  ) : null;
};

const displayStoreTitle = basicInfo => {
  return (
    <BodyCopyWithSpacing
      fontFamily="secondary"
      fontWeight="semibold"
      fontSize="fs16"
      text={basicInfo.storeName}
      spacingStyles="margin-bottom-XXS margin-top-XS"
    />
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
      <PickupCTAWrapper>
        <Button
          buttonVariation="fixed-width"
          onPress={this.handleStoreSelect}
          fill="BLACK"
          disableButton={!isBossSelected && !isBopisSelected}
          text={buttonLabel}
        />
      </PickupCTAWrapper>
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
      <StoreListItemWrapper>
        <StoreInfoWrapper>
          {displayFavoriteStore(basicInfo, FAVORITE_STORE)}
          {displayStoreTitle(basicInfo)}
          {displayDistance(distance)}
          {displayStoreAddress(address)}
          {displayStoreDetailsAnchor(
            basicInfo,
            address,
            storeClosingTimeToday,
            storeClosingTimeTomorrow
          )}
        </StoreInfoWrapper>
        <PickupButtonsWrapper>
          {showBossCTA && (
            <View>
              <PickupRadioBtnWrapper>
                <PickupRadioBtn
                  radioGroupName={PICKUP_RADIO_BTN_NAME}
                  isSelected={isBossSelected}
                  isBossPickupButton
                  handleClick={this.handlePickupRadioBtn}
                  BossCtaProps={BossCtaProps}
                />
              </PickupRadioBtnWrapper>
              {!!addToCartError && isBossSelected && displayAddToCartError(addToCartError)}
            </View>
          )}
          {showBopisCTA && (
            <React.Fragment>
              <PickupRadioBtnWrapper>
                <PickupRadioBtn
                  radioGroupName={PICKUP_RADIO_BTN_NAME}
                  isSelected={isBopisSelected}
                  BopisCtaProps={BopisCtaProps}
                  handleClick={this.handlePickupRadioBtn}
                />
              </PickupRadioBtnWrapper>
              {!!addToCartError && isBopisSelected && displayAddToCartError(addToCartError)}
            </React.Fragment>
          )}

          {this.displayPickupCTA(showBopisCTA, showBossCTA, buttonLabel)}
          {displayStoreUnavailable(showBopisCTA, showBossCTA)}
        </PickupButtonsWrapper>
      </StoreListItemWrapper>
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
      isBopisSelected,
      isBossSelected,
      buttonLabel,
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

    return this.displayStoreDetails({
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
    });
  }
}

export default PickupStoreListItem;
export { PickupStoreListItem as PickupStoreListItemVanilla };
