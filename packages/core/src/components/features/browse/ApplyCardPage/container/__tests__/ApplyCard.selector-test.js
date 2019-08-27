import { fromJS } from 'immutable';
import { getCreditCardContent, getPLCCApplicationStatus } from '../ApplyCard.selector';

describe('#ApplyCardSelector', () => {
  const ApplyCardState = fromJS({
    applicationStatus: 'PENDING',
    plcc_disclaimers_data: 'data',
  });

  const state = {
    ApplyCardPage: ApplyCardState,
  };

  it('#ApplyCardSelector state should return plcc_disclaimer_data', () => {
    expect(getCreditCardContent(state)).toEqual(ApplyCardState.get('plcc_disclaimers_data'));
  });

  it('#ApplyCardSelector state should return applicationStatus', () => {
    expect(getPLCCApplicationStatus(state)).toEqual(ApplyCardState.get('applicationStatus'));
  });
});
