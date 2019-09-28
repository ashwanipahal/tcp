import { getLabels } from '../Orders.selectors';

describe('#pointsHistoryData selector', () => {
  it('#getLabels should return all the account labels', () => {
    const state = {
      Labels: {
        account: {},
      },
    };
    expect(getLabels(state)).toMatchObject({});
  });
});
