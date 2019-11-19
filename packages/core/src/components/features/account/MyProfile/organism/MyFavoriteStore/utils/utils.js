import { getLabelValue } from '../../../../../../../utils';

const ctaTitleDefaultStore = (labels, favStoreName, isMyReferences) => {
  if (!!favStoreName && isMyReferences) {
    return getLabelValue(labels, 'lbl_common_edit');
  }
  if (!!favStoreName && !isMyReferences) {
    return getLabelValue(labels, 'lbl_common_updateFavoriteStore');
  }
  return getLabelValue(labels, 'lbl_common_addAStore');
};

export default ctaTitleDefaultStore;
