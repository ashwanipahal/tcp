import GLOBAL_CONSTANTS from '../constants';

const LabelReducer = (state = {}, action) => {
  switch (action.type) {
    case GLOBAL_CONSTANTS.LOAD_LABELS_DATA:
      return { ...state, ...action.payload };
    case GLOBAL_CONSTANTS.SET_LABELS_DATA:
      return { ...state, ...action.payload.data };
    default:
      return state;
  }
};

export default LabelReducer;

// TODO - - GLOBAL-LABEL-CHANGE - STEP 3 - Immutable code but it is breaking the view layers of component
// import { fromJS } from 'immutable';
// import GLOBAL_CONSTANTS from '../constants';

// const initialState = fromJS({
// });

// const getDefaultState = state => {
//  TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
//   if (state instanceof Object) {
//     return fromJS(state);
//   }
//   return state;
// };

// const setLabelsInState = (state, {payload:{data, category, subCategory=null}}) => {
//   return state.merge(fromJS(data));
// }

// const LabelReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GLOBAL_CONSTANTS.SET_LABELS_DATA:
//       return setLabelsInState(state, action);
//     default:
//       return getDefaultState(state);
//   }
// };

// export default LabelReducer;
