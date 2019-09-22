import { fromJS } from 'immutable';
import { getIsModalOpen, getLabels, getIsPLCCModalOpen } from '../ApplyNowModal.selectors';
import { APPLY_NOW_MODAL_REDUCER_KEY } from '../../../../../../constants/reducer.constants';

describe('#getIsModalOpen selector', () => {
  const stateObject = {
    modalStatus: {
      isPLCCModalOpen: true,
      isModalOpen: true,
    },
  };
  const state = {
    [APPLY_NOW_MODAL_REDUCER_KEY]: fromJS(stateObject),
  };

  it('#getUserContactInfo should retun contact infomation data', () => {
    expect(getIsModalOpen(state)).toEqual(fromJS(stateObject).get('isModalOpen'));
  });
});

describe('#getIsPLCCModalOpen selector', () => {
  const stateObject = {
    modalStatus: {
      isPLCCModalOpen: true,
      isModalOpen: true,
    },
  };
  const state = {
    [APPLY_NOW_MODAL_REDUCER_KEY]: fromJS(stateObject),
  };

  it('#getUserContactInfo should retun contact infomation data', () => {
    expect(getIsPLCCModalOpen(state)).toEqual(fromJS(stateObject).get('isPLCCModalOpen'));
  });
});

describe('#getLabels selector', () => {
  const LabelsState = fromJS({
    global: {
      plccForm: {
        header: 'dummy',
      },
    },
  });
  const state = {
    Labels: LabelsState,
  };
  it('#getLabels should return labels data', () => {
    expect(getLabels(state)).toEqual(LabelsState.PLCC);
  });
});

describe('#getLabels selector', () => {
  const LabelsState = {
    global: {
      plccForm: null,
    },
  };
  const state = {
    Labels: LabelsState,
  };
  it('#getLabels should return labels data blank', () => {
    expect(getLabels(state)).toEqual(null);
  });
});
