import { fromJS, List } from 'immutable';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
import { AVAILABILITY } from '../../../../../services/abstractors/CnC/CartItemTile';

const initialState = fromJS({
  orderDetails: {},
  errors: false,
  moduleXContent: [],
  showConfirmationModal: false,
});

function updateItem(state, itemId, property) {
  state.updateIn(['orderDetails', 'orderItems'], items =>
    items.update(items.findIndex(item => item.get('itemId') === itemId), item =>
      item.update(property, miscInfo => miscInfo.set('availability', AVAILABILITY.SOLDOUT))
    )
  );
}

const BagPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case BAGPAGE_CONSTANTS.GET_ORDER_DETAILS_COMPLETE:
      return state.set('orderDetails', fromJS(action.payload));
    case BAGPAGE_CONSTANTS.SET_BAG_PAGE_ERRORS:
      return state.set('errors', fromJS(action.payload));
    case BAGPAGE_CONSTANTS.SET_MODULEX_CONTENT:
      return state.set('moduleXContent', List(action.payload));
    case BAGPAGE_CONSTANTS.SET_ITEM_OOS:
      return updateItem(state, action.payload, 'miscInfo');
    case BAGPAGE_CONSTANTS.OPEN_CHECKOUT_CONFIRMATION_MODAL:
      return state.set('showConfirmationModal', true);
    case BAGPAGE_CONSTANTS.CLOSE_CHECKOUT_CONFIRMATION_MODAL:
      return state.set('showConfirmationModal', false);
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default BagPageReducer;
