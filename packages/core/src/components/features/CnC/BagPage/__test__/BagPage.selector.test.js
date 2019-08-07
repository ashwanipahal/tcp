import BAGPAGE_SELECTORS from '../container/BagPage.selectors';

describe('#Added to bag Selectors', () => {
  const BagPageState = {
    bag: {
      addedToBag: { lbl_header_addedToBag: 'AddedToBag', lbl_cta_checkout: 'Checkout' },
      bagOverview: { lbl_header_bag: 'bagHeading' },
    },
  };
  const state = {
    Labels: BagPageState,
  };
  it('#getAddedToBagData should return itemInfo', () => {
    expect(BAGPAGE_SELECTORS.getBagPageLabels(state)).toEqual({
      addedToBag: 'AddedToBag',
      bagHeading: 'bagHeading',
      checkout: 'Checkout',
    });
  });
});
