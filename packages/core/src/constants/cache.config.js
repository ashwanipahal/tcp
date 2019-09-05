import { LABELS } from '../reduxStore/constants';

const CACHED_KEYS = {
  // @TODO: replace LABELS.labels with LABELS.global after global label separation
  [`${LABELS.labels}:${LABELS.global}`]: LABELS.labels,
};

export default CACHED_KEYS;
