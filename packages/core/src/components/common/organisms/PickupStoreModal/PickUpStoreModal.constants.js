import { PICKUP_MODAL_REDUCER_PATTERN } from '../../../../constants/reducer.constants';

export const ENTER_KEY_CODE = 13;
export const PICKUP_MODAL_ACTIONS_CONSTANTS = {
  PICKUP_MODAL_TOGGLE: `${PICKUP_MODAL_REDUCER_PATTERN}PICKUP_MODAL_TOGGLE`,
  PICKUP_MODAL_CLOSE: `${PICKUP_MODAL_REDUCER_PATTERN}PICKUP_MODAL_CLOSE`,
  PICKUP_MODAL_OPEN: `${PICKUP_MODAL_REDUCER_PATTERN}PICKUP_MODAL_OPEN`,
  GET_BOPIS_STORES: `${PICKUP_MODAL_REDUCER_PATTERN}GET_BOPIS_STORES`,
  SET_BOPIS_STORES: `${PICKUP_MODAL_REDUCER_PATTERN}SET_BOPIS_STORES`,
  SET_STORE_SEARCH_ERROR: `${PICKUP_MODAL_REDUCER_PATTERN}SET_STORE_SEARCH_ERROR`,
  CLEAR_STORE_SEARCH_FORM: `${PICKUP_MODAL_REDUCER_PATTERN}CLEAR_STORE_SEARCH_FORM`,
  GET_USER_CART_STORES: `${PICKUP_MODAL_REDUCER_PATTERN}GET_USER_CART_STORES`,
  SET_USER_CART_STORES: `${PICKUP_MODAL_REDUCER_PATTERN}SET_USER_CART_STORES`,
};

// Label Constants -
export const PICKUP_HEADING = 'Pick Up In Store';
export const EDIT = 'Edit';
export const BOPIS_FILTER_LABEL = 'Only show stores available for pickup today';

export const SKU_DETAILS = {
  fit: 'Fit',
  size: 'Size',
  quantity: 'Quantity',
  distance: 'distance',
  addToBag: 'ADD TO BAG',
  errorMessage: 'Please select Quantity',
  color: 'Color',
};

export const BOPIS_ITEM_AVAILABILITY = {
  AVAILABLE: 'OK',
  LIMITED: 'LIMITED',
  UNAVAILABLE: 'UNAVAILABLE',
};

export const ITEM_AVAILABILITY_MESSAGES = {
  GET_IT_BY: 'Get it by',
  AVAILABLE: 'Available',
  LIMITED: 'Limited Availability',
  UNAVAILABLE: 'Unavailable',
};

export const PICKUP_LABELS = {
  SELECT_STORE: 'Please select a store location & date you want to pick up this item.',
  ONE_STORE_SELECTED: `You can only select 1 store location for “Pick Up Later” items per transaction.
  Choosing another store will update all “Pick Up Later”
  items in your bag to the new store location.`,
  SAME_STORE_BOPIS_BOPIS: `You can only choose previously
  selected store for Pick Up in Store items.`,
  ADD_TO_BAG: 'Add to bag',
  FIND_STORE: 'FIND A STORE NEAR YOU',
  UPDATE: 'UPDATE',
  ITEM_UNAVAILABLE: 'This item is not available for pick up in your selected store.',
  PICK_UP_MODAL_LABEL: 'Pick Up In Store',
  VIEW_DETAILS: 'View Product Details',
  PRICE_LABEL: 'Price',
};

export const PRODUCT_VALUES = {
  color: 'Color',
  fit: 'Fit',
  size: 'Size',
  quantity: 'Qty',
};

export const STORE_DETAILS_LABELS = {
  STORE_DETAILS: 'Store Details',
  SPACE_ONE: ' ',
  COMMA_ONE: ',',
  CLOSING_TOMORROW: 'Open tomorrow until',
  CLOSING_TODAY: 'Open until',
  CLOSED_TODAY: 'Closed Today',
  CLOSED_TOMORROW: 'Closed Tomorrow',
  FAVORITE_STORE: 'FAVORITE STORE',
  STORE_UNAVAILABLE:
    'The color, size, fit and/or quantity you selected is unavailable at this store',
};

