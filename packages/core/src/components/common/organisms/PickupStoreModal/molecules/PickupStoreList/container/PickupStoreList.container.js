import { connect } from 'react-redux';
import PickupStoreList from '../views/PickupStoreList.view';
import { getSuggestedStores, getDefaultStore } from '../../../container/PickUpStoreModal.selectors';

function mapStateToProps(state, ownProps) {
  const suggestedStores = getSuggestedStores(state);
  const defaultStore = getDefaultStore(state);
  return {
    storesList: suggestedStores,
    isShowFilterCheckbox: suggestedStores && suggestedStores.length > 0,
    defaultStoreName: defaultStore ? defaultStore && defaultStore.basicInfo.storeName : null,
    ...ownProps,
  };
}

export default connect(mapStateToProps)(PickupStoreList);
