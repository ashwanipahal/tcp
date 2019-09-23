import { fromJS } from 'immutable';
import { DEFAULT_REDUCER_KEY } from '../../../../../../utils/cache.util';

export default fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  suggestedStores: [],
  currentStore: {},
  defaultStore: null,
  geoDefaultStore: null,
  storesSummaryListUS: [],
  storesSummaryListCA: [],
  storesSummaryListOthers: [],
  bopisStoresOnCart: [],
  bopisItemInventory: [],
});
