import PLCC_CARD_CONSTANTS from '../../RewardsCard.constants';
import {
  fetchModuleX,
  setModuleX,
  submitInstantCardApplication,
  obtainInstantCardApplication,
} from '../ApplyCard.actions';

describe('Plcc Card Actions', () => {
  it('fetchModuleX should return actionthype as ', () => {
    expect(fetchModuleX().type).toBe(PLCC_CARD_CONSTANTS.FETCH_MODULEX_CONTENT);
  });

  it('setModuleX should return actionthype as ', () => {
    expect(setModuleX().type).toBe(PLCC_CARD_CONSTANTS.SET_MODULEX_CONTENT);
  });

  it('submitInstantCardApplication should return actionthype as ', () => {
    expect(submitInstantCardApplication().type).toBe(
      PLCC_CARD_CONSTANTS.SEND_INSTANT_CARD_APPLICATION
    );
  });

  it('obtainInstantCardApplication should return actionthype as ', () => {
    expect(obtainInstantCardApplication().type).toBe(
      PLCC_CARD_CONSTANTS.RESPONSE_SEND_INSTANT_CARD_APPLICATION
    );
  });
});
