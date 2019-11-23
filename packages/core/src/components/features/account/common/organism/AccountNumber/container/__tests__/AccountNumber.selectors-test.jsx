import getAccountOverviewLabels from '../AccountNumber.selectors';

describe('#AccountNumber Selectors', () => {
  it('#getLabels should return Labels', () => {
    const state = {
      Labels: {
        accountOverview: {},
      },
    };
    expect(getAccountOverviewLabels(state)).toMatchObject({});
  });
});
