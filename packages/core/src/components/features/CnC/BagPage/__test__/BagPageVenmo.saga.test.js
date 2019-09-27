import { hasVenmoReviewPageRedirect } from '../container/BagPageVenmo.saga';

describe('Bag page venmo Saga', () => {
  it('removeUnqualifiedItemsAndCheckout effect', () => {
    const generator = hasVenmoReviewPageRedirect();

    let takeLatestDescriptor = generator.next(false).value;
    takeLatestDescriptor = generator.next(true).value;
    takeLatestDescriptor = generator.next().value;
    takeLatestDescriptor = generator.next().value;
    takeLatestDescriptor = generator.next().value;

    expect(takeLatestDescriptor).toEqual(true);
  });
});
