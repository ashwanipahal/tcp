import BAGPAGE_SELECTORS from '../container/BagPage.selectors';

describe('#Added to bag Selectors', () => {
  const BagPageState = {
    bag: {
      bagOverview: { lbl_header_bag: 'bagHeading' },
    },
  };
  const state = {
    Labels: BagPageState,
  };
  it('#getAddedToBagData should return itemInfo', () => {
    expect(BAGPAGE_SELECTORS.getBagPageLabels(state)).toEqual({ bagHeading: 'bagHeading' });
  });
});