export const PICKUP_SKU_SELECTION = {
  SubmitButtonAriaLabel: 'choose store',
  SubmitButtonText: 'NEXT: CHOOSE STORE',
  FormName: 'PickUpSkuSelectionForm',
};

export const PICKUP_CTA_LABELS = {
  boss: 'NO RUSH PICKUP',
  bopis: 'PICK UP TODAY',
};

export const DEFAULT_STORE = {
  storeBossInfo: {
    isBossEligible: '1',
    startDate: '09/19/2019',
    endDate: '09/22/2019',
  },
  pickupType: {
    isStoreBossSelected: true,
    isStoreBopisSelected: true,
  },
  distance: '0.41',
  basicInfo: {
    id: '110715',
    storeName: 'newport center',
    isDefault: 1,
    address: {
      addressLine1: '30 mall drive west',
      city: 'jersey city',
      state: 'NJ',
      country: 'US',
      zipCode: '07310',
    },
    phone: '(201) 963-5537',
    coordinates: {
      lat: 40.72614,
      long: -74.03881,
    },
  },
  hours: {
    regularHours: [
      {
        dayName: 'THURSDAY',
        openIntervals: [
          {
            fromHour: '2019-09-12 10:00:00',
            toHour: '2019-09-12 21:30:00',
          },
        ],
        isClosed: false,
      },
      {
        dayName: 'FRIDAY',
        openIntervals: [
          {
            fromHour: '2019-09-13 10:00:00',
            toHour: '2019-09-13 21:30:00',
          },
        ],
        isClosed: false,
      },
      {
        dayName: 'SATURDAY',
        openIntervals: [
          {
            fromHour: '2019-09-14 10:00:00',
            toHour: '2019-09-14 21:30:00',
          },
        ],
        isClosed: false,
      },
      {
        dayName: 'SUNDAY',
        openIntervals: [
          {
            fromHour: '2019-09-15 11:00:00',
            toHour: '2019-09-15 18:00:00',
          },
        ],
        isClosed: false,
      },
      {
        dayName: 'MONDAY',
        openIntervals: [
          {
            fromHour: '2019-09-16 10:00:00',
            toHour: '2019-09-16 21:30:00',
          },
        ],
        isClosed: false,
      },
      {
        dayName: 'TUESDAY',
        openIntervals: [
          {
            fromHour: '2019-09-17 10:00:00',
            toHour: '2019-09-17 21:30:00',
          },
        ],
        isClosed: false,
      },
      {
        dayName: 'WEDNESDAY',
        openIntervals: [
          {
            fromHour: '2019-09-18 10:00:00',
            toHour: '2019-09-18 21:30:00',
          },
        ],
        isClosed: false,
      },
      {
        dayName: 'THURSDAY',
        openIntervals: [
          {
            fromHour: '2019-09-19 10:00:00',
            toHour: '2019-09-19 21:30:00',
          },
        ],
        isClosed: false,
      },
      {
        dayName: 'FRIDAY',
        openIntervals: [
          {
            fromHour: '2019-09-20 10:00:00',
            toHour: '2019-09-20 21:30:00',
          },
        ],
        isClosed: false,
      },
    ],
    holidayHours: [],
    regularAndHolidayHours: [],
  },
  features: {
    storeType: 'Retail Store',
  },
  productAvailability: {
    variantNo: '2044391020',
    quantity: 0,
    status: 'LIMITED',
    storeId: '0715',
  },
  timeStamp: 1568281373404,
};

export const PICKUP_RADIO_BTN_NAME = 'PICKUP-BTN';

export default {
  PICKUP_MODAL_ACTIONS_CONSTANTS,
  PICKUP_HEADING,
  SKU_DETAILS,
  PICKUP_LABELS,
  BOPIS_ITEM_AVAILABILITY,
  PICKUP_SKU_SELECTION,
  STORE_DETAILS_LABELS,
  ITEM_AVAILABILITY_MESSAGES,
  PICKUP_CTA_LABELS,
  ENTER_KEY_CODE,
  PRODUCT_VALUES,
  PICKUP_RADIO_BTN_NAME,
};
