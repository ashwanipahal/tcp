import { fetchModuleX, setModuleX } from '../container/CreditCard.action';

describe('#creditcardActions', () => {
  it('fetchModuleX', () => {
    expect(fetchModuleX()).toEqual({
      type: 'FETCH_MODULEX_CONTENT_CREDIT',
      payload: undefined,
    });
  });
  it('setModuleX', () => {
    expect(setModuleX()).toEqual({
      type: 'SET_MODULEX_CONTENT_CREDIT',
      payload: undefined,
    });
  });
});
