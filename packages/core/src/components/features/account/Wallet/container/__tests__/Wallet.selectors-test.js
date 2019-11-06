import getAccountOverviewLabels from '../Wallet.selectors';

describe('#Wallet Selectors', () => {
  it('#getLabels should return Labels', () => {
    const state = {
      Labels: {
        accountOverview: {},
      },
    };
    expect(getAccountOverviewLabels(state)).toMatchObject({});
  });
});
