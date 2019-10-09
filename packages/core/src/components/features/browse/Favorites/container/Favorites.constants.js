import { FAVORITES_ACTION_PATTERN } from '../../../../../constants/reducer.constants';

const SET_FAVORITES = `${FAVORITES_ACTION_PATTERN}SET_FAVORITES`;
const SET_FAVORITES_STATE = `${FAVORITES_ACTION_PATTERN}SET_FAVORITES_STATE`;
const GET_FAVORITES_WISHLIST = `${FAVORITES_ACTION_PATTERN}FAVORITES_GET_AVAILABLE_WISHLISTS`;
const SET_FAVORITES_WISHLIST = `${FAVORITES_ACTION_PATTERN}FAVORITES_SET_AVAILABLE_WISHLISTS`;
const SET_ACTIVE_WISHLIST = `${FAVORITES_ACTION_PATTERN}SET_ACTIVE_WISHLIST`;
const LOAD_ACTIVE_FAVORITES_WISHLIST = `${FAVORITES_ACTION_PATTERN}LOAD_ACTIVE_FAVORITES_WISHLIST`;
const CREATE_NEW_WISHLIST = `${FAVORITES_ACTION_PATTERN}CREATE_NEW_WISHLIST`;
const CREATE_NEW_WISHLIST_MOVE_ITEM = `${FAVORITES_ACTION_PATTERN}CREATE_NEW_WISHLIST_MOVE_ITEM`;
const DELETE_WISHLIST = `${FAVORITES_ACTION_PATTERN}DELETE_WISHLIST`;
const DELETE_WISHLIST_ITEM = `${FAVORITES_ACTION_PATTERN}DELETE_WISHLIST_ITEM`;
const DELETED_WISHLIST_ITEM = `${FAVORITES_ACTION_PATTERN}DELETED_WISHLIST_ITEM`;
const UPDATE_WISHLIST = `${FAVORITES_ACTION_PATTERN}UPDATE_WISHLIST`;
const UPDATE_WISHLIST_ITEM = `${FAVORITES_ACTION_PATTERN}UPDATE_WISHLIST_ITEM`;
const SEND_WISHLIST_EMAIL = `${FAVORITES_ACTION_PATTERN}SEND_WISHLIST_EMAIL`;
const FAVORITES_SET_IS_READ_ONLY_WISHLIST = `${FAVORITES_ACTION_PATTERN}FAVORITES_SET_IS_READ_ONLY_WISHLIST`;

const FAVORITES_CONSTANTS = {
  SET_FAVORITES,
  SET_FAVORITES_STATE,
  GET_FAVORITES_WISHLIST,
  SET_FAVORITES_WISHLIST,
  SET_ACTIVE_WISHLIST,
  LOAD_ACTIVE_FAVORITES_WISHLIST,
  CREATE_NEW_WISHLIST,
  CREATE_NEW_WISHLIST_MOVE_ITEM,
  DELETE_WISHLIST,
  DELETE_WISHLIST_ITEM,
  DELETED_WISHLIST_ITEM,
  UPDATE_WISHLIST,
  UPDATE_WISHLIST_ITEM,
  SEND_WISHLIST_EMAIL,
  FAVORITES_SET_IS_READ_ONLY_WISHLIST,
};

export const AVAILABILITY = {
  OK: 'OK',
  SOLDOUT: 'SOLDOUT',
  UNAVAILABLE: 'UNAVAILABLE',
  SUGGESTED: 'SUGGESTED', // REVIEW: we need it to control an state to favorite's item (favorites' page).
};

export const STATUS = {
  PURCHASED: 'PURCHASED',
  SUGGESTED: 'SUGGESTED',
};

export default FAVORITES_CONSTANTS;
