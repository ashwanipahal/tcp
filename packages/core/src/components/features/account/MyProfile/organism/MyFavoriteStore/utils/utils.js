import { getLabelValue } from '../../../../../../../utils';

const ctaTitleDefaultStore = (labels, defaultStore, isMyReferences) => {
  if (defaultStore && isMyReferences) {
    return getLabelValue(labels, 'lbl_common_edit');
  }
  if (defaultStore && !isMyReferences) {
    return getLabelValue(labels, 'lbl_common_updateFavoriteStore');
  }
  return getLabelValue(labels, 'lbl_common_addAStore');
};

export default ctaTitleDefaultStore;
