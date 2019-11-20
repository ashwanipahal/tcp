import { getLabelValue } from '../../../../../utils';

// eslint-disable-next-line import/prefer-default-export
export const getLabels = state => {
  return {
    readMore: getLabelValue(state.Labels, 'lbl_read_more', 'seoText', 'PLP'),
    readLess: getLabelValue(state.Labels, 'lbl_read_less', 'seoText', 'PLP'),
  };
};
