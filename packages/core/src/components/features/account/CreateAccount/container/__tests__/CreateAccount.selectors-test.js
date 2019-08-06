import { getLabels } from '../CreateAccount.selectors';

describe('#CreateAccount selector', () => {
  it('#getLabels should return labels', () => {
    const state = {
      Labels: {
        global: {},
      },
    };
    const returnedLabels = {};
    expect(getLabels(state)).toMatchObject(returnedLabels);
  });
});
