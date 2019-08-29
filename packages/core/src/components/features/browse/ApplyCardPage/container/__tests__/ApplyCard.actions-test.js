import PLCC_CARD_CONSTANTS from '../../RewardsCard.constants';
import {
  fetchModuleX,
  setModuleX,
  submitInstantCardApplication,
  obtainInstantCardApplication,
} from '../ApplyCard.actions';

describe('Plcc Card Actions', () => {
  it('fetchModuleX should return actiontype as ', () => {
    expect(fetchModuleX().type).toBe(PLCC_CARD_CONSTANTS.FETCH_MODULEX_CONTENT);
  });

  it('setModuleX should return actiontype as ', () => {
    expect(setModuleX().type).toBe(PLCC_CARD_CONSTANTS.SET_MODULEX_CONTENT);
  });

  it('submitInstantCardApplication should return actiontype as ', () => {
    expect(submitInstantCardApplication().type).toBe(
      PLCC_CARD_CONSTANTS.SEND_INSTANT_CARD_APPLICATION
    );
  });

  it('obtainInstantCardApplication should return actiontype as ', () => {
    expect(obtainInstantCardApplication().type).toBe(
      PLCC_CARD_CONSTANTS.RESPONSE_INSTANT_CARD_APPLICATION
    );
  });
});
