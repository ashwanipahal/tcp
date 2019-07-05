import { combineReducers } from 'redux';
import LabelReducer from '@tcp/core/src/reduxStore/reducers/labels';
import LayoutReducer from '@tcp/core/src/reduxStore/reducers/layout';
import {
  HEADER_REDUCER_KEY,
  LABEL_REDUCER_KEY,
  LAYOUT_REDUCER_KEY,
} from '@tcp/core/src/constants/reducer.constants';
import HeaderReducer from '@tcp/core/src/components/common/organisms/Header/container/Header.reducer';

export default combineReducers({
  [HEADER_REDUCER_KEY]: HeaderReducer,
  [LABEL_REDUCER_KEY]: LabelReducer,
  [LAYOUT_REDUCER_KEY]: LayoutReducer,
});
