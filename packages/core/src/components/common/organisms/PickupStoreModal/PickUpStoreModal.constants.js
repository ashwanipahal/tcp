import { PICKUP_MODAL_REDUCER_PATTERN } from '../../../../constants/reducer.constants';

export const ENTER_KEY_CODE = 13;
export const PICKUP_MODAL_ACTIONS_CONSTANTS = {
  PICKUP_MODAL_TOGGLE: `${PICKUP_MODAL_REDUCER_PATTERN}PICKUP_MODAL_TOGGLE`,
  PICKUP_MODAL_CLOSE: `${PICKUP_MODAL_REDUCER_PATTERN}PICKUP_MODAL_CLOSE`,
  PICKUP_MODAL_OPEN: `${PICKUP_MODAL_REDUCER_PATTERN}PICKUP_MODAL_OPEN`,
};

// Label Constants -
export const PICKUP_HEADING = 'Pick Up In Store';
export const EDIT = 'Edit';

export const SKU_DETAILS = {
  color: 'color',
  fit: 'fit',
  size: 'size',
  quantity: 'quantity',
  distance: 'distance',
};

export const BOPIS_ITEM_AVAILABILITY = {
  AVAILABLE: 'OK',
  LIMITED: 'LIMITED',
  UNAVAILABLE: 'UNAVAILABLE',
};

export const ITEM_AVAILABILITY_MESSAGES = {
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
  FIND_STORE: 'Find a Store Near You',
  UPDATE: 'UPDATE',
  ITEM_UNAVAILABLE: 'This item is not available for pick up in your selected store.',
};

export const PRODUCT_VALUES = {
  color: 'Color',
  fit: 'Fit',
  size: 'Size',
  quantity: 'Qty',
};

export const STORE_DETAILS_LABELS = {
  SPACE_ONE: ' ',
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
};
