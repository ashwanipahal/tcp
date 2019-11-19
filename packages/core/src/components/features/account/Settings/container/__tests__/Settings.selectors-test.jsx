import getAccountOverviewLabels from '../Settings.selectors';

describe('#Settings Selectors', () => {
  it('#getLabels should return Labels', () => {
    const state = {
      Labels: {
        accountOverview: {},
      },
    };
    expect(getAccountOverviewLabels(state)).toMatchObject({});
  });
});
